<template>
    <div class="gameover-root">
        <div v-if="winner === 'player'">
            You won 10 games in {{time}}!
        </div>
        <div v-if="winner === 'computer'">
            You lose.
        </div>
        <button @click="$emit('reset-game')" class="gameover-button">
            Play again
        </button>
    </div>
</template>

<script>
export default {
    name: 'GameOver',
    props: ['winner', 'time'],
    emits: ['reset-game'],
}
</script>

<style scoped>
  .gameover-root {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 2em;
  }

  .gameover-button {
      margin-top: 10px;
  }
</style>