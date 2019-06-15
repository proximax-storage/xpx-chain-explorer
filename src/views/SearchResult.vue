<template>
  <!-- Search Result View -->
  <div class="searchResult">
    <!-- Search Bar Component -->
    <search-bar/>
    <!-- End Search Bar Component -->

    <!-- Search Result Main Message Container -->
    <div style="text-align: center; padding: 10px 0px">
      <h1 style="font-size: 20px">RESULT FOR SEARCH...</h1>
      <div class="search-type">{{ type }}</div>
      <div class="search-value">{{ value }}</div>
    </div>
    <!-- End Search Result Main Message Container -->

    <!-- Public Key Component -->
    <public-key v-if="type === 'Public Key' || type === 'Address'" :detail="param"/>
    <!-- End Public Key Component -->

    <!-- Block Info Component -->
    <block-info v-if="type === 'Block Height'" :detail="param"/>
    <!-- Block Info Component -->

    <!-- Transaction Component -->
    <transaction v-if="type === 'Transaction Hash'" :detail="param"/>
    <!-- End Transaction Component -->

    <!-- Mosaic Info component -->
    <mosaic-info v-if="type === 'Mosaic Info'"/>
    <!-- End Mosaic Info Component -->

    <!-- Mosaics Component -->
    <mosaics v-if="showRecentMosaic && blockMosaics !== null && blockMosaics.length > 0" :arrayTransactions="blockMosaics" :nameLabel="'Mosaics'"/>
    <!-- End Mosaics Component -->

    <!-- Recent Transactions Component -->
    <recent-trans v-if="showRecentTransaction && blockTransactions.length > 0 && blockTransactions.length > 0" :arrayTransactions="blockTransactions"/>
    <!-- End Recent Transactions Component -->

  </div>
  <!-- End Search Result View -->
</template>

<script>
import SearchBar from '@/components/global/SearchBar.vue'
import PublicKey from '@/components/searchResult/PublicKey.vue'
import BlockInfo from '@/components/searchResult/BlockInfo.vue'
import Transaction from '@/components/searchResult/Transaction.vue'
import MosaicInfo from '@/components/searchResult/MosaicInfo.vue'
import RecentTrans from '@/components/searchResult/RecentTrans.vue'
import Mosaics from '@/components/searchResult/Mosaics.vue'
import { Address, Deadline, NetworkType } from 'tsjs-xpx-catapult-sdk'
import proximaxProvider from '@/services/proximaxProviders.js'

export default {
  name: 'SearchResult',
  components: {
    SearchBar,
    PublicKey,
    BlockInfo,
    Transaction,
    MosaicInfo,
    RecentTrans,
    Mosaics
  },
  data () {
    return {
      param: {},
      type: '',
      value: '',
      recent: [],
      showRecentTransaction: false,
      blockTransactions: [],
      showRecentMosaic: false,
      blockMosaics: null,
    }
  },
  mounted () {
    // $proxProvider and proximaxProvider is Proximax Service (Proximax Provider Service) included in the main instance of vue (No need import)
    /**
     * Mounted - Lifecycle Hook of Vue
     * Search Result View
     *
     * In the search results, the mounted method, performs an analysis
     * of what type of data is being received and depending on this shows
     * the appropriate component to represent the data, in this case it
     * alternates on the components: Public Key, Block Info, and Transactions
     *
     * This component is widely connected to the Search Bar component
     */
    if (this.$route.params.type === 'publicKey' || this.$route.params.type === 'address') {
      let tmp
      if (this.$route.params.id.length === 64) {
        tmp = this.$proxProvider.createPublicAccount(this.$route.params.id, NetworkType.TEST_NET)
        // console.log("TEMPORAL", tmp)
        this.getInfoAccountAndViewTransactions(tmp.address.address)
      } else {
        this.getInfoAccountAndViewTransactions(this.$route.params.id)
      }
    } else if (this.$route.params.type === 'blockHeight') {
      this.getBlockByHeight(this.$route.params.id)
    } else if (this.$route.params.type === 'transactionHash') {
      this.getInfoTransaction(this.$route.params.id)
    } else if (this.$route.params.type === 'mosaicInfo') {
      console.log('AQUI')
      this.getMosaicInfo()
      this.showComponent()
    }
    this.value = this.$route.params.id
  },
  methods: {
    // For Public Key and Hash Transactions Data
    /**
     * Get Info Account And View Transactions
     *
     * This method performs the request and receipt of the information of an account,
     * and also returns your recent transactions shown in a component dedicated to it.
     *
     * @param { String } Account
     */
    getInfoAccountAndViewTransactions: function(account) {
      const addr = Address.createFromRawAddress(account)
      const xpx = proximaxProvider.mosaicXpx()

      // console.log("ADDRESS & XPX", addr, xpx)

      let suscripcion = this.$proxProvider.getAccountInfo(addr).subscribe(
        resp => {
          // Assign the response to accountInfo and show the account information
          // console.log('RESPONSE ACCOUNT', resp)
          this.param = resp
          this.showComponent()

          // If your account information has tiles, look up your information and name to display them in the tile table
          if (resp.mosaics.length > 0) {
            let filteredTrans = resp.mosaics.filter(el => el.id.toHex().toUpperCase() !== xpx)
            this.blockMosaics = filteredTrans
            this.showRecentMosaic = !this.showRecentMosaic
          }
          this.viewTransactionsFromPublicAccount(resp.publicAccount)
        },
        error => {
          console.warn('Error')
        }
      )
    },

    /**
     * Get Block By Height
     *
     * This method performs the request and receipt of the information of an block,
     * and also returns your recent transactions shown in a component dedicated to it.
     *
     * @param { String } block
     */
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
      })
    },

    /**
     * Get Info Transaction
     *
     * This method performs the request and receipt of information about a transaction
     *
     * @param { String } hast
     */
    getInfoTransaction: function (hast) {
      this.$proxProvider.getTransactionInformation(hast).subscribe(
        resp => {
          this.param = resp
          this.showComponent()
        },
        error => {
          console.warn('Communication error with the node!')
        }
      )
    },
    showComponent () {
      if (this.$route.params.type === 'publicKey') {
        this.type = 'Public Key'
      } else if (this.$route.params.type === 'blockHeight') {
        this.type = 'Block Height'
      } else if (this.$route.params.type === 'transactionHash') {
        this.type = 'Transaction Hash'
      } else if (this.$route.params.type === 'address') {
        this.type = 'Address'
      } else if (this.$route.params.type === 'mosaicInfo') {
        this.type = 'Mosaic Info'
      }
      this.value = this.$route.params.id
    },

    /**
     * View Transactions From Public Account
     * Search all transactions from the public account
     *
     * @param { any } publicAccount
     */
    viewTransactionsFromPublicAccount(publicAccount) {
      this.$proxProvider.getAllTransactionsFromAccount(publicAccount, 100).subscribe(
        transactions => {
          if (transactions.length > 0) {
            transactions.forEach(element => {
              element.fee = this.$utils.fmtAmountValue(element.maxFee.compact())
              element.deadline = this.$utils.fmtTime(new Date(element.deadline.value.toString()))
              this.blockTransactions.push(element)
            })
            this.showRecentTransaction = true
          }
        },
        error => {
          console.error('ACCOUNT ERROR....', error)
        }
      )
    },

    getMosaicInfo () {
      console.log('getMosaicInfo')
      console.log(this.$route.params)
      this.$proxProvider.getMosaics(this.$route.params.value).subscribe(
        res => {
          console.log(res)
        }
      )
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
  padding: 10px
  color: orange
  font-size: 20px

  font-weight: bold
  word-wrap: break-word
</style>
