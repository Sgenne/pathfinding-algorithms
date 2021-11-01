import { useEffect, useState } from "react";

import styles from "./Grid.module.css";
import Cell from ".././cell/Cell";
import { getNeighbours } from "../../util";
import Button from "../ui/buttons/Button";

const UPDATE_RATE = 1; // ms. How often the grid is updated.

const Grid = ({
  grid,
  cellClickHandler,
  hoverHandler,
  releaseHandler,
  removeCellHandler,
  resetGridHandler,
  clearGridHandler,
  pathfinders,
  visited,
  start,
  goal,
}) => {
  const [displayedGrid, setDisplayedGrid] = useState();
  const [currentIteration, setCurrentIteration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalIdentifier, setIntervalIdentifier] = useState();
  const [foundGoal, setFoundGoal] = useState(false);

  useEffect(() => {
    setDisplayedGrid(_produceDisplayedGrid(grid));
  }, [grid, visited]);

  // start interval when isRunning becomes true
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setCurrentIteration((previousIterations) => previousIterations + 1);
      }, UPDATE_RATE);
      setIntervalIdentifier(interval);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  // clear interval when isRunning becomes false
  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalIdentifier);
      setCurrentIteration(0);
      setIsRunning(false);
      setFoundGoal(false);
    }
  }, [isRunning, intervalIdentifier]);

  // update the displayed grid when the current iteration changes
  useEffect(() => {
    if (!visited || !isRunning) return;

    if (foundGoal) {
      let backtrackNode =
        displayedGrid[goal.predecessor.coordinates.y][
          goal.predecessor.coordinates.x
        ];
      while (backtrackNode.color === "yellow" && !backtrackNode.isStart) {
        backtrackNode =
          displayedGrid[backtrackNode.predecessor.coordinates.y][
            backtrackNode.predecessor.coordinates.x
          ];
      }

      if (backtrackNode.isStart) {
        setIsRunning(false);
        return;
      }

      backtrackNode.color = "yellow";
      return;
    }

    if (visited[currentIteration].isStart) {
      return;
    }

    if (visited[currentIteration].isGoal) {
      setFoundGoal(true);
      return;
    }

    setDisplayedGrid((prevGrid) => {
      const visitedCoordinates = visited[currentIteration].coordinates;
      const visitedNode = prevGrid[visitedCoordinates.y][visitedCoordinates.x];
      visitedNode.color = "blue";
      getNeighbours(prevGrid, visitedNode).forEach((n) => {
        const neighbour = prevGrid[n.coordinates.y][n.coordinates.x];
        if (neighbour.color === "white") {
          neighbour.color = "purple";
        }
      });
      return prevGrid;
    });
  }, [currentIteration, visited, displayedGrid, foundGoal, goal, isRunning]);

  const aStarClickedHandler = () => {
    if (!start || !goal || isRunning) {
      return;
    }
    pathfinders.aStar();
    setIsRunning(true);
  };

  const dijkstraClickedHandler = () => {
    if (!start || !goal || isRunning) return;
    pathfinders.dijkstra();
    setIsRunning(true);
  };

  const resetClickedHandler = () => {
    if (isRunning) {
      setIsRunning(false);
    }
    resetGridHandler();
  };

  const clearClickedHandler = () => {
    if (isRunning) {
      setIsRunning(false)
    }
    clearGridHandler();
  }

  if (!displayedGrid) return <div></div>;

  return (
    <div className={styles["container"]}>
      <div className={styles["grid"]}>
        {displayedGrid.map((row) => (
          <ul
            className={styles["row"]}
            key={row[0].coordinates.x + row[0].coordinates.y}
          >
            {row.map((cell) => (
              <Cell
                key={cell.coordinates.x + ", " + cell.coordinates.y}
                color={cell.color}
                onMouseDown={() => cellClickHandler(cell)}
                onMouseOver={() => hoverHandler(cell)}
                onMouseUp={releaseHandler}
                onRightClick={() => removeCellHandler(cell)}
                width="20px"
                height="20px"
              />
            ))}
          </ul>
        ))}
      </div>
      <ul className={styles["control"]}>
        <li className={styles["control__button"]}>
          <Button onClick={aStarClickedHandler}>A*</Button>
        </li>

        <li className={styles["control__button"]}>
          <Button onClick={dijkstraClickedHandler}>Dijkstra</Button>
        </li>

        <li className={styles["control__button"]}>
          <Button onClick={resetClickedHandler}>Reset</Button>
        </li>
        <li className={styles["control__button"]}>
          <Button onClick={clearClickedHandler}>Clear</Button>
        </li>
      </ul>
    </div>
  );
};

const _produceDisplayedGrid = (grid) => {
  const displayedGrid = grid.map((row) =>
    row.map((cell) => {
      let color = "white";
      if (cell.isStart) {
        color = "green";
      } else if (cell.isGoal) {
        color = "red";
      } else if (cell.isObstacle) {
        color = "black";
      }

      return { ...cell, color: color };
    })
  );
  return displayedGrid;
};

export default Grid;
