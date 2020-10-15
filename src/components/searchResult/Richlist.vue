<template>
  <div class="richList">
    <h1 class="supertitle">{{ nameLabel }}</h1>

    <div class="guide" style="background: black">
      <div>
        <div class="title">Address</div>
      </div>

      <div>
        <div class="title">Amount</div>
      </div>

      <div>
        <div class="title">Percentage</div>
      </div>
    </div>

    <div class="list" v-show="arrayTransactions.length > 0">
      <div class="element animated fadeIn" v-for="(item, index) in arrayTransactions" :key="index">
        <div>
          <div class="title">Address</div>
          <div class="value link" @click="goToAddress(item.address.pretty())">{{ item.address.pretty() }}</div>
        </div>

        <div>
          <div class="title">Amount</div>
          <div class="value"><span v-html="$utils.fmtAmountValue(item.amount.compact())"></span> XPX</div>
        </div>

        <div>
          <div class="title">Percentage</div>
          <div class="value">{{ calculatePercentage(item.amount.compact()) }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mdbIcon } from 'mdbvue'

export default {
  name: 'Richlist',
  components: {
    mdbIcon
  },
  props: {
    limit: {
      required: false,
      type: Number,
      default: 1000
    },
    arrayTransactions: Array,
    mosaicData: Object,
    nameLabel: {
      type: String,
      default: 'Mosaic Rich List'
    }
  },
  methods: {
    goToAddress (address) {
      let routeData = this.$router.resolve({ path: `/result/address/${address}` })
      window.open(routeData.href, '_blank')
    },
    calculatePercentage (amount) {
      let percent = parseFloat((amount / this.mosaicData.supply.compact()) * 100)
      return percent.toFixed(this.mosaicData.divisibility)
    },
  }
}
</script>

<style lang="sass" scoped>
.richList
  padding: 10px

.guide
  display: block
  margin: 0px 0px 5px 0px
  border-radius: 5px
  display: flex
  flex-flow: row
  padding: 10px 5px
  & > div
    flex-grow: 1
    text-align: center
    color: white !important
    & > .title
      display: block
      color: white
  & > div:first-child
    width: 200px
  & > div:nth-child(2n)
    width: 150px
  & > div:nth-child(3n)
    width: 360px
  & > div:last-child
    width: 100px

.supertitle
  display: flex
  flex-flow: row nowrap
  justify-content: center
  margin: 0px
  font-size: 17px
  color: #2BA1B9
  padding: 0px 0px 5px 0px

.list
  background: transparent

.element
  display: flex
  flex-flow: row
  padding: 10px 5px
  margin: 0px 0px 5px 0px
  border-radius: 5px
  border: 1px solid #f4f4f4
  &:nth-child(odd)
    background: #f4f4f4
  &:nth-child(even)
    background: white
  & > div
    flex-grow: 1
    text-align: center
  & > div:first-child
    width: 200px
  & > div:nth-child(2n)
    width: 150px
  & > div:nth-child(3n)
    width: 360px
  & > div:last-child
    width: 100px

.title
  display: none
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  color: grey

.value
  font-size: 14px
  font-weight: bold
  text-transform: uppercase
  word-break: break-all
  color: black

.link:hover
  color: #2BA1B9
  text-decoration: underline
  cursor: pointer

@media screen and (max-width: 700px)
  .guide
    display: none

  .element
    flex-flow: column
    border-radius: 20px
    & > div
      width: 100% !important
      padding: 5px
      border-bottom: 1px solid silver
    & > div:last-child
      border-bottom: 0px solid silver

  .title
    display: block

  .link
    color: #2BA1B9
    text-decoration: underline
    cursor: pointer
</style>
