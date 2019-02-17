<template>
  <div>
    <!-- FROM & TO INFO -->
    <mdb-row>
      <mdb-col md="3">
        <span class="fs-08rem fw-bolder"><b>Namespace:</b></span>
      </mdb-col>
      <mdb-col md="9">
        <span class="fs-08rem fw-bolder">{{transactionSelected.namespaceName}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="3">
        <span class="fs-08rem fw-bolder"><b>Fee: </b></span>
      </mdb-col>
      <mdb-col md="9">
        <span class="fs-08rem fw-bolder">{{transactionSelected.fee.compact()}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row v-if="transactionSelected.duration !== undefined">
      <mdb-col md="3">
        <span class="fs-08rem fw-bolder"><b>Duration: </b></span>
      </mdb-col>
      <mdb-col md="9">
        <span class="fs-08rem fw-bolder">{{transactionSelected.duration.compact()}}</span>
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
        <span class="fs-08rem fw-bolder"><b>Signature: </b></span>
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
  name: 'TypeRegisterNamespace',
  components: {
    mdbRow,
    mdbCol
  },
  props: {
    typeTransaction: Array,
    transactionSelected: Object
  }
}
</script>

