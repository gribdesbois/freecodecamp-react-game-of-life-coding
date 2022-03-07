import { totalBoardColumns, totalBoardRows } from '../../App'

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
export default newBoardStatus
