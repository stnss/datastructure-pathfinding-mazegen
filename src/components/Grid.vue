<template>
  <div class="navbar">
    <div class="navbar-items order-2 grow-4">
      <button v-on:click="findPath">Find Path</button>
    </div>
    <div class="navbar-items order-1">
      <h3 class="navbar-title">Pathfinding Visualizer</h3>
    </div>
  </div>
  <div class="grid" id="grid">
    <div class="row" v-for="row in state.grid" :key="row">
      <Node
        v-for="node in row"
        :key="node"
        :col="node.y"
        :row="node.x"
        :isFinish="node.y === FINISH_NODE_COL && node.x === FINISH_NODE_ROW"
        :isStart="node.y === START_NODE_COL && node.x === START_NODE_ROW"
        :isWall="!node.isWalkable"
        :isPath="node.isPath"
        @mouseup.left="onMouseUp"
        @mousedown.left="onMouseDown(node.x, node.y)"
      />
    </div>
  </div>
</template>

<script>
import Node from "./Node/Node.vue";
import { useWindowSize } from "vue-window-size";
import NodeAStar from "../algorithms/node/node_a-star";
import AStar from "../algorithms/a-star";

export default {
  name: "Grid",
  components: {
    Node,
  },

  setup() {
    const { width, height } = useWindowSize();
    return {
      windowWidth: width,
      windowHeight: height,
    };
  },

  data: function () {
    return {
      state: {
        grid: null,
        mousePressed: false,
      },
      dimentionContainer: {
        width: this.windowWidth,
        height: this.windowHeight,
      },
      nodeSize: {
        x: 10,
        y: 10,
      },
      gridSize: {
        x: Math.floor(this.windowHeight / 10),
        y: Math.floor(this.windowWidth / 10),
      },
      START_NODE_ROW: 10,
      START_NODE_COL: 15,
      FINISH_NODE_ROW: 42,
      FINISH_NODE_COL: 120,
    };
  },

  mounted() {
    this.state.grid = this.getInitialGrid();
  },

  methods: {
    getInitialGrid: function () {
      const grid = [];
      for (let row = 0; row < this.gridSize.x; row++) {
        const currentRow = [];
        for (let col = 0; col < this.gridSize.y; col++) {
          currentRow.push(this.createNode(col, row));
        }
        grid.push(currentRow);
      }
      return grid;
    },

    findPath: function () {
      let astar = new AStar(this.state.grid, this.gridSize);
      const result = astar.a_star(
        { x: this.START_NODE_ROW, y: this.START_NODE_COL, isWalkable: true },
        { x: this.FINISH_NODE_ROW, y: this.FINISH_NODE_COL, isWalkable: true }
      );
      
      this.animatePathFindingAlgorithm(result.animation)
    },

    createNode: function (col, row) {
      return new NodeAStar(row, col, true);
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

    getNewGridWithWallToggled: function (grid, row, col) {
      grid[row][col] = {
        ...grid[row][col],
        isWalkable: !grid[row][col].isWalkable,
      };

      return grid;
    },

    animatePathFindingAlgorithm: function(animation) {
      for(let i = 0; i < animation.length; i++) {
        setTimeout(() => {
          const node = animation[i]

          if(node.x !== this.START_NODE_ROW || node.y !== this.START_NODE_COL){
            if(node.isDiscovered && node.isVisited && node.isPath){
              console.log(node)
              document.getElementById(`node-${node.x}-${node.y}`).className = 'node node-shortest-path';
            }
            else if(node.isDiscovered && node.isVisited && !node.isPath)
              document.getElementById(`node-${node.x}-${node.y}`).className = 'node node-visited';
            else
              document.getElementById(`node-${node.x}-${node.y}`).className = 'node node-discovered';
          }
        }, 50 * i)
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
  top: 85px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  border-top: 1px solid rgb(175, 216, 248);
}

.grid div.row {
  width: 100%;
  display: flex;
}

div.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85px;
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

div.navbar-items.order-1 {
  order: 1
}

div.navbar-items.order-2 {
  order: 2
}

div.navbar-items.order-3 {
  order: 3
}

div.navbar-items.order-4 {
  order: 4
}

.navbar > .navbar-items > .navbar-title {
  color: rgb(175, 216, 248);

}
</style>