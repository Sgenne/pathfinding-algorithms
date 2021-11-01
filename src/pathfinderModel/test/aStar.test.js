import aStar from "../algorithms/aStar";
import dijkstra from "../algorithms/Dijkstra";
import { generateGrid } from "./util";

test("aStar finds a path in a grid without obstacles", () => {
  const { grid, start, goal } = generateGrid();

  const { found } = aStar(grid, start, goal);

  expect(found).toBe(true);
});

test("aStar doesn't find a path in a grid where no path exists.", () => {
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

  const { found } = aStar(grid, cell13, cell33);

  expect(found).toBe(false);
});

test("the path found by aStar is equal to the one found by dijkstra", () => {
  const { grid, start, goal } = generateGrid({ obstacleDensity: 0.2 });

  const { grid: dijkstraGrid, found: dijkstraFound } = dijkstra(grid, start);

  const { grid: aStarGrid, found: aStarFound } = aStar(grid, start, goal);

  expect(dijkstraFound === aStarFound).toBe(true);

  if (!dijkstraFound) return;

  const dijkstraGoal = dijkstraGrid[goal.coordinates.y][goal.coordinates.x];
  const aStarGoal = aStarGrid[goal.coordinates.y][goal.coordinates.x];

  if (!(aStarGoal.distance <= dijkstraGoal.distance)) {
    console.log("grid: ", grid);
    console.log("start: ", start);
    console.log("goal: ", goal);
  }

  expect(aStarGoal.distance <= dijkstraGoal.distance).toBe(true);
});
