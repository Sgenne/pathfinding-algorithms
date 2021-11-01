/**
 * Finds and returns the adjacent cells (neighbours) of a given cell.
 * @param {Array<Array<object>>} grid : Grid of cells.
 * @param {object} cell : The cell whose neighbours will be returned 
 * @returns {Array<object>} The neighbours of the given cell.x
 */
 const getNeighbours = (grid, cell) => {
  const neighbours = [];
  const cellRow = cell.coordinates.y;
  const cellCol = cell.coordinates.x;

  if (cellRow - 1 >= 0) {
    neighbours.push(grid[cellRow - 1][cellCol]);
  }
  if (cellCol - 1 >= 0) {
    neighbours.push(grid[cellRow][cellCol - 1]);
  }
  if (cellCol + 1 < grid[cellRow].length) {
    neighbours.push(grid[cellRow][cellCol + 1])
  } 
  if (cellRow + 1 < grid.length) {
    neighbours.push(grid[cellRow + 1][cellCol])  
  }

  return neighbours;
}


export {
  getNeighbours
}