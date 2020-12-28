<template>
    <div @click="setPiece" :class="['root', {'selectable':selectable}]">
        {{piece}}
    </div>
</template>

<script>
export default {
    name: 'Tile',
    props: ['i', 'j', 'piece', 'selectable', 'winner'],
    methods: {
        setPiece() {
            if (this.selectable) {
                this.$parent.$emit('set-piece', this.i, this.j);
            }
        }
    }
}
</script>

<style>
    .root {
        height: 50px;
        width: 50px;
        font-size: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
    }

    .selectable {
        cursor: pointer;
        font-size: 0;
    }

    .selectable:hover {
        background-color: rgba(50, 168, 82, 0.5);
        font-size: 25px;
    }

    .playerWin {
        background-color: rgba(50, 168, 82, 0.5);
    }

    .computerWin {
        background-color: rgba(193, 66, 66, 0.5);
    }

</style>