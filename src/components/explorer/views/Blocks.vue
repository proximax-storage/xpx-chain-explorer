<template>
  <div>
    <mdb-card class="card">
    <mdb-card-body>
      <div class="d-flex align-items-center" v-if="this.blockInfo.length == 0">
        <strong>Loading...</strong>
        <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
      </div>
      <div v-else>
        <mdb-tbl striped responsiveXl responsiveLg responsiveMd responsiveSm>
          <mdb-tbl-head class="background-explorer" textWhite>
            <tr>
              <th v-for="(head, index) in headElements" :key="index" class="text-center">{{head}}</th>
            </tr>
          </mdb-tbl-head>
          <mdb-tbl-body>
            <tr v-for="(item, i) in blockInfo" :key="i" v-show="(pag - 1) * NUM_RESULTS <= i  && pag * NUM_RESULTS > i">
              <th class="font-size-08rem text-center th-sm">
                <span class="font-size-08rem">
                  <router-link v-bind:to="`/block-info/${item.height.lower}`" class="text-link mouse-pointer">{{item.height.lower}}</router-link>
                    <!-- <a class="text-link mouse-pointer"></a> -->
                </span>
              </th>
              <td class="font-size-08rem th-lg">
                <span class="font-size-08rem">
                  <router-link :to="`/account-info/${item.signer.address.address}`" class="text-link mouse-pointer">{{item.signer.publicKey}}</router-link>
                </span>
              </td>
              <td class="font-size-08rem text-center th-lg">{{item.numTransactions}}</td>
              <td class="font-size-08rem text-center th-lg" v-html="item.totalFee"></td>
              <td class="text-center th-lg">{{item.date}}</td>

              <td class="font-size-08rem text-center th-lg mouse-pointer">
                <i style="font-size: 18px; color: #118a81;" class="fa fa-download" aria-hidden="true"></i>
              </td>
            </tr>
          </mdb-tbl-body>
        </mdb-tbl>
        <Pagination :quantity="blockInfo.length" :numResults="NUM_RESULTS" @changePage="changePage" />
      </div>
    </mdb-card-body>
  </mdb-card>
  </div>
</template>

<script>
import proximaxProvider from '@/services/proximaxProvider'
import Utils from '@/services/Utils'
import { Deadline, BlockInfo } from 'proximax-nem2-sdk'
import { mdbTbl, mdbTblHead, mdbTblBody, mdbCard, mdbCardBody } from 'mdbvue'
import Pagination from '@/components/shared/Pagination'

const _proximaxProvider = new proximaxProvider()

export default {
  name: 'Blocks',
  components: {
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    Pagination,
    mdbCard,
    mdbCardBody
  },
  data () {
    viewTransactions: false
    this.viewAllTransactions()
    return {
      headElements: ['Block Height', 'Harvester/Forger', 'Txes', 'Fee', 'Timestamp', 'Export CSV'],
      blockInfo: [],
      NUM_RESULTS: 10, // Numero de resultados por página
      pag: 1, // Página inicial
    }
  },
  methods: {
    viewAllTransactions: function (event = []) {
      _proximaxProvider.blockchainHttp.getBlockchainHeight().subscribe(
        next => {
          console.log(next);          
          
          _proximaxProvider.setBlocksHeightLocal(next)          
          let total = null
          let totalHeight = ''
          totalHeight = (event.length === 0) ? next.lower.toString() : event[event.length - 1].height.lower.toString()

          total = Number(totalHeight) - 100
          console.log(total);
          

          _proximaxProvider.blockchainHttp.getBlocksByHeightWithLimit(total, 100).subscribe(
            blockInfo => {
              console.log(blockInfo)
              blockInfo.forEach(element => {
                element.totalFee = Utils.fmtAmountValue(element.totalFee.compact())
                element.date = new Date(element.timestamp.compact() + (Deadline.timestampNemesisBlock * 1000)).toUTCString()
                if (event.length > 0) { event.push(element) }
              })

              this.blockInfo = (event.length === 0) ? blockInfo : event
              this.viewTransactions = true
              
            },
            error => {
              this.viewTransactions = false
              this.blockInfo = []
              this.viewAllTransactions()
            }
          )
        }
      )
    },
    changePage: function(event) {
      this.pag = event      
    }
  }
}
</script>


