<template>
    <div class="stat-root">
    <span>{{label}}</span>
    <span>{{value}}</span>
    </div>
</template>

<script>
export default {
    name: 'Tile',
    props: ['label', 'value'],
}
</script>

<style scoped>
  .stat-root {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>