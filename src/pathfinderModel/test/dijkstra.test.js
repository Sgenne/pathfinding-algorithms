import dijkstra from "../algorithms/Dijkstra";
import { generateGrid } from "./util";

test("find shortest path in grid with no obstacles", () => {
  const cell11 = { coordinates: { x: 0, y: 0 } };
  const cell12 = { coordinates: { x: 1, y: 0 } };
  const cell13 = { isStart: true, coordinates: { x: 2, y: 0 } };
  const cell21 = { coordinates: { x: 0, y: 1 } };
  const cell22 = { coordinates: { x: 1, y: 1 } };
  const cell23 = { coordinates: { x: 2, y: 1 } };
  const cell31 = { coordinates: { x: 0, y: 2 } };
  const cell32 = { coordinates: { x: 1, y: 2 } };
  const cell33 = { isGoal: true, coordinates: { x: 2, y: 2 } };

  const grid = [
    [cell11, cell12, cell13],
    [cell21, cell22, cell23],
    [cell31, cell32, cell33],
  ];

  const { found } = dijkstra(grid, cell13);

  expect(found).toBe(true);
});

test("path from start to goal does not exist", () => {
  const cell11 = { coordinates: { x: 0, y: 0 } };
  const cell12 = { coordinates: { x: 1, y: 0 } };
  const cell13 = { isStart: true, coordinates: { x: 2, y: 0 } };
  const cell21 = { coordinates: { x: 0, y: 1 } };
  const cell22 = { coordinates: { x: 1, y: 1 }, isObstacle: true };
  const cell23 = { coordinates: { x: 2, y: 1 }, isObstacle: true };
  const cell31 = { coordinates: { x: 0, y: 2 } };
  const cell32 = { coordinates: { x: 1, y: 2 }, isObstacle: true };
  const cell33 = { isGoal: true, coordinates: { x: 2, y: 2 } };

  const grid = [
    [cell11, cell12, cell13],
    [cell21, cell22, cell23],
    [cell31, cell32, cell33],
  ];

  const { found } = dijkstra(grid, cell13);

  expect(found).toBe(false);
});

test("resulting path leads from start to goal", () => {
  const { grid, start, goal } = generateGrid();

  const { grid: resultGrid } = dijkstra(grid, start);

  let backtrackNode = resultGrid[goal.coordinates.y][goal.coordinates.x];

  expect(backtrackNode.isGoal).toBe(true);

  let path = [];

  while (backtrackNode && !backtrackNode.isStart) {
    path.push(backtrackNode);

    backtrackNode = backtrackNode.predecessor;
  }
  expect(path.length).toBe(
    Math.abs(start.coordinates.x - goal.coordinates.x) +
      Math.abs(start.coordinates.y - goal.coordinates.y)
  );
});

test("the path is no longer than the number of visited nodes", () => {
  const { grid, start, goal } = generateGrid();

  const { grid: resultGrid, visited } = dijkstra(grid, start);

  let backtrackNode = resultGrid[goal.coordinates.y][goal.coordinates.x];
  let path = [];

  while (backtrackNode && !backtrackNode.isStart) {
    path.push(backtrackNode);

    backtrackNode = backtrackNode.predecessor;
  }

  expect(path.length < visited.length).toBe(true);
});
