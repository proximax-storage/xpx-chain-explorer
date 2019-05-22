<template>
  <div class="searchResult">
    <search-bar/>
    <div style="text-align: center; padding: 10px 0px">
      <h1 style="font-size: 20px">RESULT FOR SEARCH...</h1>
      <div class="search-type">{{ type }}</div>
      <div class="search-value">{{ value }}</div>
    </div>
    <public-key v-if="type === 'Public Key'"/>
    <block-info v-if="type === 'Block Height'" :detail="param"/>
    <transaction v-if="type === 'Transaction Hash'"/>
    <recent-trans v-if="showRecentTransaction && this.blockTransactions !== undefined" :arrayTransactions="this.blockTransactions"/>
  </div>
</template>

<script>
import SearchBar from '@/components/global/SearchBar.vue'
import PublicKey from '@/components/searchResult/PublicKey.vue'
import BlockInfo from '@/components/searchResult/BlockInfo.vue'
import Transaction from '@/components/searchResult/Transaction.vue'
import RecentTrans from '@/components/searchResult/RecentTrans.vue'
import { Deadline } from 'tsjs-xpx-catapult-sdk'

export default {
  name: 'SearchResult',
  components: {
    SearchBar,
    PublicKey,
    BlockInfo,
    Transaction,
    RecentTrans
  },
  data () {
    return {
      type: '',
      value: '',
      recent: [],
      param: {},
      showRecentTransaction: false,
      blockTransactions: undefined
    }
  },
  mounted () {
    if (this.$route.params.type === 'publicKey') {
    } else if (this.$route.params.type === 'blockHeight') {
      this.getBlockByHeight(this.$route.params.id)
    } else if (this.$route.params.type === 'transactionHash') {
    }
    console.log(this.type)
    this.value = this.$route.params.id
  },
  methods: {
    getBlockByHeight (block) {
      this.$proxProvider.blockchainHttp.getBlockByHeight(parseInt(block)).subscribe(
        next => {
        next.date = this.$utils.fmtTime(new Date(next.timestamp.compact() + Deadline.timestampNemesisBlock * 1000))
        next.difficulty = (next.difficulty.compact()/Math.pow(10, 14)*100).toFixed(2) + "%"
        next.totalFee = this.$utils.fmtAmountValue(next.totalFee.compact())
        this.param = {
          height: block,
          timestamp: next.date,
          publicKey: next.signer.publicKey,
          hash: next.hash,
          difficulty: next.difficulty,
          txes: next.numTransactions,
          fee: next.totalFee
        }
        this.showRecentTransaction = (this.param.txes > 0) ? true : false
        this.showComponent()
        this.showInfo = true
        this.$proxProvider.blockchainHttp.getBlockTransactions(parseInt(block)).subscribe(
          blockTransactions => {
            console.log("Estoy aqui", blockTransactions)
            this.blockTransactions = blockTransactions
            for (const index in this.blockTransactions) {              
              this.blockTransactions[index].fee = this.$utils.fmtAmountValue(this.blockTransactions[index].maxFee.compact())
              this.blockTransactions[index].deadline = this.$utils.fmtTime(new Date(this.blockTransactions[index].deadline.value.toString()))              
            }
            this.showRecentTransaction = true
            this.noShowTransactions = (this.blockTransactions.length > 0) ? false : true
          },
          error => {
            this.noShowTransactions = true
          }
        )
      },
      error => {
        console.log("Errorrrrr")
        this.showInfo = true
        this.msg = 'Communication error with the node!'
        this.showError = true
      })
    },
    showComponent () {
      if (this.$route.params.type === 'publicKey') {
        this.type = 'Public Key'
      } else if (this.$route.params.type === 'blockHeight') {
        this.type = 'Block Height'
      } else if (this.$route.params.type === 'transactionHash') {
        this.type = 'Transaction Hash'
      }
      console.log(this.type)
      this.value = this.$route.params.id
    }
  }
}
</script>

<style lang="sass" scoped>
.search-type
  color: white
  font-weight: bold
  font-size: 10px

.search-value
  color: orange
  font-size: 20px
</style>
