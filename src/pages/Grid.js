import Pathfinder from "../pathfinderModel/Pathfinder";
import { useEffect, useReducer } from "react";

import GridComponent from "../components/grid/Grid";

const DEFAULT_STATE = {};

const GRID_WIDTH = 0.7; // 60% of window width
const GRID_HEIGHT = 0.7; // 60% of window height

const CELL_WIDTH = 20;

const _generateGrid = (width, height) => {
  const grid = [];

  for (let r = 0; r < height; r++) {
    const row = [];
    for (let c = 0; c < width; c++) {
      const cell = {
        coordinates: { x: c, y: r },
      };

      row.push(cell);
    }
    grid.push(row);
  }
  return grid;
};

const _clickHandler = (state, action) => {
  let startCell = state.startCell;
  let goalCell = state.goalCell;

  const clickedCellCoordinates = action.clickedCell.coordinates;
  const newGrid = state.grid.map((row) => row.map((cell) => cell)); // Deep copy
  const cell = newGrid[clickedCellCoordinates.y][clickedCellCoordinates.x];
  if (!startCell) {
    cell.isStart = true;
    startCell = cell;
  } else if (!goalCell) {
    cell.isGoal = true;
    goalCell = cell;
  } else if (!cell.isStart && !cell.isGoal) {
    cell.isObstacle = true;
  }
  return {
    ...state,
    grid: newGrid,
    startCell: startCell,
    goalCell: goalCell,
    clicked: true,
  };
};

const _gridReducer = (state, action) => {
  if (action.type === "CLICK") {
    return _clickHandler(state, action);
  } else if (action.type === "HOVER") {
    if (!state.clicked) {
      return state;
    }
    return _clickHandler(state, action);
  } else if (action.type === "RELEASE") {
    return { ...state, clicked: false };
  } else if (action.type === "REMOVE") {
    let startCell = state.startCell;
    let goalCell = state.goalCell;

    if (action.clickedCell.isStart) {
      startCell = undefined;
    } else if (action.clickedCell.isGoal) {
      goalCell = undefined;
    }

    const clickedCellCoordinates = action.clickedCell.coordinates;
    const newGrid = state.grid.map((row) =>
      row.map((cell) => {
        if (
          cell.coordinates.x === clickedCellCoordinates.x &&
          cell.coordinates.y === clickedCellCoordinates.y
        ) {
          return { coordinates: clickedCellCoordinates };
        }
        return cell;
      })
    );

    return {
      ...state,
      grid: newGrid,
      startCell: startCell,
      goalCell: goalCell,
      found: false,
    };
  } else if (action.type === "INIT") {
    const { innerWidth: width, innerHeight: height } = window;

    const rowSize = Math.floor((width * GRID_WIDTH) / CELL_WIDTH);
    const colSize = Math.floor((height * GRID_HEIGHT) / CELL_WIDTH);

    const newGrid = _generateGrid(rowSize, colSize);

    return {
      ...state,
      grid: newGrid,
      startCell: undefined,
      goalCell: undefined,
      found: false,
      clicked: false,
    };
  }
  // Clears visited/seen/path but keeps start, goal, and obstacles
  else if (action.type === "RESET") {
    return { ...state, visited: undefined };
  } else if (action.type === "A_STAR") {
    const pathfinder = new Pathfinder();
    const {
      grid: newGrid,
      found,
      visited,
    } = pathfinder.runAStar(state.grid, state.startCell, state.goalCell);

    const newStartCell =
      newGrid[state.startCell.coordinates.y][state.startCell.coordinates.x];
    const newGoalCell =
      newGrid[state.goalCell.coordinates.y][state.goalCell.coordinates.x];

    return {
      ...state,
      grid: newGrid,
      found: found,
      visited: visited,
      startCell: newStartCell,
      goalCell: newGoalCell,
    };
  } else if (action.type === "DIJKSTRA") {
    const pathfinder = new Pathfinder();
    const {
      grid: newGrid,
      found,
      visited,
    } = pathfinder.runDijkstra(state.grid, state.startCell);

    const newStartCell =
      newGrid[state.startCell.coordinates.y][state.startCell.coordinates.x];
    const newGoalCell =
      newGrid[state.goalCell.coordinates.y][state.goalCell.coordinates.x];

    return {
      ...state,
      grid: newGrid,
      found: found,
      visited: visited,
      startCell: newStartCell,
      goalCell: newGoalCell,
    };
  } else {
    return DEFAULT_STATE;
  }
};

const Grid = () => {
  const [state, dispatch] = useReducer(_gridReducer, DEFAULT_STATE);

  useEffect(() => {
    dispatch({ type: "INIT" });
  }, []);

  const clickHandler = (clickedCell) => {
    dispatch({ type: "CLICK", clickedCell: clickedCell });
  };

  const hoverHandler = (hoveredCell) => {
    dispatch({ type: "HOVER", clickedCell: hoveredCell });
  };

  const releaseHandler = () => {
    dispatch({ type: "RELEASE" });
  };

  const removeCellHandler = (clickedCell) => {
    dispatch({ type: "REMOVE", clickedCell: clickedCell });
  };

  const resetGridHandler = () => {
    dispatch({ type: "RESET" });
  };

  const clearGridHandler = () => {
    dispatch({ type: "INIT" });
  };

  const aStar = () => {
    if (!state.startCell || !state.goalCell) {
      return; // TODO: show error
    }

    dispatch({ type: "A_STAR" });
  };

  const dijkstra = () => {
    if (!state.startCell || !state.goalCell) {
      return; // TODO: show error
    }

    dispatch({ type: "DIJKSTRA" });
  };

  if (!state.grid) {
    return <div></div>;
  }

  const pathfinders = {
    dijkstra: dijkstra,
    aStar: aStar,
  };

  return (
    <GridComponent
      grid={state.grid}
      start={state.startCell}
      goal={state.goalCell}
      cellClickHandler={clickHandler}
      hoverHandler={hoverHandler}
      releaseHandler={releaseHandler}
      removeCellHandler={removeCellHandler}
      pathfinders={pathfinders}
      found={state.found}
      visited={state.visited}
      resetGridHandler={resetGridHandler}
      clearGridHandler={clearGridHandler}
    />
  );
};

export default Grid;
