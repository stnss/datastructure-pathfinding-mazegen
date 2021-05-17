import NodeAStar from "../node/node_a-star";

export default class AStar {
  constructor(_grid, _gridSize) {
    this.grid = [];
    this.gridSize = _gridSize;
    this.path = [];
    this.animation = []
    for (let i = 0; i < _grid.length; i++) {
      let rowAstar = [];
      for (let j = 0; j < _grid[i].length; j++) {
        let nodeAstar = new NodeAStar(
          _grid[i][j].x,
          _grid[i][j].y,
          _grid[i][j].isWalkable
        );
        rowAstar.push(nodeAstar);
      }
      this.grid.push(rowAstar);
    }
  }

  a_star = function(startPos, endPos) {
    console.log("Start Find Path");
    const startNode = new NodeAStar(
      startPos.x,
      startPos.y,
      startPos.isWalkable
    );
    let endNode = new NodeAStar(endPos.x, endPos.y, endPos.isWalkable);

    let openNode = [];
    let closeNode = [];

    openNode.push(startNode);

    while (openNode.length > 0) {
      let currentNode = openNode[0];
      for (let i = 1; i < openNode.length; i++) {
        if (
          openNode[i].fCost() < currentNode.fCost() ||
          (openNode[i].fCost() == currentNode.fCost() &&
            openNode[i].data.hCost < currentNode.data.hCost)
        ) {
          currentNode = openNode[i];
        }
      }

      openNode = openNode.filter((value, index, arr) => {
        return arr[index] != currentNode;
      });

      closeNode.push(currentNode);
      this.animation.push({
        x: currentNode.x,
        y: currentNode.y,
        isVisited: true,
        isDiscovered: true,
        isPath: false
      })
      //   console.log(`${currentNode.x} : ${endNode.x} && ${currentNode.y} : ${endNode.y}`);

      if (currentNode.x == endNode.x && currentNode.y == endNode.y) {
        console.log(`Finish Find Path with Cost: `, currentNode.fCost());
        endNode = currentNode;
        this.retracePath(startNode, endNode);
        return {
          path: this.path, 
          animation: this.animation
        };
      }

      let neighbors = this.getNeighborNode(currentNode);

      neighbors.forEach((neighbor) => {
        if (!neighbor.isWalkable || closeNode.includes(neighbor)) return;

        let costToNeighbor =
          currentNode.data.gCost + this.getDistance(currentNode, neighbor);

        if (
          costToNeighbor < neighbor.data.gCost ||
          !openNode.includes(neighbor)
        ) {
          neighbor.data.gCost = costToNeighbor;
          neighbor.data.hCost = this.getDistance(neighbor, endNode);
          neighbor.data.parent = currentNode;
          neighbor.isDiscovered = true

          this.animation.push({
            x: neighbor.x,
            y: neighbor.y,
            isVisited: false,
            isDiscovered: true,
            isPath: false
          });

          if (!openNode.includes(neighbor)) openNode.push(neighbor);
        }
      });
    }
  };

  getNeighborNode = function(node) {
    let neighbors = [];

    /**
     * code below for approach only horizontal and vertical neighbor
     */
    // const neighborsCoordinate = [
    //   {x: -1, y: 0},
    //   {x: 1, y: 0},
    //   {x: 0, y: 1},
    //   {x: 0, y: -1}
    // ]

    // for(let i = 0; i < neighborsCoordinate.length; i++) {
    //   const insideX = node.x + neighborsCoordinate[i].x;
    //   const insideY = node.y + neighborsCoordinate[i].y;
    //   if (
    //     insideX >= 0 &&
    //     insideX < this.gridSize.x &&
    //     insideY >= 0 &&
    //     insideY < this.gridSize.y
    //   ) {
    //     let n = this.grid[insideX][insideY];
    //     neighbors.push(n);
    //   }
    // }

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x == 0 && y == 0) continue;

        const insideX = node.x + x;
        const insideY = node.y + y;

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
    }

    return neighbors;
  };

  getDistance = function(nodeA, nodeB) {
    let dstX = Math.abs(nodeA.x - nodeB.x);
    let dstY = Math.abs(nodeA.y - nodeB.y);

    if (dstX > dstY) return 14 * dstY + 10 * (dstX - dstY);

    return 14 * dstX + 10 * (dstY - dstX);
  };

  retracePath = function(startNode, endNode) {
    let currentNode = endNode;

    while (currentNode.x != startNode.x || currentNode.y != startNode.y) {
      this.path.push(currentNode);
      this.animation.push({
        x: currentNode.x,
        y: currentNode.y,
        isVisited: true,
        isDiscovered: true,
        isPath: true,
      });
      currentNode = currentNode.data.parent;
    }
  };
}
