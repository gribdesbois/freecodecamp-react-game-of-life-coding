import React, { Component } from 'react'

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

  render() {
    return <div>App</div>
  }
}

export default App
