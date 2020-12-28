<template>
    <div v-for="(row, i) in pieces" :key="`row-${i}`" class="row">
        <div v-for="(piece, j) in row" :key="`row-${i}-piece-${j}`">
            <Tile
                :i="i"
                :j="j"
                :piece="piece ? piece : playerPiece"
                :selectable="isSelectable(i, j)"
            />
        </div>
    </div>
</template>

<script>
import Tile from './Tile.vue';

export default {
    name: 'Board',
    components: {
        Tile,
    },
    props: ['pieces', 'winningPieces', 'playerPiece', 'isPlayerTurn'],
    methods: {
        isSelectable(i, j) {
            return this.isPlayerTurn && !this.pieces[i][j];
        }
    }
}
</script>

<style>
    .row {
        display: flex;
        flex-direction: row;
    }
</style>