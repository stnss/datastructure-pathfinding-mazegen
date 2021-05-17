<template>
  <div class="navbar">
    <div class="navbar-items order-1 grow-1">
      <h5 class="navbar-title">Pathfinding & Maze Generator<br />Visualizer</h5>
    </div>
    <div
      class="navbar-items order-3 grow-3 row row-cols-sm-auto g-3 align-items-center"
    >
      <div class="col-12">
        <select
          class="form-select form-select-sm"
          @change="changePathfindingAlgorithm($event)"
          :model="PATHFINDING_ALGORITHM"
        >
          <option value="1">A* Algorithm</option>
          <option value="2">Djikstra Algorithm</option>
          <option value="3">DFS Algorithm</option>
          <option value="4">BFS Algorithm</option>
        </select>
      </div>
      <div class="col-12">
        <button class="btn btn-primary btn-sm" v-on:click="findPath">
          Find Path
        </button>
      </div>
    </div>
    <div
      class="navbar-items order-2 grow-1 row row-cols-sm-auto g-3 align-items-center"
    >
      <div class="col-12">
        <select
          class="form-select form-select-sm"
          @change="changeMazeGeneratorAlgorithm($event)"
          :model="MAZE_GENERATION_ALGORITHM"
        >
          <option value="1">Recursive Back Tracking Algorithm</option>
          <option value="2">Prim's Algorithm</option>
        </select>
      </div>
      <div class="col-12">
        <button class="btn btn-danger btn-sm" v-on:click="generateMaze">
          Generate Maze
        </button>
      </div>
    </div>
  </div>
  <div id="detail">
    <div>
      <div class="node-start"></div>
      <p>Start Node</p>
    </div>
    <div>
      <div class="node-finish"></div>
      <p>Finish Node</p>
    </div>
    <div>
      <div class="node-discovered"></div>
      <p>Discovered Node</p>
    </div>
    <div>
      <div class="node-visited"></div>
      <p>Visited Node</p>
    </div>
    <div>
      <div class="node-shortest-path"></div>
      <p>Path Node</p>
    </div>
    <div>
      <div class="node-wall"></div>
      <p>Wall Node</p>
    </div>
  </div>
  <div class="grid" id="grid">
    <div class="row-x" v-for="row in state.grid" :key="row">
      <Node
        v-for="node in row"
        :key="node"
        :col="node.y"
        :row="node.x"
        :isWall="node.isWalkable"
        @click.left="onMouseLeftClick(node.x, node.y)"
        @click.right.prevent="onMouseRightClick(node.x, node.y)"
      />
    </div>
  </div>
</template>

<script>
import Node from "./Node/Node.vue";
import Nodes from "../algorithms/node/node";
import AStar from "../algorithms/pathfinding/a-star";
import RecursiveBackTracking from "../algorithms/maze_generator/recursivebacktracking";
import Prims from "../algorithms/maze_generator/prims";

export default {
  name: "Grid",
  components: {
    Node,
  },

  data: function () {
    return {
      PATHFINDING_ALGORITHM: "1",
      MAZE_GENERATION_ALGORITHM: "1",
      state: {
        grid: null,
        mousePressed: false,
      },
      nodeSize: {
        x: 10,
        y: 10,
      },
      gridSize: {
        x: 0,
        y: 0,
      },
      START_NODE_ROW: null,
      START_NODE_COL: null,
      FINISH_NODE_ROW: null,
      FINISH_NODE_COL: null,
    };
  },

  mounted() {
    this.state.grid = this.getInitialGrid();
  },

  methods: {
    changePathfindingAlgorithm: function (event) {
      this.PATHFINDING_ALGORITHM = event.target.value;
    },

    changeMazeGeneratorAlgorithm: function (event) {
      this.MAZE_GENERATION_ALGORITHM = event.target.value;
    },

    getInitialGrid: function () {
      const grid = [];

      const content = document.getElementById("grid");
      this.gridSize.x = content.clientHeight / 10;
      this.gridSize.y = content.clientWidth / 10;

      console.log(this.gridSize)

      for (let row = 0; row < this.gridSize.x; row++) {
        const currentRow = [];
        for (let col = 0; col < this.gridSize.y; col++) {
          currentRow.push(this.createNode(col, row, true));
        }
        grid.push(currentRow);
      }
      return grid;
    },

    findPath: function () {
      let result = { path: [], animation: [] };
      switch (this.PATHFINDING_ALGORITHM) {
        case "1":
          {
            let astar = new AStar(this.state.grid, this.gridSize);
            result = astar.a_star(
              {
                x: this.START_NODE_ROW,
                y: this.START_NODE_COL,
                isWalkable: true,
              },
              {
                x: this.FINISH_NODE_ROW,
                y: this.FINISH_NODE_COL,
                isWalkable: true,
              }
            );
          }
          break;
        case "2":
          {
            console.log("This algorithm not implemented yet.");
          }
          break;
        case "3":
          {
            console.log("This algorithm not implemented yet.");
          }
          break;
        case "4":
          {
            console.log("This algorithm not implemented yet.");
          }
          break;
      }

      this.animatePathFindingAlgorithm(result.animation);
    },

    generateMaze: function () {
      let result = null;
      let mgAlgorithm = null;

      switch (this.MAZE_GENERATION_ALGORITHM) {
        case "1":
          {
            mgAlgorithm = new RecursiveBackTracking(
              this.state.grid,
              this.gridSize
            );
            result = mgAlgorithm.rbt();
          }
          break;

        case "2":
          {
            mgAlgorithm = new Prims(this.state.grid, this.gridSize);
            result = mgAlgorithm.prims();
          }
          break;
      }

      this.animateMazeGenerator(result);
    },

    createNode: function (col, row, isWalkable) {
      return new Nodes(row, col, isWalkable);
    },

    onMouseEnter: function (row, col) {
      if (!this.state.mousePressed) return;
      const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
      this.state.grid = newGrid;
    },

    onMouseDown: function (row, col) {
      const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
      this.state = { grid: newGrid, mousePressed: true };
    },

    onMouseUp: function () {
      this.state.mousePressed = false;
    },

    onMouseLeftClick: function (row, col) {
      if (!this.state.grid[row][col].isWalkable) return;

      if (this.START_NODE_ROW !== null && this.START_NODE_COL !== null)
        document.getElementById(
          `node-${this.START_NODE_ROW}-${this.START_NODE_COL}`
        ).className = "node";

      this.START_NODE_ROW = row;
      this.START_NODE_COL = col;
      document.getElementById(`node-${row}-${col}`).className =
        "node node-start";
    },

    onMouseRightClick: function (row, col) {
      if (!this.state.grid[row][col].isWalkable) return;

      if (this.FINISH_NODE_ROW !== null && this.FINISH_NODE_COL !== null)
        document.getElementById(
          `node-${this.FINISH_NODE_ROW}-${this.FINISH_NODE_COL}`
        ).className = "node";

      this.FINISH_NODE_ROW = row;
      this.FINISH_NODE_COL = col;
      document.getElementById(`node-${row}-${col}`).className =
        "node node-finish";
    },

    getNewGridWithWallToggled: function (grid, row, col) {
      grid[row][col] = {
        ...grid[row][col],
        isWalkable: !grid[row][col].isWalkable,
      };

      return grid;
    },

    setAllWall: function (grid) {
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          setTimeout(() => {
            grid[i][j] = {
              ...grid[i][j],
              isWalkable: false,
            };
          }, 150 * (i + j));
        }
      }

      // return grid;
    },

    animatePathFindingAlgorithm: function (animation) {
      for (let i = 0; i < animation.length; i++) {
        setTimeout(() => {
          const node = animation[i];

          if (
            node.x !== this.START_NODE_ROW ||
            node.y !== this.START_NODE_COL
          ) {
            if (node.isDiscovered && node.isVisited && node.isPath)
              document.getElementById(`node-${node.x}-${node.y}`).className =
                "node node-shortest-path";
            else if (node.isDiscovered && node.isVisited && !node.isPath)
              document.getElementById(`node-${node.x}-${node.y}`).className =
                "node node-visited";
            else
              document.getElementById(`node-${node.x}-${node.y}`).className =
                "node node-discovered";
          }
        }, 50 * i);
      }
    },

    animateMazeGenerator: function (animation) {
      for (let i = 0; i < animation.length; i++) {
        const node = animation[i];
        setTimeout(() => {
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node";
        }, 30 * i);

        this.state.grid[node.x][node.y] = {
          ...this.state.grid[node.x][node.y],
          isWalkable: node.isWalkable,
        };
      }
    },
  },
};
</script>

<style scoped>
.grid {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: absolute;
  top: 126px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  border-top: 1px solid rgb(175, 216, 248);
}

.grid div.row-x {
  width: 100%;
  display: flex;
}

div#detail {
  height: 54px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  overflow: hidden;
}

div#detail > div {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
}

div#detail > div > p {
  margin: 0;
  font-size: 12px;
}

div#detail > div > div {
  padding: 5px;
  margin: 5px auto;
  outline: 1px solid rgb(161, 189, 211);
}

div.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  overflow: hidden;
}

div.navbar-items {
  flex-grow: 1;
}

div.navbar-items.grow-1 {
  flex-grow: 1;
}

div.navbar-items.grow-2 {
  flex-grow: 2;
}

div.navbar-items.grow-3 {
  flex-grow: 3;
}

div.navbar-items.grow-4 {
  flex-grow: 4;
}

.navbar > .navbar-items > .navbar-title {
  color: rgb(175, 216, 248);
}
</style>