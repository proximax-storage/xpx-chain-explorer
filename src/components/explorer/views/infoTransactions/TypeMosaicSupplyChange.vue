<template>
  <div>
    <!-- FROM & TO INFO -->
    <mdb-row>
      <mdb-col md="3">
        <span class="fs-08rem fw-bolder"><b>Mosaic: </b></span>
      </mdb-col>
      <mdb-col md="9">
        <span class="fs-08rem fw-bolder">{{nameMosaic}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="3">
        <span class="fs-08rem fw-bolder"><b>Fee:</b></span>
      </mdb-col>
      <mdb-col md="9">
        <span class="fs-08rem fw-bolder">{{transactionSelected.fee.compact()}}</span>
      </mdb-col>
    </mdb-row>
    <hr>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Duration:</b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transactionSelected.mosaicProperties.duration.compact()}}</span>
      </mdb-col>
    </mdb-row>
    <hr>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Signer: </b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transactionSelected.signer.publicKey}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Signature:</b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transactionSelected.signature}}</span>
      </mdb-col>
    </mdb-row>
    <hr>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Timestamp:</b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transactionSelected.deadline.value.toString()}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Height:</b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transactionSelected.transactionInfo.height.lower}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Hash:</b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transactionSelected.transactionInfo.hash}}</span>
      </mdb-col>
    </mdb-row>
  </div>
</template>

<script>
import { mdbRow, mdbCol } from 'mdbvue'
import proximaxProvider from '@/services/proximaxProvider'
const _proximaxProvider = new proximaxProvider()

export default {
  name: 'TypeMosaicSupplyChange',
  components: {
    mdbRow,
    mdbCol
  },
  props: {
    transactionSelected: Object
  },
  data () {
    let name = this.getNameMosaic()
    return {
      nameMosaic: name
    }
  },
  methods: {
    getNameMosaic: function () {
      _proximaxProvider.mosaicHttp.getMosaicsName([this.transactionSelected.mosaicId.id]).subscribe(
        name => {
          return name[0].name
        }
      );
    }
  }
}
</script>

