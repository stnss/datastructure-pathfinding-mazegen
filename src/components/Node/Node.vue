<template>
  <div
    :id="`node-${row}-${col}`"
    :className="`node ${className}`"
  ></div>
</template>

<script>
export default {
  props: {
    row: Number,
    col: Number,
    isWalkable: Boolean,
    isWall: Boolean
  },
  data() {
    return {
      className: this.isWall ? "node-wall" : ""
    }
  }
};
</script>

<style scoped>
.node {
  padding: 5px;
  outline: 1px solid rgb(161, 189, 211);
}
</style>