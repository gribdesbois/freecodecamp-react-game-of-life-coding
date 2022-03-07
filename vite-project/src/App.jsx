import React, { Component } from 'react'

const totalBoardRows = 40
const totalBoardColumns = 60

const newBoardStatus = (cellStatus = () => Math.random() < 0.3) => {
  const grid = []
  for (let r = 0; r < totalBoardRows; r += 1) {
    grid[r] = []
    for (let c = 0; c < totalBoardColumns; c += 1) {
      grid[r][c] = cellStatus()
    }
  }
  return grid
}

/* Returns an array of arrays, each containing booleans values
(40) [Array(60), Array(60), ... ]
0: (60) [true, false, true, ... ]
1: (60) [false, false, false, ... ]
2: (60) [false, false, true, ...]
...
*/

const BoardGrid = ({ boardStatus, onToggleCellStatus }) => {
  const handleClick = (r, c) => onToggleCellStatus(r, c)

  const tr = []
  for (let r = 0; r < totalBoardRows; r++) {
    const td = []
    for (let c = 0; c < totalBoardColumns; c++) {
      td.push(
        <td
          key={`${r},${c}`}
          className={boardStatus[r][c] ? 'alive' : 'dead'}
          onClick={() => handleClick(r, c)}
        />
      )
    }
    tr.push(<tr key={r}>{td}</tr>)
  }
  return (
    <table>
      <tbody>{tr}</tbody>
    </table>
  )
}

const Slider = () => {}

export class App extends Component {
  state = {}
  render() {
    return <div>App</div>
  }
}

export default App
