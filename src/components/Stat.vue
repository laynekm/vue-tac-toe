<template>
    <div class="root">
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
  .root {
    width: 5em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>