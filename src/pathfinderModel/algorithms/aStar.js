import PriorityQueue from "fastpriorityqueue";
import dijkstra from "./dijkstra";
import { getNeighbours } from "../../util";

/**
 * @param {Array<Array<object>>} grid : The grid on which the algorithm will run.
 * @param {object} start : The start cell of the algorithm.
 * @param {object} goal : The goal cell of the algorithm.
 * @returns {object} An object containing a copy of the grid where the path has been inserted under "grid".
 *                   Also contains a boolean value indicating whether a path exists under "found".
 */

const aStar = (grid, start, goal) => {
  grid = grid.map((row) => row.map((obj) => ({ ...obj })));
  start = grid[start.coordinates.y][start.coordinates.x];
  start.distance = 0;

  _computeEstimates(grid, goal);
  
  return dijkstra(grid, start, _compareCells);
};

const _computeEstimates = (grid, goal) => {
  for (let row in grid) {
    for (let col in grid[row]) {
      const cell = grid[row][col];
      cell.estimate =
        Math.abs(goal.coordinates.x - col) + Math.abs(goal.coordinates.y - row);
    }
  }
};

const _compareCells = (cell1, cell2) => {
  if (cell1.distance + cell1.estimate < cell2.distance + cell2.estimate) {
    return true;
  } else if (
    cell1.distance + cell1.estimate >
    cell2.distance + cell2.estimate
  ) {
    return false;
  } else {
    return cell1.estimate < cell2.estimate;
  }
};

export default aStar;
