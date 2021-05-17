<template>
  <div
    :id="`node-${row}-${col}`"
    :className="`node`"
  ></div>
</template>

<script>
export default {
  props: {
    row: Number,
    col: Number,
    isWall: Boolean
  },
};
</script>

<style scoped>
.node {
  padding: 5px;
  outline: 1px solid rgb(161, 189, 211);
}
</style>