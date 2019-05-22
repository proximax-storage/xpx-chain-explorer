<template>
  <div class="paginator">
    <figure class="hover-effect" v-if="pag > 2">
      <div class="fa fa-angle-double-left" @click="changePage(1)"></div>
    </figure>
    <figure class="hover-effect" v-if="pag > 1">
      <div class="fa fa-angle-left" @click="changePage(pag - 1)"></div>
    </figure>
    <div class="buttons">
      <div v-for="page of numberPag" :key="page" :class="(page === pag) ? 'select-effect' : 'hover-effect'" @click="changePage(page)" v-show="page <= pag + 2 && page >= pag - 2">{{page}}</div>
    </div>
    <figure class="hover-effect" v-if="pag < numberPag">
      <div class="fa fa-angle-right" @click="changePage(pag + 1)"></div>
    </figure>
    <figure class="hover-effect" v-if="pag < numberPag - 1">
      <div class="fa fa-angle-double-right" @click="changePage(numberPag)"></div>
    </figure>
  </div>
</template>

<script>
import { mdbIcon } from 'mdbvue'

export default {
  name: 'Paginator',
  components: {
    mdbIcon
  },
  props: {
    limit: {
      type: Number,
      default: 10
    },
    arrayLength: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      testArr: [],
      pag: 1,
      numberPag: Math.ceil(this.arrayLength/this.limit)
    }
  },
  watch: {
    arrayLength: function (val) {
      this.numberPag = Math.ceil(val/this.limit)
    }
  },
  methods: {
    /**
     * Method to change page
     * @param {number} page indicates the current page
     */
    changePage(page) {
      this.pag = page
      this.$emit('changePage', page)
    }
  }
}
</script>

<style lang="sass" scoped>
.hover-effect
  background: transparent
  &:hover
    background: #00000070

.select-effect
  background: #00000070

.paginator
  background: transparent
  border: 1px solid #7ab5e2
  padding: 20px 50px
  margin: 10px 0px
  display: flex
  align-items: center
  border-radius: 5px
  & > figure
    margin: 0px
    display: flex
    justify-content: center
    align-items: center
    padding: 10px
    border-radius: 50%
  & > .buttons
    display: flex
    flex-flow: row nowrap
    align-items: center
    & > div
      width: 30px
      height: 30px
      display: flex
      justify-content: center
      align-items: center
      border-radius: 50%
      font-weight: bold
</style>
