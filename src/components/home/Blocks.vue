<template>

  <!-- Blocks Component -->
  <div class="block animated fast fadeIn">

    <!-- MDB Loader -->
    <mdb-progress v-if="loaderStatus" bgColor="cyan darken-3" style="width: 100%" indeterminate/>
    <!-- End MDB Loader -->

    <!-- NEW DESIGN OF BLOCKS COMPONENT (Mobile Compatible)-->
    <div class="mobile">
      <div class="guide">
        <div class="title-guide">Block Number</div>
        <div class="title-guide">Block Generator</div>
        <div class="title-guide">Records</div>
        <div class="title-guide">Timestamp</div>
      </div>

      <!-- Iterated Element of Block -->
      <div class="element animated faster fadeIn" v-for="(item, index) in dataTable" :key="index" :style="(index % 2 === 0) ? 'background: #f4f4f4' : 'background: white'">

        <div>
          <span class="title">Height</span>
          <router-link class="value link-data" :to="{ path: '/result/' + 'blockHeight/' + item.height }" target="_blank">{{ item.height }}</router-link>
        </div>

        <div>
          <span class="title">Block Generator</span>
          <router-link class="value link-data" :to="{ path: '/result/' + 'publicKey/' + item.signer.publicKey }" target="_blank">{{ item.signer.publicKey }}</router-link>
        </div>

        <div>
          <span class="title">TXS</span>
          <span class="value">{{ item.numTransactions }}</span>
        </div>

        <div>
          <span class="title">Timestamp</span>
          <span class="value">{{ item.date }}</span>
        </div>

      </div>
      <!-- End Of Iterated Element of Block -->

      <div class="special-bottom animated faster fadeInDown" v-if="dataTable.length !== 0" @click="loadMore">

        <div v-if="buttonLoadMoreActive">
          <span>Load more blocks</span>
          <span class="value" v-if="buttonLoaderActive"><mdb-spinner small color="yellow"/></span>
          <!-- <span class="value" v-if="!buttonLoaderActive">Click here</span>
          <span class="value" v-else><mdb-spinner small color="yellow"/></span> -->
        </div>

      </div>
    </div>
    <!-- END NEW DESIGN OF BLOCKS COMPONENT -->

    <div style="display: none">
      {{ updateTable }}
    </div>
  </div>
  <!-- End Blocks Component -->

</template>

<script>
import { mdbProgress, mdbSpinner, mdbIcon } from 'mdbvue'
import { Deadline } from 'tsjs-xpx-chain-sdk'

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
    this.viewAllBlocks()
  },
  methods: {
    /**
     * View All Blocks
     *
     * Method to see recently closed blocks
     */
    viewAllBlocks () {
      this.$proxProvider.chainHttp.getBlockchainHeight().subscribe(
        next => {
          this.$proxProvider.blockHttp.getBlocksByHeightWithLimit(next.compact(), 50).subscribe(
            blockInfo => {
              blockInfo.forEach(element => {
                element.totalFee = this.$utils.fmtAmountValue(element.totalFee.compact())
                element.date = this.$utils.fmtTime(new Date(element.timestamp.compact() + (Deadline.timestampNemesisBlock * 1000)))
                element.height = element.height.compact()
                this.dataTable.push(element)
              })

              if (blockInfo.length <= 50) {
                this.$proxProvider.blockHttp.getBlocksByHeightWithLimit(this.dataTable[this.dataTable.length-1].height-1, 50).subscribe(
                  response => {
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
                message: 'Comunication error with node!',
                submessage: 'Check the internet connection and reload the page'
              })
              this.loaderStatus = false
            }
          )
        },
        error => {
          this.$store.dispatch('updateErrorInfo', {
            active: true,
            message: 'Comunication error with node!',
            submessage: 'Check the internet connection and reload the page'
          })
          this.loaderStatus = false
        }
      )
    },

    loadMore () {
      if (this.buttonLoaderActive !== true) {
        this.buttonLoaderActive = true
        this.$proxProvider.blockHttp.getBlocksByHeightWithLimit(this.dataTable[this.dataTable.length-1].height-1, 100).subscribe(
          response => {
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
      if (height !== 'Loading') {
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
.guide
  background: red
  display: flex
  flex-flow: row nowrap
  justify-content: space-around
  // margin: 2px 0px
  padding: 5px
  color: white
  border-radius: 5px
  width: 100%
  padding: 10px 5px
  background: #1a1a1a
  & > .title-guide
    color: white
    font-size: 10px
    text-transform: uppercase
    font-weight: bold
    text-align: center
    flex-grow: 1
    &:first-child
      width: 55px
    &:nth-child(2n)
      width: 600px
    &:nth-child(3n)
      width: 66px
    &:nth-child(4n)
      width: 60px
    &:last-child
      width: 139px

.title
  color: grey
  font-size: 10px !important
  text-transform: uppercase
  display: none

.value
  font-size: 14px
  font-weight: bold
  text-transform: uppercase
  text-align: center
  color: black
  word-break: break-all !important

.mobile
  display: flex
  flex-flow: column
  width: 100%
  padding: 15px
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
    border: 1px solid #f4f4f4
    // margin: 2px 0px
    padding: 10px 5px
    color: black
    border-radius: 5px
    & > div
      display: flex
      flex-flow: column
      align-items: center
      flex-grow: 1
      &:first-child
        width: 55px
      &:nth-child(2)
        width: 600px
      &:nth-child(3)
        width: 66px
      &:nth-child(4)
        width: 60px
      &:last-child
        width: 139px
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
    color: white
    border-radius: 20px
    background: transparent
    & > div
      display: flex
      flex-flow: column
      align-items: center
      padding: 5px
      background: #2d819b
      border-radius: 20px
      padding: 5px 40px
      & > span:first-child
        font-size: 15px !important
        text-transform: uppercase
        font-weight: bold
        color: white
      & > span:last-child
        text-align: center
        font-size: 10px
        text-transform: uppercase
        font-weight: bold
        color: white

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
  .title
    display: block

  .value
    font-size: 10px !important
    word-break: break-all !important

  .guide
    display: none

  .link-data
    font-size: 10px
    font-weight: bold
    color: #2d8e9b !important
    text-decoration: underline
    word-wrap: break-word

  .mobile > .element
    display: block
    & > div
      padding: 5px
      border-bottom: 1px solid #c0c0c040
      &:first-child
        width: 100%
      &:nth-child(2)
        width: 100%
      &:nth-child(3)
        width: 100%
      &:nth-child(4)
        width: 100%
      &:last-child
        width: 100%
      &:last-child
        border-bottom: 0px solid silver

  .block
    display: flex
    flex-flow: column wrap
    align-items: center
    overflow-x: auto
    & > table
      min-width: 700px
</style>
