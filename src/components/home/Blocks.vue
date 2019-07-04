<template>

  <!-- Blocks Component -->
  <div class="block animated fast fadeIn">

    <!-- MDB Loader -->
    <mdb-progress v-if="loaderStatus" bgColor="cyan darken-3" style="width: 100%" indeterminate/>
    <!-- End MDB Loader -->

    <!-- NEW DESIGN OF BLOCKS COMPONENT (Mobile Compatible)-->
    <div class="mobile">

      <!-- Iterated Element of Block -->
      <div class="element animated faster fadeInDown" v-for="(item, index) in dataTable" :key="index" :style="(index % 2 === 0) ? 'background: #DDDDDD' : 'background: #F4F4F4'">

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
          <span>TXS</span>
          <span class="value">{{ item.numTransactions }}</span>
        </div>

        <div>
          <span>Timestamp</span>
          <span class="value">{{ item.date }}</span>
        </div>

      </div>
      <!-- End Of Iterated Element of Block -->

      <div class="special-bottom animated faster fadeInDown" v-if="dataTable.length !== 0" @click="loadMore">

        <div v-if="buttonLoadMoreActive">
          <span>Load more blocks</span>
          <span class="value" v-if="!buttonLoaderActive">Click</span>
          <span class="value" v-else><mdb-spinner small color="yellow"/></span>
        </div>

      </div>
    </div>
    <!-- END NEW DESIGN OF BLOCKS COMPONENT -->

    <div style="display: none">
      {{ updateTable }}
    </div>

    <div class="topButton" @click="goTop">
      <mdb-icon icon="angle-up" />
    </div>
  </div>
  <!-- End Blocks Component -->

</template>

<script>
import { mdbProgress, mdbSpinner, mdbIcon } from 'mdbvue'
import { Deadline } from 'tsjs-xpx-catapult-sdk'

export default {
  name: 'Blocks',
  components: {
    mdbProgress,
    mdbSpinner,
    mdbIcon
  },
  data () {
    return {
      currentBlock: this.$store.state.currentBlock,
      dataTable: [],
      loaderStatus: true,
      buttonLoadMoreActive: true,
      buttonLoaderActive: false
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
              // console.log(blockInfo)
              blockInfo.forEach(element => {
                element.totalFee = this.$utils.fmtAmountValue(element.totalFee.compact())
                element.date = this.$utils.fmtTime(new Date(element.timestamp.compact() + (Deadline.timestampNemesisBlock * 1000)))
                element.height = element.height.compact()
                this.dataTable.push(element)
              })

              // console.log(blockInfo.length, blockInfo.length < 100)
              if (blockInfo.length <= 50) {
                // console.log(this.dataTable[this.dataTable.length-1].height)
                this.$proxProvider.blockchainHttp.getBlocksByHeightWithLimit(this.dataTable[this.dataTable.length-1].height-1, 50).subscribe(
                  response => {
                    // console.log(response)
                    response.forEach(element => {
                      element.totalFee = this.$utils.fmtAmountValue(element.totalFee.compact())
                      element.date = this.$utils.fmtTime(new Date(element.timestamp.compact() + (Deadline.timestampNemesisBlock * 1000)))
                      element.height = element.height.compact()
                      this.dataTable.push(element)
                      this.buttonLoadMoreActive = true
                    })
                  }
                )
              } else {
                this.buttonLoadMoreActive = true
              }

              this.loaderStatus = false
            },
            error => {
              this.$store.dispatch('updateErrorInfo', {
                active: true,
                message: 'Comunication error whit node!',
                submessage: 'Check the internet connection and reload the page'
              })
              this.loaderStatus = false
            }
          )
        },
        error => {
          this.$store.dispatch('updateErrorInfo', {
            active: true,
            message: 'Comunication error whit node!',
            submessage: 'Check the internet connection and reload the page'
          })
          this.loaderStatus = false
        }
      )
    },

    loadMore () {
      // console.log('more blocks')
      if (this.buttonLoaderActive !== true) {
        this.buttonLoaderActive = true
        this.$proxProvider.blockchainHttp.getBlocksByHeightWithLimit(this.dataTable[this.dataTable.length-1].height-1, 100).subscribe(
          response => {
            // console.log(response)
            response.forEach(element => {
              element.totalFee = this.$utils.fmtAmountValue(element.totalFee.compact())
              element.date = this.$utils.fmtTime(new Date(element.timestamp.compact() + (Deadline.timestampNemesisBlock * 1000)))
              element.height = element.height.compact()
              this.dataTable.push(element)
              this.buttonLoaderActive = false
            })
          }
        )
      }
    },

    goTop () {
      window.scroll(0, 0)
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
  overflow-y: auto
  &::-webkit-scrollbar
    background: transparent
    width: 8px
  &::-webkit-scrollbar-thumb
    background: #2d8e9b
    border-radius: 10px
  & > .element
    margin-top: 5px
    display: flex
    flex-flow: row nowrap
    justify-content: space-around
    border: 1px solid #dddddde4
    // margin: 2px 0px
    padding: 5px
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
  & > .special-bottom
    margin-top: 5px
    display: flex
    flex-flow: row nowrap
    justify-content: space-around
    border: 1px solid #dddddde4
    padding: 3px
    color: white
    border-radius: 5px
    background: #2d8e9b
    & > div
      display: flex
      flex-flow: column
      align-items: center
      padding: 5px
      & > span:first-child
        font-size: 15px
        text-transform: uppercase
        font-weight: bold
        color: white
      & > span:last-child
        text-align: center
        font-size: 10px
        text-transform: uppercase
        font-weight: bold
        color: white

.topButton
  background: #ffffffd1
  width: 50px
  height: 50px
  display: flex
  justify-content: center
  align-items: center
  position: fixed
  z-index: 1000
  bottom: 50px
  right: 30px
  border-radius: 50%
  color: #2d8e9b
  border: 2px solid #2d8e9b
  &:hover
    background: #2d8e9b
    border: 2px solid white
    color: white
    box-shadow: 0px 0px 10px grey
    transition: all linear .2s

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

  .topButton
    bottom: 20px
    right: 10px
    background: #2d8e9b
    color: white

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
