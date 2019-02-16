<template>
  <div>
    <div class="row mt-3rem">
      <div class="col-6">
        <h4>Mosaics info</h4>
      </div>
    </div>
    <hr>
    <mdb-tbl striped responsiveXl responsiveLg responsiveMd responsiveSm>
      <mdb-tbl-head class="background-explorer" textWhite>
        <tr>
          <th v-for="(head, index) in headElements" :key="index" class="text-center">{{head}}</th>
        </tr>
      </mdb-tbl-head>
      <mdb-tbl-body>
        <tr v-for="(mosaic, index) in mosaicsArray" :key="index">
          <td class="font-size-08rem text-align-center">
            <a class="text-link mouse-pointer">{{mosaic.nameMosaic}}</a>
          </td>
          <td class="font-size-08rem text-align-center">{{mosaic.properties.divisibility}}</td>
          <td class="font-size-08rem text-align-center">{{mosaic.properties.levyMutable}}</td>
          <td class="font-size-08rem text-align-center">{{mosaic.properties.supplyMutable}}</td>
          <td class="font-size-08rem text-align-center">{{mosaic.properties.transferable}}</td>
          <td *ngIf="viewAmount" class="font-size-08rem text-align-center">{{mosaic.formattedAmount}}</td>
          <td class="font-size-08rem text-align-center mouse-pointer th-lg">
            <i style="font-size: 18px; color: #118a81;" class="fa fa-search-plus" aria-hidden="true"></i>
          </td>
        </tr>
      </mdb-tbl-body>
    </mdb-tbl>
  </div>
</template>

<script>
import { mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue'

export default {
  name: 'MosaicsInfo',
  components: {
    mdbTbl,
    mdbTblHead,
    mdbTblBody
  },
  props: {
    mosaicsArray: Array,
    viewAmount: Boolean
  },
  created: function () {
    if (!this.viewAmount) {
      this.headElements = ['Name', 'Divisibility', 'Levy Mutable', 'Supply Mutable', 'Transferable', 'View More']
    } else {
      this.headElements = ['Name', 'Divisibility', 'Levy Mutable', 'Supply Mutable', 'Transferable', 'Quantity', 'View More']
    }
  }
}
</script>

