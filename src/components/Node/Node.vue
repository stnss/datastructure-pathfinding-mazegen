<template>
  <div
    :id="`node-${row}-${col}`"
    :className="`node ${extraClassName}`"
  ></div>
</template>

<script>
export default {
  props: {
    row: Number,
    col: Number,
    isFinish: Boolean,
    isStart: Boolean,
    isWall: Boolean,
    isPath: Boolean,
    isVisited: Boolean,
  },

  data() {
    return {
      extraClassName: this.isFinish
        ? "node-finish"
        : this.isStart
        ? "node-start"
        : this.isWall
        ? "node-wall"
        : this.isPath
        ? "node-shortest-path"
        : this.isVisited
        ? "node-visited"
        : "",
    }
  },
};
</script>

<style scoped>
.node {
  padding: 5px;
  outline: 1px solid rgb(175, 216, 248);
}

.node-finish {
  background-color: red;
}

.node-start {
  background-color: green;
}

.node-visited {
  animation-name: visitedAnimation;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

@keyframes visitedAnimation {
  0% {
    transform: scale(0.3);
    background-color: rgba(0, 0, 66, 0.75);
    border-radius: 100%;
  }

  50% {
    background-color: rgba(17, 104, 217, 0.75);
  }

  75% {
    transform: scale(1.2);
    background-color: rgba(0, 217, 159, 0.75);
  }

  100% {
    transform: scale(1);
    background-color: rgba(0, 190, 218, 0.75);
  }
}

/* .node-wall {
  animation-name: walledNode;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

@keyframes walledNode {
  0% {
    transform: scale(0.3);
    background-color: rgba(160, 0, 80, 0.75);
    border-radius: 100%;
  }

  50% {
    background-color: rgba(121, 1, 61, 0.75);
  }

  75% {
    transform: scale(1.2);
    background-color: rgba(41, 0, 21, 0.75);
  }

  100% {
    transform: scale(1);
  background-color: rgb(12, 53, 71);
  }
} */

.node-discovered {
  animation-name: discoveredAnimation;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

@keyframes discoveredAnimation {
  0% {
    transform: scale(0.3);
    background-color: rgba(66, 0, 0, 0.75);
    border-radius: 100%;
  }

  50% {
    background-color: rgba(202, 24, 193, 0.75);
  }

  75% {
    transform: scale(1.2);
    background-color:  rgba(208, 6, 235, 0.75)
  }

  100% {
    transform: scale(1);
    background-color: rgba(174, 0, 255, 0.75)
  }
}

.node-wall {
  background-color: rgb(12, 53, 71);
}

.node-shortest-path {
  animation-name: shortestPath;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

@keyframes shortestPath {
  0% {
    transform: scale(0.3);
    background-color: rgba(66, 56, 0, 0.75);
    border-radius: 100%;
  }

  50% {
    background-color: rgba(191, 204, 4, 0.671);
  }

  75% {
    transform: scale(1.2);
    background-color: rgba(213, 217, 0, 0.75);
  }

  100% {
    transform: scale(1);
    background-color: rgb(255, 251, 4);
  }
}
</style>