<template>
  <div>
    <!-- FROM & TO INFO -->
    <mdb-row>
      <mdb-col md="3">
        <span class="fs-08rem fw-bolder"><b>From: </b></span>
      </mdb-col>
      <mdb-col md="9">
        <span class="fs-08rem fw-bolder">{{transactionSelected.signer.address.pretty()}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="3">
        <span class="fs-08rem fw-bolder"><b>To:</b></span>
      </mdb-col>
      <mdb-col md="9">
        <span class="fs-08rem fw-bolder">{{transactionSelected.recipient.pretty()}}</span>
      </mdb-col>
    </mdb-row>
    <hr>

    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Message: </b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transactionSelected.message.payload}}</span>
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
        <span class="fs-08rem fw-bolder">{{transactionSelected.transactionInfo.height.compact()}}</span>
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
export default {
  name: 'TypeTransfer',
  components: {
    mdbRow,
    mdbCol
  },
  props: {
    transactionSelected: Object
  }
}
</script>

