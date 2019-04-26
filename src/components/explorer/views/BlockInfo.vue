<template>
  <mdb-card class="card">
    <mdb-card-body>
      <div class="d-flex align-items-center" v-if="!showInfo">
        <strong>Loading...</strong>
        <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
      </div>
      <div v-if="showError">
        <mdb-alert color="danger">
          {{msg}}
        </mdb-alert>
      </div>
      <div v-if="!showError && showInfo">
      <mdb-card-title>Block Info</mdb-card-title>
      <hr>
        <mdb-card-text>
          <mdb-row class="info green-back">
            <mdb-col sm="4" md="3"><span class="fs-08rem bold">Height:</span></mdb-col>
            <mdb-col sm="8" md="9"><span class="fs-08rem">{{blockInfo.height.compact()}}</span></mdb-col>
          </mdb-row>
          <mdb-row class="info">
            <mdb-col sm="4" md="3"><span class="fs-08rem bold">Timestamp:</span></mdb-col>
            <mdb-col sm="8" md="9"><span class="fs-08rem">{{blockInfo.date}}</span></mdb-col>
          </mdb-row>
          <mdb-row class="info green-back">
            <mdb-col sm="4" md="3"><span class="fs-08rem bold">Difficulty:</span></mdb-col>
            <mdb-col sm="8" md="9"><span class="fs-08rem">{{blockInfo.difficulty}}</span></mdb-col>
          </mdb-row>
          <mdb-row class="info">
            <mdb-col sm="4" md="3"><span class="fs-08rem bold">Txes:</span></mdb-col>
            <mdb-col sm="8" md="9"><span class="fs-08rem">{{blockInfo.numTransactions}}</span></mdb-col>
          </mdb-row>
          <mdb-row class="info green-back">
            <mdb-col sm="4" md="3"><span class="fs-08rem bold">Fees:</span></mdb-col>
            <mdb-col sm="8" md="9"><span class="fs-08rem" v-html="blockInfo.totalFee"></span></mdb-col>
          </mdb-row>
          <mdb-row class="info">
            <mdb-col sm="4" md="3"><span class="fs-08rem bold">Harvester/Forger:</span></mdb-col>
            <mdb-col sm="8" md="9"><span class="fs-08rem">{{blockInfo.signer.publicKey}}</span></mdb-col>
          </mdb-row>
          <mdb-row class="info green-back">
            <mdb-col sm="4" md="3"><span class="fs-08rem bold">Hash:</span></mdb-col>
            <mdb-col sm="8" md="9"><span class="fs-08rem">{{blockInfo.hash}}</span></mdb-col>
          </mdb-row>
        </mdb-card-text>

        <div class="d-flex align-items-center" v-if="!showRecentTransaction && blockInfo.numTransactions > 0">
          <strong>Loading Transactions...</strong>
          <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
        </div>
        <br>
        <div class="row mt-3rem" v-if="noShowTransactions">
          <div class="col-6">
            <h4>Transactions</h4>
            <h6>nothing to show</h6>
          </div>
        </div>
        <recent-transactions v-if="showRecentTransaction" :transactions='blockTransactions' ></recent-transactions>
      </div>      
    </mdb-card-body>
  </mdb-card>
</template>
<script>
import proximaxProvider from '@/services/proximaxProvider'
import Utils from '@/services/Utils'
import { Deadline, BlockInfo } from 'proximax-nem2-sdk'
import RecentTransactions from '@/components/explorer/views/RecentTransactions'
import { mdbCard, mdbCardBody, mdbCardTitle, mdbCardText, mdbRow, mdbCol, mdbAlert } from 'mdbvue'

var _proximaxProvider

export default {
  name: 'BlockInfo',
  components: {
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbRow,
    mdbCol,
    mdbAlert,
    RecentTransactions
  },
  data () {
    _proximaxProvider =  new proximaxProvider()
    this.getBlockByHeight(this.$route.params.block)
    return {
      block: this.$route.params.block,
      blockInfo: {},
      blockTransactions: [],
      showRecentTransaction: false,
      showInfo: false,
      showError: false,
      noShowTransactions: false,
      msg: ''
    }
  },
  methods: {
    getBlockByHeight: function (block) {
      _proximaxProvider.blockchainHttp.getBlockByHeight(parseInt(block)).subscribe(
        next => {
        next.date = Utils.fmtTime(new Date(next.timestamp.compact() + Deadline.timestampNemesisBlock * 1000))
        next.difficulty = (next.difficulty.compact()/Math.pow(10, 14)*100).toFixed(2) + "%"
        next.totalFee = Utils.fmtAmountValue(next.totalFee.compact())
        this.blockInfo = next
        this.noShowTransactions = (this.blockInfo.numTransactions > 0) ? false : true
        this.showInfo = true
        _proximaxProvider.blockchainHttp.getBlockTransactions(parseInt(block)).subscribe(
          blockTransactions => {
            this.blockTransactions = blockTransactions
            for (const index in this.blockTransactions) {              
              this.blockTransactions[index].fee = Utils.fmtAmountValue(this.blockTransactions[index].fee.compact())
              this.blockTransactions[index].deadline = Utils.fmtTime(new Date(this.blockTransactions[index].deadline.value.toString()))              
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
    }
  }
}
</script>

<style lang="scss" scoped>

  .info {
    padding: 10px;
  }

  .bold {
    font-weight: bold;
  }

  .green-back {
    background: #00968833;
  }
</style>


