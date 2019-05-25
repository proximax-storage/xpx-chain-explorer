<template>
  <div class="block">
    <mdb-progress v-if="dataTable.length === 0" bgColor="primary-color-dark" style="width: 100%" indeterminate/>
    <table class="desktop">
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
    </table>
    <!-- <div class="mobile">
      <div v-for="(item, index) in dataTable" :key="index" :style="(index % 2 === 0) ? 'background: #DDDDDD' : 'background: #F4F4F4'">

      </div>
    </div> -->
    <div class="pagination">
      <paginator :arrayLength="dataTable.length" :limit="limit" @changePage="changePage"/>
    </div>
    <div style="display: none">
      {{ updateTable }}
    </div>
  </div>
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
    this.viewAllBlocks()
    //console.log('Este es el current block', this.currentBlock)
  },
  methods: {
    /**
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
            }
          )
        },
        error => {
          console.error('Communication error with the node!')
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
td
  text-align: center
  padding: 10px
  color: black
  font-size: 15px

.grey-back
  background: silver

.link-data
  font-weight: bold
  color: black
  &:hover
    color: dodgerblue
    text-decoration-line: underline

.block
  width: 100%
  display: flex
  flex-flow: column wrap
  justify-content: center
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
      background: red
      width: 100%
      text-align: center

@media screen and (max-width: 950px)
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
