<template>
  <Board
    v-on:set-piece="playerMove"
    :pieces="pieces"
    :winningPieces="winningPieces"
    :playerPiece="playerPiece"
    :isPlayerTurn="isPlayerTurn"
  />
</template>

<script>
import Board from './components/Board.vue';
import { determineComputerMove, hasWinner, boardIsFull } from './functions/utils';

export default {
  name: 'App',
  components: {
    Board
  },
  data() {
    return {
      isGameStarted: false,
      isGameOver: false,
      isPlayerTurn: true,
      pieces: [['X', 'O', ''], ['', '', ''], ['', '', '']],
      playerPiece: 'X',
      computerPiece: 'O',
      winner: '',
      winningPieces: [],
      roundCounter: 0,
      winCounter: 0,
    }
  },
  methods: {
    playerMove(i, j) {
      this.pieces[i][j] = this.playerPiece;
      const winningPieces = hasWinner(this.pieces);

      if (winningPieces.length > 0) {
        this.roundOver('player', winningPieces);
        return;
      }

      if (boardIsFull(this.pieces)) {
        this.roundOver('');
        return;
      }

      this.computerMove();
    },
    computerMove() {
      this.isPlayerTurn = false;
      this.pieces = determineComputerMove(this.pieces, this.playerPiece, this.computerPiece);
      const winningPieces = hasWinner(this.pieces);
      
      if (winningPieces.length > 0) {
        this.roundOver('computer', winningPieces);
        return;
      }

      if (boardIsFull(this.pieces)) {
        this.roundOver('');
        return;
      }

      this.isPlayerTurn = true;
    },
    roundOver(winner, winningPieces) {
      console.log('round over');
      this.isPlayerTurn = false;
      this.playerPiece = this.playerPiece === 'X' ? 'O' : 'X';
      this.computerPiece = this.computerPiece === 'X' ? 'O' : 'X';
      this.winner = winner;
      this.winningPieces = winningPieces ? winningPieces : [];
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
