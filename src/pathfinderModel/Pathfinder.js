import aStar from "./algorithms/aStar";
import dijkstra from "./algorithms/dijkstra";

/**
 * @class - Base class of pathfinding model.
 */
export default class Pathfinder {
  /**
   * Runs Dijkstra's algorithm on a given grid.
   * @param {Array<Array<object>>} grid : 2D array of objects representing the cells of the grid.
   * @param {object} start : The start of the search.
   * @returns Object containing a boolean value under "found" indicating if a path was found, 
   *          a copy of the grid under "result" where the path from the start to the goal has 
   *          been inserted (if one exists), and the found path from the start to the goal 
   *          (if one exists) under "path" 
   */
  runDijkstra(grid, start) {
    return dijkstra(grid, start)
  }

  /**
   * Runs the a* algorithm on a given grid.
   * @param {Array<Array<object>>} grid : 2D array of objects representing the cells of the grid.
   * @param {object} start : The start of the search.
   * @param {object} goal : The goal of the search.
   * @returns Object containing a boolean value under "found" indicating if a path was found, 
   *          a copy of the grid under "result" where the path from the start to the goal has 
   *          been inserted (if one exists), and the found path from the start to the goal 
   *          (if one exists) under "path" . 
   */
   runAStar(grid, start, goal) {
    return aStar(grid, start, goal)
  }


}
