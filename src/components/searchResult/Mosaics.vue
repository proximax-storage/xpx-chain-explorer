<template>
  <!-- Mosaic Component -->
  <div class="recent animated fast fadeIn">
    <!-- <h1 class="supertitle">{{ nameLabel }}</h1> -->
    <!-- Iterated Elements (Mosaics) -->
    <div class="guide animated fast fadeIn" v-show="arrayTransactions.length > 0">

      <div>
        <div class="title">Owner</div>
      </div>

      <div>
        <div class="title">Mosaic Id</div>
      </div>

      <div c>
        <div class="title">{{ importantLabel }}</div>
      </div>

      <div >
        <div class="title">Quantity</div>
      </div>

    </div>

    <div class="element animated fast fadeIn" v-for="(item, index) in arrayTransactions" :key="index" v-show="arrayTransactions.length > 0">

      <div>
        <div class="title">Owner</div>
        <div class="value" :style="(item.owner === 'true') ? 'color: green; font-weight: bold' : 'color: red; font-weight: bold'">{{ item.owner }}</div>
      </div>

      <div>
        <div class="title">Mosaic Id</div>
        <div class="value link" @click="goToMosaic(item.id)">{{ item.id }}</div>
      </div>

      <div>
        <div class="title">Mosaic Name</div>
        <div class="valueLower">{{ item.name || 'undefined' }}</div>
      </div>

      <div>
        <div class="title">Quantity</div>
        <div class="value" v-html="item.quantity"></div>
      </div>

    </div>
    <!-- End Iterated Elements -->

  </div>
  <!-- End Mosaic Component -->
</template>

<script>
import proximaxProvider from '@/services/proximaxProviders.js'
import { mdbProgress } from 'mdbvue'
import { Id } from 'tsjs-xpx-catapult-sdk'

export default {
  name: 'RecentTrans',
  props: {
    limit: {
      required: false,
      type: Number,
      default: 50
    },
    arrayTransactions: Array,
    nameLabel: {
      type: String,
      default: 'Recent Transaction'
    }
  },
  data () {
    return {
      arrayData: [],
      arrayAmount: [],
      importantLabel: 'Mosaic Name'
    }
  },
  /**
   * Mounted
   *
   * Call constructorObj method
   */
  mounted () {
    console.log("Array transaction mosaic", this.arrayTransactions)
    this.analyzeElements()
  },
  methods: {

    analyzeElements () {
      let items = this.arrayTransactions.map(el => el.name === undefined)
      if (items[0] === false) {
        this.importantLabel = 'Mosaic Alias Name'
      }
    },

    goToMosaic (mosaicId) {
      let routeData = this.$router.resolve({ path: `/searchResult/mosaicInfo/${mosaicId}` })
      window.open(routeData.href, '_blank')
    }
  },
  computed: {
    /**
     * Final Array
     *
     * Observe the changes in the variable array data
     */
    finalArray () {
      // console.log(this.arrayData)
      return this.arrayData
    }
  }
}
</script>

<style lang="sass" scoped>
$radius: 5px

.link:hover
  color: #2BA1B9
  text-decoration: underline
  cursor: pointer

.mosaicNameTrans
  opacity: 0

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  color: grey
  margin: 0px
  display: none

.value
  font-size: 14px
  font-weight: normal
  text-transform: uppercase
  word-break: break-all

.valueLower
  font-size: 14px
  font-weight: normal
  word-break: break-all

.balance
  color: black
  margin: 0px
  font-weight: bold
  font-size: 30px

.supertitle
  display: flex
  flex-flow: row nowrap
  justify-content: center
  color: #2BA1B9
  margin: 0px
  font-size: 17px
  padding: 0px 0px 5px 0px

.alternate
  display: none

.up
  background: #DDDDDD
  border-radius: $radius $radius 0px 0px
  padding: 10px

.down
  background: #F4F4F4
  border-radius: 0px 0px $radius $radius
  padding: 10px

.guide
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    aling-items: center
    border-radius: $radius
    background: #1a1a1a
    margin: 5px 0px
    padding: 10px
    cursor: pointer
    & > div
      width: 200px
      flex-grow: 1
      text-align: center
      & > .title
        display: block
        color: white !important

.recent
  // margin: 0px 10px 10px 10px
  padding: 10px
  color: black
  & > .element
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    aling-items: center
    border-radius: $radius
    background: #f4f4f4
    margin: 5px 0px
    padding: 10px
    cursor: pointer
    & > div
      width: 200px
      flex-grow: 1
      text-align: center
    // & > .el-left
    //   flex-grow: 1
    //   display: flex
    //   flex-flow: column nowrap
    //   align-items: center
    //   border-radius: $radius 0px 0px $radius
    //   & > div
    //     display: flex
    //     flex-flow: row nowrap
    //     align-items: center
    //     & > figure
    //       margin: 0px
    //       padding: 5px
    //     & > span
    //       font-size: 15px
    // & > .el-middle
    //   flex-grow: 1
    //   display: flex
    //   flex-flow: column wrap
    //   align-items: center
    //   justify-content: center
    // & > .el-right
    //   flex-grow: 1
    //   display: flex
    //   flex-flow: column wrap
    //   align-items: center
    //   justify-content: center
    //   border-radius: 0px $radius $radius 0px

@media screen and (max-width: 570px)
  .guide
    display: none

  .title
    display: block

  .alternate
    display: block

  .mosaicNameTrans
    opacity: 1

  .recent > .element
    flex-flow: column
    & > div
      width: 100%
      padding: 2px
      border-bottom: 1px solid #ddd
      &:last-child
        border-bottom: 0px solid white
</style>
