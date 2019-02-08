<template>
  <mdb-tbl striped responsiveXl responsiveLg responsiveMd responsiveSm>
    <mdb-tbl-head class="background-explorer" textWhite>
      <tr>
        <th v-for="(head, index) in headElements" :key="index" class="text-center">{{head}}</th>
      </tr>
    </mdb-tbl-head>
    <mdb-tbl-body>
      <tr v-for="(item, i) in blockInfo" :key="i">
        <th class="font-size-08rem text-center th-sm" v-if="i+1 >= firstItemIndex && i < lastItemIndex">
          <span class="font-size-08rem">
            <router-link v-bind:to="`/block-info/${item.height.lower}`" class="text-link mouse-pointer">{{item.height.lower}}</router-link>
              <!-- <a class="text-link mouse-pointer"></a> -->
          </span>
        </th>
        <td class="text-center th-lg" v-if="i+1 >= firstItemIndex && i < lastItemIndex">{{item.date}}</td>
        <td class="font-size-08rem text-center th-lg" v-if="i+1 >= firstItemIndex && i < lastItemIndex">
          <span class="font-size-08rem">
            <router-link :to="`/account-info/${item.signer.address['address']}`" :address="item.signer.address" class="text-link mouse-pointer">{{item.signer.publicKey}}</router-link>
          </span>
        </td>

        <td class="font-size-08rem text-center th-lg" v-if="i+1 >= firstItemIndex && i < lastItemIndex">{{item.numTransactions}}</td>
        <td class="font-size-08rem text-center th-lg" v-if="i+1 >= firstItemIndex && i < lastItemIndex">{{item.difficulty.compact()}}</td>
        <td class="font-size-08rem text-center th-lg" v-if="i+1 >= firstItemIndex && i < lastItemIndex">{{item.totalFee.compact()}}</td>
        <td class="font-size-08rem text-center th-lg mouse-pointer" v-if="i+1 >= firstItemIndex && i < lastItemIndex">
          <i style="font-size: 18px; color: #118a81;" class="fa fa-download" aria-hidden="true"></i>
        </td>
      </tr>
    </mdb-tbl-body>
    <!-- <mdb-pagination circle>
      <mdb-page-item disabled>First</mdb-page-item>
      <mdb-page-nav prev disabled></mdb-page-nav>
      <mdb-page-item active>1</mdb-page-item>
      <mdb-page-item>2</mdb-page-item>
      <mdb-page-item>3</mdb-page-item>
      <mdb-page-item>4</mdb-page-item>
      <mdb-page-item>5</mdb-page-item>
      <mdb-page-nav next></mdb-page-nav>
      <mdb-page-item>Last</mdb-page-item>
    </mdb-pagination> -->
  </mdb-tbl>
</template>

<script>
import Service from '@/services/Service'
import { Deadline, BlockInfo } from 'proximax-nem2-sdk'
import { mdbTbl, mdbTblHead, mdbTblBody, mdbPagination, mdbPageItem, mdbPageNav } from 'mdbvue';

const _service = new Service()

export default {
  name: 'allTransactions',
  components: {
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    mdbPagination,
    mdbPageItem,
    mdbPageNav
  },
  data () {
    viewTransactions: false
    this.viewAllTransactions()
    return {
      headElements: ['Block Height', 'Timestamp', 'Harvester/Forger', 'Number of Transactions', 'Difficulty', 'Fees', 'Export CSV'],
      blockInfo: [],
      firstItemIndex: 0,
      lastItemIndex: 10
    }
  },
  methods: {
    viewAllTransactions: function (event = []) {
      _service.blockchainHttp.getBlockchainHeight().subscribe(
        next => {
          let total = null
          let heightWS = ''
          let totalHeight = ''
          _service.setBlocksHeightLocal(next)

          totalHeight = (event.length === 0) ? next.lower.toString() : event[event.length - 1].height.lower.toString()
          heightWS = totalHeight.slice(0, -2) + '01'
          total = (25 >= Number(totalHeight)) ? Number(heightWS) : Number(heightWS) - 100

          _service.blockchainHttp.getBlocksByHeightWithLimit(total, 100).subscribe(
            blockInfo => {
              blockInfo.forEach(element => {
                element['date'] = new Date(element.timestamp.compact() + (Deadline.timestampNemesisBlock * 1000)).toUTCString()
                if (event.length > 0) { event.push(element) }
              })

              this.blockInfo = (event.length === 0) ? blockInfo : event
              this.viewTransactions = true
              console.log(this.blockInfo)
              
            },
            error => {
              this.viewTransactions = false
              this.blockInfo = []
              this.viewAllTransactions()
            }
          )
        }
      )
    }
  }
}
</script>
