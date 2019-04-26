<template>
  <div>
    <br>
    <div v-if="typeTransactionsProv.mosaicDefinition.id === typeTransactionId">
      <div class="row mt-3rem">
        <div class="col-12">
          <h5>Mosaic properties: </h5>
        </div>
      </div>
      <hr>
      <mdb-row v-for="(item, i) in transaction" :key="i" :class="[{'green-back': i % 2 == 0},{'info': true}]">
        <mdb-col sm="12" :class="item.classLabel">
          <span class="fs-08rem fw-bolder"><b>{{item.label}} </b></span>
        </mdb-col>
        <mdb-col sm="12" :class="item.classValue">
          <i v-if="item.label === 'Supply Mutable?' || item.label === 'Levy Mutable?' || item.label === 'Transferable?' && (!item.value)" class="fa fa-minus-square prefix text-danger"></i>
          <i v-else-if="item.label === 'Supply Mutable?' || item.label === 'Levy Mutable?' || item.label === 'Transferable?'" class="fa fa-check-square prefix text-success"></i>
          <span v-else class="fs-08rem fw-bolder">{{item.value}}</span>
        </mdb-col>
      </mdb-row>
    </div>
    <div v-if="typeTransactionsProv.transfer.id === typeTransactionId && transaction.length > 0">
      <div class="row mt-3rem">
        <div class="col-12">
          <h5>Mosaics: </h5>
        </div>
      </div>
      <hr>
      <mdb-tbl striped responsiveXl responsiveLg responsiveMd responsiveSm>
        <mdb-tbl-head class="background-explorer" textWhite>
          <tr>
            <th class="text-center">Mosaic</th>
            <th class="text-center">Quantity</th>
          </tr>
        </mdb-tbl-head>
        <mdb-tbl-body>
          <tr v-for="(mosaic, index) in transaction" :key="index">
            <td class="th-lg text-center">
              <span class="fs-08rem fw-bolder">{{mosaic.name}}</span>
            </td>
            <td class="th-lg text-center">
              <span class="fs-08rem fw-bolder" v-html="mosaic.amount"></span>
            </td>
          </tr>
        </mdb-tbl-body>
      </mdb-tbl>
    </div>
  </div>
</template>

<script>
import proximaxProvider from '@/services/proximaxProvider'
import { mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue'

export default {
  name: 'detailsTransaction',
  components: {
    mdbRow,
    mdbCol,
    mdbTbl,
    mdbTblHead,
    mdbTblBody
  },
  props: {
    transaction: Array,
    typeTransactionId: Number
  },
  data () {
    return {
      typeTransactionsProv: proximaxProvider.typeTransactions()
    }
  }
}
</script>

