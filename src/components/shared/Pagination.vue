<template>
  <mdb-pagination circle class="justify-content-end">
    <!-- button of first pagination -->
    <a class="page-link" :class="{'disabled':(pag == 1)}" @click.prevent="changePage(1)">First</a>
      <!-- button of prev pagination -->
      <a href="#" class="page-link" @click.prevent="changePage(--pag)" :class="{'disabled':(pag == 1)}"><span>«</span></a>
        <!-- buttons of pages -->
        <span v-if="showPrev">...</span>
        <a href="#" class="page-link" v-for="page in numberPag" :key="page" v-show="page === pag || page === prevPag || page === nextPag" :class="{'active':(page === pag)}" @click.prevent="changePage(page)">{{page}}</a>
        <span v-if="showNext">...</span>
      <!-- button of next pagination -->
      <a href="#" class="page-link" @click.prevent="changePage(++pag)" :class="{'disabled':(pag == numberPag)}"><span>»</span></a>
    <!-- button of last pagination -->
    <a class="page-link" :class="{'disabled':(pag == numberPag)}" @click.prevent="changePage(numberPag)">Last</a>
  </mdb-pagination>
</template>

<script>
import { mdbPageItem, mdbPagination } from 'mdbvue'
export default {
  name: 'Pagination',
  components: {
    mdbPagination,
    mdbPageItem
  },
  props: {
    quantity: Number,
    numResults: Number
  },
  data () {
    let number = Math.round(this.quantity/this.numResults)
    return {
      showPrev: false,
      showNext: false,
      pag: 1,
      prevPag: 0,
      nextPag: 2,
      numberPag: number
    }
  },
  watch: {
    quantity: function (val) {
      console.log("Valor paginado",val);
      this.numberPag = Math.round(val/this.numResults)
      console.log("Valor de Cantiad de Paginas", this.numberPag);
    }
  },
  methods: {
    changePage: function (page) {         
      this.pag = page
      this.prevPag = this.pag - 1
      this.nextPag = this.pag + 1
      this.showPrev = (this.pag === 1 || this.pag === 2) ? false : true
      this.showNext = (this.pag === Math.round(this.quantity/this.numResults)) ? false : true
      this.$emit('changePage', this.pag)
    }
  }
}
</script>

<style scoped>
  .active {
    border-radius: 50% !important;
    background: #18ada3;
    color: white !important;
  }
</style>


