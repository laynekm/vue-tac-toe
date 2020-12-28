<template>
  <div v-if="!isGameOver" class="app-root">
    <div class="row">
      <Board
        :pieces="pieces"
        :winningPieces="winningPieces"
        :playerPiece="playerPiece"
        :isPlayerTurn="isPlayerTurn"
        :winner="winner"
        v-on:set-piece="playerMove"
      />
      <div class="column">
        <div id="timer" class="timer">0:00</div>
        <Stat label="Rounds" :value="roundCounter" />
        <Stat label="Wins" :value="winCounter" />
        <Stat label="Losses" :value="loseCounter" />
      </div>
    </div>
    <span>
      Win 10 rounds of tic-tac-toe as fast as you can. If you lose 10 rounds, game over!
    </span>
  </div>
  <div v-if="isGameOver" class="app-root">
    <GameOver
      :winner="winner"
      :time="time"
      v-on:reset-game="resetGame"
    />
  </div>
</template>

<script>
import Board from './components/Board.vue';
import Stat from './components/Stat.vue';
import GameOver from './components/GameOver.vue';
import { formatTime, determineComputerMove, hasWinner, boardIsFull } from './functions/utils';

const delay = 1000;
const rounds = 10;

export default {
  name: 'App',
  components: {
    Board,
    Stat,
    GameOver,
  },
  data() {
    return this.initState();
  },
  methods: {
    initState() {
      return {
        isGameStarted: false,
        isGameOver: false,
        isPlayerTurn: true,
        pieces: [['', '', ''], ['', '', ''], ['', '', '']],
        playerPiece: 'X',
        computerPiece: 'O',
        winner: '',
        winningPieces: [],
        roundCounter: 0,
        winCounter: 0,
        loseCounter: 0,
        time: '',
      }
    },
    startTimer() {
      let time = 0;
      const display = document.querySelector('#timer');
      setInterval(() => {
        display.textContent = formatTime(time);
        time++;
      }, 10);
    },
    playerMove(i, j) {
      if (!this.isGameStarted) {
        this.isGameStarted = true;
        this.startTimer();
      }

      this.pieces[i][j] = this.playerPiece;
      const winningPieces = hasWinner(this.pieces);

      if (winningPieces.length > 0) {
        this.roundOver('player', winningPieces);
      } else if (boardIsFull(this.pieces)) {
        this.roundOver('', []);
      } else {
        this.computerMove();
      }
    },
    computerMove() {
      this.isPlayerTurn = false;
      this.pieces = determineComputerMove(this.pieces, this.playerPiece, this.computerPiece);
      const winningPieces = hasWinner(this.pieces);

      if (winningPieces.length > 0) {
        this.roundOver('computer', winningPieces);
      } else if (boardIsFull(this.pieces)) {
        this.roundOver('', []);
      } else {
        this.isPlayerTurn = true;
      }
    },
    roundOver(winner, winningPieces) {
      this.isPlayerTurn = false;
      this.winner = winner;
      this.winningPieces = winningPieces;

      setTimeout(() => {
        this.resetRound();
      }, delay);
    },
    resetRound() {
      this.roundCounter++;
      if (this.winner === 'player') this.winCounter++;
      if (this.winner === 'computer') this.loseCounter++;

      if (this.winCounter >= rounds || this.loseCounter >= rounds) { 
        this.isGameOver = true;
        this.time = document.querySelector('#timer').textContent;
        return;
      }

      this.pieces = [['', '', ''], ['', '', ''], ['', '', '']];
      this.playerPiece = this.playerPiece === 'X' ? 'O' : 'X';
      this.computerPiece = this.computerPiece === 'X' ? 'O' : 'X';
      this.isPlayerTurn = this.playerPiece === 'X';
      this.winner = '';
      this.winningPieces = [];

      if (!this.isPlayerTurn) this.computerMove();
    },
    resetGame() {
      Object.assign(this.$data, this.initState());
      document.querySelector('#timer').textContent = '0:00';
    },
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>

<style scoped>
  .app-root {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 2em;
  }

  .column {
    display: flex;
    flex-direction: column;
    width: 6em;
    margin-left: 16px;
  }

  .timer {
    font-size: 25px;
  }
</style>
