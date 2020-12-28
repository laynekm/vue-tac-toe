<template>
    <div>
        <div v-for="(row, i) in pieces" :key="`row-${i}`" class="row">
            <div v-for="(piece, j) in row" :key="`row-${i}-piece-${j}`">
                <Tile
                    :i="i"
                    :j="j"
                    :piece="getPiece(i, j, piece)"
                    :selectable="isSelectable(i, j)"
                    :playerWin="isWinner(i, j, 'player')"
                    :computerWin="isWinner(i, j, 'computer')"
                />
            </div>
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
    props: ['pieces', 'winningPieces', 'playerPiece', 'isPlayerTurn', 'winner'],
    emits: ['set-piece'],
    methods: {
        getPiece(i, j, piece) {
            if (piece) return piece;
            if (this.isPlayerTurn) return this.playerPiece;
            return '';
        },
        isSelectable(i, j) {
            return this.isPlayerTurn && !this.pieces[i][j];
        },
        isWinner(i, j, participant) {
            if (!this.winner || this.winner != participant || this.winningPieces.length === 0) return false;

            for (let k = 0; k < this.winningPieces.length; k++) {
                if (this.winningPieces[k][0] === i && this.winningPieces[k][1] === j) return true;
            }

            return false;
        },
    }
}
</script>

<style scoped>
    .row {
        display: flex;
        flex-direction: row;
    }
</style>