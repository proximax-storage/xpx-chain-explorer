<template>
  <div class="block">
    <table>
      <tr class="header-row">
        <th>Block Height</th>
        <th>Harvester/Forger</th>
        <th>Fee</th>
        <th>Txes</th>
        <th>Timestamp</th>
      </tr>
      <tr v-for="(item, index) in dataTable" :key="index" :style="(index % 2 === 0) ? 'background: #DDDDDD' : 'background: #F4F4F4'">
        <td class="link-data" @click="analyzeItem">{{ item.height.compact() }}</td>
        <td class="link-data" @click="analyzeItem">{{ item.signer.publicKey }}</td>
        <td v-html="item.totalFee"></td>
        <td>{{ item.numTransactions }}</td>
        <td>{{ item.date }}</td>
      </tr>
    </table>
    <div class="pagination">
      <paginator :arrayLength="dataTable.length"/>
    </div>
  </div>
</template>

<script>
import Paginator from '@/components/global/Paginator.vue'
import { Deadline } from 'tsjs-xpx-catapult-sdk'

export default {
  name: 'Blocks',
  components: {
    Paginator
  },
  data () {
    return {
      currentBlock: this.$store.state.currentBlock,
      dataTable: []
    }
  },
  mounted () {
    this.viewAllBlocks()
    console.log('Este es el current block', this.currentBlock)
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
    analyzeItem (e) {
      console.log(e.target.textContent)
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
  &:hover
    color: dodgerblue
    text-decoration-line: underline

.block
  width: 100%
  display: flex
  flex-flow: row wrap
  justify-content: center
  align-items: center
  padding: 10px
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
      background: transparent !important
      & > th
        text-align: center
        text-transform: uppercase
        font-weight: bold
        padding: 5px
    & > .pagination
      background: red
      width: 100%
      text-align: center

@media screen and (max-width: 750px)
  .block
    display: block
    overflow-x: auto
    padding: 10px
    text-align: center
    & > table
      width: 700px
</style>
