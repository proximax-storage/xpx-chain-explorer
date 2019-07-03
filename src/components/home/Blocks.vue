<template>

  <!-- Blocks Component -->
  <div class="block animated fast fadeIn">

    <!-- MDB Loader -->
    <mdb-progress v-if="dataTable.length === 0 && loaderStatus" bgColor="cyan darken-3" style="width: 100%" indeterminate/>
    <!-- End MDB Loader -->

    <!-- NEW DESIGN OF BLOCKS COMPONENT (Mobile Compatible)-->
    <div class="mobile">

      <!-- Iterated Element of Block -->
      <div class="element" v-for="(item, index) in dataTable" :key="index" :style="(index % 2 === 0) ? 'background: #DDDDDD' : 'background: #F4F4F4'">

        <div>
          <span>Height</span>
          <router-link class="link-data" :to="{ path: '/searchResult/' + 'blockHeight/' + item.height }" target="_blank">{{ item.height }}</router-link>
        </div>

        <div>
          <span>Validator</span>
          <router-link class="link-data" :to="{ path: '/searchResult/' + 'publicKey/' + item.signer.publicKey }" target="_blank" style="word-break: break-all">{{ item.signer.publicKey }}</router-link>
        </div>

        <div>
          <span>Fee</span>
          <span v-html="item.totalFee" class="value"></span>
        </div>

        <div>
          <span>TXES</span>
          <span class="value">{{ item.numTransactions }}</span>
        </div>

        <div>
          <span>Timestamp</span>
          <span class="value">{{ item.date }}</span>
        </div>

      </div>
      <!-- End Of Iterated Element of Block -->

    </div>
    <!-- END NEW DESIGN OF BLOCKS COMPONENT -->

    <div style="display: none">
      {{ updateTable }}
    </div>
  </div>
  <!-- End Blocks Component -->

</template>

<script>
import { mdbProgress } from 'mdbvue'
import { Deadline } from 'tsjs-xpx-catapult-sdk'

export default {
  name: 'Blocks',
  components: {
    mdbProgress
  },
  data () {
    return {
      currentBlock: this.$store.state.currentBlock,
      dataTable: [],
      pag: 1,
      limit: 10
    }
  },
  mounted () {
    // console.log(this.dataTable)
    this.viewAllBlocks()
    //console.log('Este es el current block', this.currentBlock)
  },
  methods: {
    /**
     * View All Blocks
     *
     * Method to see recently closed blocks
     */
    viewAllBlocks () {
      this.$proxProvider.blockchainHttp.getBlockchainHeight().subscribe(
        next => {
          this.$proxProvider.blockchainHttp.getBlocksByHeightWithLimit(next.compact(), 100).subscribe(
            blockInfo => {
              blockInfo.forEach(element => {
                element.totalFee = this.$utils.fmtAmountValue(element.totalFee.compact())
                element.date = this.$utils.fmtTime(new Date(element.timestamp.compact() + (Deadline.timestampNemesisBlock * 1000)))
                element.height = element.height.compact()
                this.dataTable.push(element)
              })
            },
            error => {
              this.$store.dispatch('updateErrorInfo', {
                active: true,
                message: 'Comunication error whit node!',
                submessage: 'Check the internet connection and reload the page'
              })
              this.$store.dispatch('changeLoader', false)
            }
          )
        },
        error => {
          this.$store.dispatch('updateErrorInfo', {
            active: true,
            message: 'Comunication error whit node!',
            submessage: 'Check the internet connection and reload the page'
          })
          this.$store.dispatch('changeLoader', false)
        }
      )
    },
    /**
     * Method to change page
     * @param {number} page indicates the current page
     */
    changePage (page) {
      this.pag = page
    }
  },
  computed: {
    /**
     * Update Table
     *
     * This is not a method but a computed property that updates the last block and represents it in the table
     * This method should be called as a property and not as a method
     */
    updateTable () {
      let height = this.$store.getters.getCurrentBlock
      let block = this.$store.state.currentBlock
      // console.log(height, block)
      if (height !== 'Loading') {
        // console.log(this.dataTable[0])
        if (this.dataTable[0] !== undefined) {
          if (this.dataTable[0].height !== height) {
            this.dataTable.unshift(block)
          }
        }
      }
      return this.$store.getters.getCurrentBlock
    },
    loaderStatus () {
      return this.$store.getters.getLoaderState
    }
  }
}
</script>

<style lang="sass">
.mobile
  display: flex
  flex-flow: column
  width: 100%
  padding: 15px
  margin: 2px 0px
  & > .element
    margin-top: 5px
    display: flex
    flex-flow: row nowrap
    justify-content: space-around
    border: 1px solid #dddddde4
    // margin: 2px 0px
    padding: 3px
    color: black
    border-radius: 5px
    & > div
      display: flex
      flex-flow: column
      align-items: center
      padding: 3px
      & > span:first-child
        font-size: 10px
        text-transform: uppercase
        font-weight: bold
        color: grey
      & > span:last-child
        text-align: center
        font-size: 14px
        text-transform: uppercase
        font-weight: bold
        color: #404040
      & > a
        word-wrap: break-word

td
  text-align: center
  padding: 10px
  color: black
  font-size: 15px

.grey-back
  background: silver

.link-data
  font-size: 14px
  font-weight: bold
  color: black
  &:hover
    color: #2d8e9b
    text-decoration-line: underline

.block
  width: 100%
  display: flex
  flex-flow: column wrap
  align-items: center
  &::-webkit-scrollbar
    background: transparent
  &::-webkit-scrollbar-thumb
    background: dodgerblue
    height: 10px
  & > table
    width: 100%
    background: transparent
    padding: 10px
    margin: 20px 0px 0px 0px
    & > tr.header-row
      width: 100%
      background: transparent !important
      & > th
        text-align: center
        text-transform: uppercase
        font-weight: bold
        padding: 5px
      & > td
        width: 100%
    & > .pagination
      width: 100%
      text-align: center

@media screen and (max-width: 900px)
  .link-data
    font-size: 10px
    font-weight: bold
    color: #2d8e9b
    text-decoration: underline
    word-wrap: break-word

  .mobile > .element
    flex-flow: column nowrap
    // box-shadow: 0px 3px 3px grey
    margin: 5px 0px 5px 0px
    &:nth-child(2n)
      border: 1px solid silver
    & > div
      display: flex
      flex-flow: column wrap
      align-items: center
      padding: 3px
      border-bottom: 1px solid #c0c0c040
      &:last-child
        border-bottom: 0px solid silver
      &:nth-child(2n)
        // background: #c5c5c5
        // border-bottom: 1px solid silver
      & > span:first-child
        font-size: 10px
        text-transform: uppercase
        font-weight: bold
        color: grey
      & > span:last-child
        text-align: center
        font-size: 10px
        text-transform: uppercase
        font-weight: bold
        color: black
  td
    padding: 3px 5px

  .block
    display: flex
    flex-flow: column wrap
    align-items: center
    overflow-x: auto
    & > table
      min-width: 700px
</style>
