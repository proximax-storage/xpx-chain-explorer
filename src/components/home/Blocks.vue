<template>

  <!-- Blocks Component -->
  <div class="block animated fast fadeIn">

    <!-- MDB Loader -->
    <mdb-progress v-if="dataTable.length === 0 && loaderStatus" bgColor="primary-color-dark" style="width: 100%" indeterminate/>
    <!-- End MDB Loader -->

    <!-- ALTERNATIVE BLOCK CONFIGURED IN INVISIBLE -->
      <!-- <table class="desktop">
        <tr class="header-row">
          <th>Block Height</th>
          <th>Harvester/Forger</th>
          <th>Fee</th>
          <th>Txes</th>
          <th>Timestamp</th>
        </tr>
        <tr v-for="(item, index) in dataTable" :key="index" :style="(index % 2 === 0) ? 'background: #DDDDDD' : 'background: #F4F4F4'" v-show="(pag - 1) * limit <= index  && pag * limit > index">
          <td><router-link class="link-data" :to="{ path: '/searchResult/' + 'blockHeight/' + item.height }" target="_blank">{{ item.height }}</router-link></td>
          <td class="link-data"><router-link class="link-data" :to="{ path: '/searchResult/' + 'publicKey/' + item.signer.address.address }" target="_blank">{{ item.signer.publicKey }}</router-link></td>
          <td v-html="item.totalFee"></td>
          <td>{{ item.numTransactions }}</td>
          <td style="word-wrap: break-word">{{ item.date }}</td>
        </tr>
      </table> -->
    <!-- END ALTERNATIVE BLOCK CONFIGURED IN INVISIBLE -->

    <!-- NEW DESIGN OF BLOCKS COMPONENT (Mobile Compatible)-->
    <div class="mobile">

      <!-- Iterated Element of Block -->
      <div class="element" v-for="(item, index) in dataTable" :key="index" :style="(index % 2 === 0) ? 'background: #DDDDDD' : 'background: #F4F4F4'" v-show="(pag - 1) * limit <= index  && pag * limit > index">

        <div>
          <span>Height</span>
          <router-link class="link-data" :to="{ path: '/searchResult/' + 'blockHeight/' + item.height }" target="_blank">{{ item.height }}</router-link>
        </div>

        <div>
          <span>Harvester/Forger</span>
          <router-link class="link-data" :to="{ path: '/searchResult/' + 'publicKey/' + item.signer.publicKey }" target="_blank" style="word-break: break-all">{{ item.signer.publicKey }}</router-link>
        </div>

        <div>
          <span>Fee</span>
          <span v-html="item.totalFee"></span>
        </div>

        <div>
          <span>TXES</span>
          <span>{{ item.numTransactions }}</span>
        </div>

        <div>
          <span>Timestamp</span>
          <span>{{ item.date }}</span>
        </div>

      </div>
      <!-- End Of Iterated Element of Block -->

    </div>
    <!-- END NEW DESIGN OF BLOCKS COMPONENT -->

    <div class="pagination">
      <paginator :arrayLength="dataTable.length" :limit="limit" @changePage="changePage"/>
    </div>
    <div style="display: none">
      {{ updateTable }}
    </div>
  </div>
  <!-- End Blocks Component -->

</template>

<script>
import { mdbProgress } from 'mdbvue'
import Paginator from '@/components/global/Paginator.vue'
import { Deadline } from 'tsjs-xpx-catapult-sdk'

export default {
  name: 'Blocks',
  components: {
    Paginator,
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
              console.error('Communication error with the node!')
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
          console.error('Communication error with the node!')
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
      console.log(this.$store.getters.getLoaderState)
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
  padding: 10px
  margin: 0px
  & > .element
    display: flex
    flex-flow: row nowrap
    justify-content: space-around
    margin: 2px 0px
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
        font-size: 15px
        text-transform: uppercase
        font-weight: bold
        color: grey
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
  font-size: 15px
  font-weight: bold
  color: black
  &:hover
    color: dodgerblue
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
    color: black
    word-wrap: break-word
    &:hover
      color: dodgerblue
      text-decoration-line: underline

  .mobile > .element
    flex-flow: column nowrap
    & > div
      display: flex
      flex-flow: column wrap
      align-items: center
      padding: 3px
      &:nth-child(2n)
        background: #c5c5c5
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
