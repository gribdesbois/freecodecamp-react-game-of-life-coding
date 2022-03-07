import React, { Component } from 'react'
import newBoardStatus from './components/NewBoardStatus'

export const totalBoardRows = 40
export const totalBoardColumns = 60

/* Returns an array of arrays, each containing booleans values
(40) [Array(60), Array(60), ... ]
0: (60) [true, false, true, ... ]
1: (60) [false, false, false, ... ]
2: (60) [false, false, true, ...]
...
*/

const Slider = () => {}

export class App extends Component {
  state = {
    boardStatus: newBoardStatus(),
    generation: 0,
    isGameRunning: false,
    speed: 500,
  }

  runStopButton = () => {
    return this.state.isGameRunning ? (
      <button type="button" onClick={this.handleStop}>
        Stop
      </button>
    ) : (
      <button type="button" onClick={this.handleRun}>
        Start
      </button>
    )
  }

  handleClearBoard = () => {
    this.setState({
      boardStatus: newBoardStatus(() => false),
      generation: 0,
    })
  }

  //! ToggleCellStatus
  /* Deep clones array to avoid modifying it by ref when updating individual on next line
  spread syntax goes one level deep while copying the array
  therefore may be unsuitable for copying multidimensional arrays
  refs:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Deep_Clone
  https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
  https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
  */

  handleToggleCellStatus = (r, c) => {
    const toggleBoardStatus = (prevState) => {
      const clonedBoardStatus = JSON.parse(
        JSON.stringify(prevState.boardStatus)
      )
      clonedBoardStatus[r][c] = !clonedBoardStatus[r][c]
      return clonedBoardStatus
    }

    this.setState((prevState) => ({
      boardStatus: toggleBoardStatus(prevState),
    }))
  }

  handleNewBoard = () => {
    this.setState({
      boardStatus: newBoardStatus(),
      generation: 0,
    })
  }

  handleStep = () => {
    const nextStep = (prevState) => {
      const { boardStatus } = prevState
      const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus))

      const amountTrueNeighbors = (r, c) => {
        const neighbors = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, 1],
          [1, 1],
          [1, 0],
          [1, -1],
          [0, -1],
        ]
        return neighbors.reduce((trueNeighbors, neighbor) => {
          const x = r + neighbor[0]
          const y = c + neighbor[1]

          const isNeighborOnBoard =
            x >= 0 && x < totalBoardRows && y >= 0 && y < totalBoardColumns
          //! there is no need to count more than 5 alive neighbors
          if (trueNeighbors < 4 && isNeighborOnBoard && boardStatus[x][y]) {
            return trueNeighbors + 1
          } else {
            return trueNeighbors
          }
        }, 0)
      }

      for (let r = 0; r < totalBoardRows; r += 1) {
        for (let c = 0; c < totalBoardColumns; c += 1) {
          const totalTrueNeighbors = amountTrueNeighbors(r, c)

          if (!boardStatus[r][c]) {
            if (totalTrueNeighbors === 3) clonedBoardStatus[r][c] = true
          } else {
            if (totalTrueNeighbors < 2 || totalTrueNeighbors > 3)
              clonedBoardStatus[r][c] = false
          }
        }
      }
      return clonedBoardStatus
    }

    this.setState((prevState) => ({
      boardStatus: nextStep(prevState),
      generation: prevState.generation + 1,
    }))
  }

  handleSpeedChange = (newSpeed) => {
    this.setState({ speed: newSpeed })
  }

  handleRun = () => {
    this.setState({ isGameRunning: true })
  }

  handleStop = () => {
    this.setState({ isGameRunning: false })
  }

  componentDidUpdate(prevProps, prevState) {
    const { isGameRunning, speed } = this.state
    const speedChanged = prevState.speed !== speed
    const gameStarted = !prevState.isGameRunning && isGameRunning
    const gameStopped = prevState.isGameRunning && !isGameRunning

    if ((isGameRunning && speedChanged) || gameStopped) {
      clearInterval(this.timerId)
    }

    if ((isGameRunning && speedChanged) || gameStarted) {
      this.timerId = setInterval(() => {
        this.handleStep()
      }, speed)
    }
  }

  render() {
    return <div>App</div>
  }
}

export default App
