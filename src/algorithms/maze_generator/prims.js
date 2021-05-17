import Node from "../node/node";

export default class Prims {
  constructor(_grid, _gridSize) {
    this.grid = _grid;
    this.gridSize = _gridSize;
    this.animation = [];
  }

  prims = function () {
      let rowNum = this.getRandomIndex(0, this.grid.length);
      let colNum = this.getRandomIndex(0, this.grid[rowNum].length);

      let startNode = this.grid[rowNum][colNum];
      let neighbors = []

      // while(true) {

      // }
  }
}
