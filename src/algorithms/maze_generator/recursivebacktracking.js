import Node from "../node/node";

export default class RecursiveBackTracking {
  constructor(_grid, _gridSize) {
    this.grid = _grid;
    this.gridSize = _gridSize;
    this.animation = [];
    this.visitedNode = [];
  }

  rbt = function() {
    let rowNum = this.getRandomIndex(0, this.grid.length);
    let colNum = this.getRandomIndex(0, this.grid[rowNum].length);

    let startNode = this.grid[rowNum][colNum];

    this.recursiveBackTracking(startNode);
    return this.animation
  };

  recursiveBackTracking = function(currentNode) {
    // console.log("Current:", currentNode);
    // currentNode.isWalkable = true;
    this.animation.push({
      x: currentNode.x,
      y: currentNode.y,
      isWalkable: true
    })
    this.visitedNode.push(currentNode);
    let neighborsNode = this.getNeighborNodes(currentNode);
    // console.log("List:", neighborsNode);
    while (neighborsNode.length > 0) {
      let index = this.getRandomInt(0, neighborsNode.length - 1);
      // console.log(`index: ${index}`);
      let n = neighborsNode[index];
      if (!this.visitedNode.includes(n)) {
        let wallX = -1;
        let wallY = -1;
        if (currentNode.x === n.x) {
          wallX = currentNode.x;
          wallY = currentNode.y > n.y ? currentNode.y - 1 : currentNode.y + 1;
        } else if (currentNode.y === n.y) {
          wallX = currentNode.x > n.x ? currentNode.x - 1 : currentNode.x + 1;
          wallY = currentNode.y;
        }
        // console.log(`x: ${wallX} y: ${wallY}`);
        this.animation.push({
          x: this.grid[wallX][wallY].x,
          y: this.grid[wallX][wallY].y,
          isWalkable: true,
        });
        neighborsNode.splice(index, 1);
        // console.log(n);
        this.recursiveBackTracking(n);
      } else {
        neighborsNode.splice(index, 1);
      }
    }
    // 1. set current node to walkable
    // 2. mark current node as visited node
    // 3. get all neighbor from current node
    // 4. set current node to random neighbor node
  };

  getRandomIndex = function(from, to) {
    return Math.floor(Math.random() * (to - from) + from);
  };

  getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  getNeighborNodes = function(node) {
    let neighbors = [];

    const neighborsCoordinate = [
      { x: -2, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 2 },
      { x: 0, y: -2 },
    ];

    for (let i = 0; i < neighborsCoordinate.length; i++) {
      const insideX = node.x + neighborsCoordinate[i].x;
      const insideY = node.y + neighborsCoordinate[i].y;
      if (
        insideX >= 0 &&
        insideX < this.gridSize.x &&
        insideY >= 0 &&
        insideY < this.gridSize.y
      ) {
        let n = this.grid[insideX][insideY];
        neighbors.push(n);
      }
    }

    return neighbors;
  };

  rouletteSelect = function(src) {
    const roll = Math.random() * src.length;

    let sum = 0;
    for (let i = 0; i < src.length; i++) {
      sum += 1.0;
      if (roll < sum) {
        const res = src[i];
        src = src.splice(i, 1);
        return res;
      }
    }
  };
}
