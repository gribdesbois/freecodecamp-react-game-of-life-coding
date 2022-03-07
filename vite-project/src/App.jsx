import React, { Component } from 'react'

const totalBoardRows = 40
const totalBoardColumns = 60

const newBoardStatus = (cellStatus = () => Math.random() < 0.3) =>{
  const grid = []
  for (let r=0; r < totalBoardRows; r +=1) {
    grid[r] = []
    for (let c = 0; c< totalBoardColumns; c+=1)
  }
}
const BoardGrid = () => {}
const Slider = () => {}

export class App extends Component {
  state = {}
  render() {
    return (
      <div>App</div>
    )
  }
}

export default App
