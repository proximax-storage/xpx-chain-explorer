<template>
  <!-- Paginator Component -->
  <div class="paginator">

    <!-- Double Angle Button - Full Back -->
    <figure class="hover-effect" v-if="pag > 2">
      <div class="" @click="changePage(1)">First</div>
    </figure>
    <!-- End Double Angle Button - Full Back -->

    <!-- Angle Button - One Step Back -->
    <figure class="hover-effect" v-if="pag > 1">
      <div class="fa fa-angle-left" @click="changePage(pag - 1)"></div>
    </figure>
    <!-- End Angle Button - One Step Back -->

    <!-- Iterated Elements - Relative to the length of what you want to display -->
    <div class="buttons">
      <div v-for="page of numberPag" :key="page" :class="(page === pag) ? 'select-effect' : 'hover-effect'" @click="changePage(page)" v-show="page <= pag + 1 && page >= pag - 1">{{page}}</div>
    </div>
    <!-- End Iterated Elements -->

    <!-- Angle Button - One Step Forward -->
    <figure class="hover-effect" v-if="pag < numberPag">
      <div class="fa fa-angle-right" @click="changePage(pag + 1)"></div>
    </figure>
    <!-- End Angle Button - One Step Forward -->

    <!-- Double Angle Button - Full Forward -->
    <figure class="hover-effect" v-if="pag < numberPag - 1">
      <div class="" @click="changePage(numberPag)">Last</div>
    </figure>
    <!-- End Double Angle Button - Full Forward -->

  </div>
  <!-- End Paginator Component -->
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
    /**
     * Array Length
     *
     * See the changes in the length of Array Length
     * This method should not be called is a property and is observable
     * @param { Number } val
     */
    arrayLength: function (val) {
      this.numberPag = Math.ceil(val/this.limit)
    }
  },
  methods: {
    /**
     * Method to change page
     * @param { Number } page indicates the current page
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
