<template>
  <div class="searchResult">
    <search-bar/>
    <div style="text-align: center; padding: 10px 0px">
      <h1 style="font-size: 20px">RESULT FOR SEARCH...</h1>
      <div class="search-type">{{ type }}</div>
      <div class="search-value">{{ value }}</div>
    </div>
    <public-key v-if="type === 'Public Key'" :detail="param"/>
    <block-info v-if="type === 'Block Height'" :detail="param"/>
    <transaction v-if="type === 'Transaction Hash'"/>
    <recent-trans v-if="showRecentMosaic && blockMosaics !== null && blockMosaics.length > 0" :arrayTransactions="blockMosaics" :nameLabel="'Mosaics'"/>
    <recent-trans v-if="showRecentTransaction && blockTransactions !== null && blockTransactions.length > 0" :arrayTransactions="blockTransactions"/>
  </div>
</template>

<script>
import SearchBar from '@/components/global/SearchBar.vue'
import PublicKey from '@/components/searchResult/PublicKey.vue'
import BlockInfo from '@/components/searchResult/BlockInfo.vue'
import Transaction from '@/components/searchResult/Transaction.vue'
import RecentTrans from '@/components/searchResult/RecentTrans.vue'
import { Address, Deadline, NetworkType } from 'tsjs-xpx-catapult-sdk'
import proximaxProvider from '@/services/proximaxProviders.js'

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
      blockTransactions: null,
      showRecentMosaic: false,
      blockMosaics: null,
    }
  },
  mounted () {
    if (this.$route.params.type === 'publicKey') {
      let tmp
      if (this.$route.params.id.length === 64) {
        tmp = this.$proxProvider.createPublicAccount(this.$route.params.id, NetworkType.TEST_NET)
        console.log("TEMPORAL", tmp)
        this.getInfoAccountAndViewTransactions(tmp.address.address)
      } else {
        this.getInfoAccountAndViewTransactions(this.$route.params.id)
      }
    } else if (this.$route.params.type === 'blockHeight') {
      this.getBlockByHeight(this.$route.params.id)
    } else if (this.$route.params.type === 'transactionHash') {
    }
    console.log(this.type)
    this.value = this.$route.params.id
  },
  methods: {
    getInfoAccountAndViewTransactions: function(account) {
      const addr = Address.createFromRawAddress(account)
      const xpx = proximaxProvider.mosaicXpx()

      console.log(addr, xpx)
      
      let suscripcion = this.$proxProvider.getAccountInfo(addr).subscribe(
        resp => {
          // Assign the response to accountInfo and show the account information
          console.log(resp)
          this.param = resp
          this.showComponent()

          // If your account information has tiles, look up your information and name to display them in the tile table
          if (resp.mosaics.length > 0) {
            this.blockMosaics = resp.mosaics.filter(el => el.id.toHex() !== xpx)
            this.showRecentMosaic = !this.showRecentMosaic
            console.log("Transaciones", this.blockMosaics)
          }
            // this.mosaicXpx = this.accountInfo.mosaics.filter(element => {
            //   return element.id.toHex() === xpx
            // })

          //   this.mosaicXpx = this.$utils.fmtAmountValue(this.mosaicXpx[0].amount.compact())
          //   this.showAccountInfo = true

          //   this.accountInfo.mosaics = this.accountInfo.mosaics.filter(element => {
          //     return element.id.toHex() !== xpx
          //   })
          //   if (this.accountInfo.mosaics.length === 0) {
          //     this.showInfoMosaic = true
          //   } else {
          //     this.searchMosaics(this.accountInfo.mosaics)     
          //   }
          // } else {
          //   this.mosaicXpx = Utils.fmtAmountValue(0)
          //   this.showInfoMosaic = true
          //   this.showAccountInfo = true
          // }
          // // Search all transactions in the public account and show the table of recent transactions
          // this.viewTransactionsFromPublicAccount(this.accountInfo.publicAccount)
        },
        error => {
          this.msg = 'Communication error with the node!'
          this.showError = true
          this.showAccountInfo = true
        }
      )
    },
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
