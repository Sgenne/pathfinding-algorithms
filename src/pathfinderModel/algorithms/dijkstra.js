import PriorityQueue from "fastpriorityqueue";
import { getNeighbours } from "../../util";

/**
 * @param {Array<Array<object>>} grid : The grid on which the algorithm will run.
 * @param {object} start : The start cell of the algorithm.
 * @param {(object, object) => boolean} : The function used to decide the order of cells in the priority queue.
 *                                        Comparator(a, b) should return true iff a has a higher priority than b.
 * @returns An object containing a the results of the search.
 */
const dijkstra = (grid, start, comparator) => {
  if (!comparator) {
    comparator = _compareCells;
  }

  const priorityQueue = new PriorityQueue(comparator);
  const seen = [];
  const visited = [];

  grid = grid.map((row) => row.map((obj) => ({ ...obj })));
  start = grid[start.coordinates.y][start.coordinates.x];
  start.distance = 0;

  priorityQueue.add(start);
  seen.push(start);

  while (priorityQueue.size > 0) {
    const currentNode = priorityQueue.poll();
    visited.push(currentNode);

    if (currentNode.isGoal) {
      const path = _producePath(currentNode);
      return {
        grid: grid,
        found: true,
        path: path,
        visited: visited,
      };
    }

    currentNode.neighbours = [];
    const currentNeighbours = getNeighbours(grid, currentNode);
    currentNeighbours.forEach((neighbour) => {
      currentNode.neighbours.push(neighbour);
      if (seen.includes(neighbour) || neighbour.isObstacle) return;
      neighbour.distance = currentNode.distance + 1;
      neighbour.predecessor = currentNode;

      priorityQueue.add(neighbour);
      seen.push(neighbour);
    });
  }

  return {
    grid: grid,
    found: false,
    visited: visited,
  };
};

/**
 * Compares the distances of two given cells.
 * @param {object} a : Cell.
 * @param {object} b : Cell.
 * @returns True if the distance of cell a is greater than the distance of cell b.
 *          Otherwise, returns false.
 */
const _compareCells = (a, b) => a.distance <= b.distance;

// Produces the path from the given node to the start of the performed search.
const _producePath = (goal) => {
  let currentNode = goal;
  const path = [];

  while (!currentNode.isStart) {
    path.unshift(currentNode);
    currentNode = currentNode.predecessor;
  }

  path.unshift(currentNode);

  return path;
};

export default dijkstra;
