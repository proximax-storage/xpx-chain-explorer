<template>
  <mdb-card class="card">
    <mdb-card-body>
      <mdb-card-title>Block Info</mdb-card-title>
      <hr>
      <div v-if="showInfo">
        <mdb-card-text>
          <mdb-row class="info green-back">
            <mdb-col sm="4" md="3"><span class="fs-08rem bold">Height:</span></mdb-col>
            <mdb-col sm="8" md="9"><span class="fs-08rem">{{blockInfo.height.compact()}}</span></mdb-col>
          </mdb-row>
          <mdb-row class="info">
            <mdb-col sm="4" md="3"><span class="fs-08rem bold">Difficulty:</span></mdb-col>
            <mdb-col sm="8" md="9"><span class="fs-08rem">{{blockInfo.difficulty.compact()}}</span></mdb-col>
          </mdb-row>
          <mdb-row class="info green-back">
            <mdb-col sm="4" md="3"><span class="fs-08rem bold">Timestamp:</span></mdb-col>
            <mdb-col sm="8" md="9"><span class="fs-08rem">{{blockInfo.date}}</span></mdb-col>
          </mdb-row>
          <mdb-row class="info">
            <mdb-col sm="4" md="3"><span class="fs-08rem bold">Hash:</span></mdb-col>
            <mdb-col sm="8" md="9"><span class="fs-08rem">{{blockInfo.hash}}</span></mdb-col>
          </mdb-row>
          <mdb-row class="info green-back">
            <mdb-col sm="4" md="3"><span class="fs-08rem bold">Harvester/Forger:</span></mdb-col>
            <mdb-col sm="8" md="9"><span class="fs-08rem">{{blockInfo.signer.publicKey}}</span></mdb-col>
          </mdb-row>
          <mdb-row class="info">
            <mdb-col sm="4" md="3"><span class="fs-08rem bold"># Transactions:</span></mdb-col>
            <mdb-col sm="8" md="9"><span class="fs-08rem">{{blockInfo.numTransactions}}</span></mdb-col>
          </mdb-row>
          <mdb-row class="info green-back">
            <mdb-col sm="4" md="3"><span class="fs-08rem bold">Fees:</span></mdb-col>
            <mdb-col sm="8" md="9"><span class="fs-08rem">{{blockInfo.totalFee.compact()}}</span></mdb-col>
          </mdb-row>
        </mdb-card-text>

        <recent-transactions :transactions='blockTransactions' ></recent-transactions>
      </div>      
    </mdb-card-body>
  </mdb-card>
</template>
<script>
import Service from '@/services/Service'
import { Deadline, BlockInfo } from 'proximax-nem2-sdk'
import RecentTransactions from '@/components/explorer/views/RecentTransactions'
import { mdbCard, mdbCardBody, mdbCardTitle, mdbCardText, mdbRow, mdbCol } from 'mdbvue'

const _service = new Service()

export default {
  name: 'BlockInfo',
  components: {
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbRow,
    mdbCol,
    RecentTransactions
  },
  data () {
    this.getBlockByHeight(this.$route.params.block)
    return {
      block: this.$route.params.block,
      blockInfo: {},
      blockTransactions: [],
      showRecentTransaction: false,
      showInfo: false

    }
  },
  methods: {
    getBlockByHeight: function (block) {
      _service.blockchainHttp.getBlockByHeight(parseInt(block)).subscribe(
        next => {
        let time = new Date(next.timestamp.compact() + Deadline.timestampNemesisBlock * 1000)
        next.date = time.toUTCString()
        this.blockInfo = next
        this.showInfo = true
        _service.blockchainHttp.getBlockTransactions(parseInt(block)).subscribe(
          blockTransactions => {
            this.showRecentTransaction = true
            this.blockTransactions = blockTransactions
          }
        )
      },
      error => {
        console.log("Errorrrrr")
        this.showInfo = false;
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


