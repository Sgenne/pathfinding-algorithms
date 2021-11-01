const generateGrid = (options = {}) => {
  let gridWidth = 10;
  let gridHeight = 10;

  const grid = [];

  for (let r = 0; r < gridHeight; r++) {
    const row = [];
    for (let c = 0; c < gridWidth; c++) {
      let isObstacle = false;

      if (options.obstacleDensity) {
        isObstacle = Math.random() <= options.obstacleDensity;
      }
      
      const cell = {
        coordinates: { x: c, y: r },
        isObstacle: isObstacle,
      };
      row.push(cell);
    }
    grid.push(row);
  }

  const goalY = Math.floor(Math.random() * gridWidth);
  const goalX = Math.floor(Math.random() * gridWidth);

  let startX = goalX;
  let startY = goalY;

  while (startX === goalX && startY === goalY) {
    startX = Math.floor(Math.random() * gridWidth);
    startY = Math.floor(Math.random() * gridWidth);
  }

  const startCell = grid[startY][startX];
  const goalCell = grid[goalY][goalX]  

  startCell.isStart = true;
  goalCell.isGoal = true;

  return {
    grid: grid,
    start: startCell,
    goal: goalCell
  }
} 

export {
  generateGrid
}