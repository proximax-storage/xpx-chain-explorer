<template>
  <div>
    <!-- FROM & TO INFO -->
    <mdb-row>
      <mdb-col md="12">
        <span class="fs-08rem fw-bolder"><b>Multisig Cosignatory Modification:</b></span>
      </mdb-col>
      <mdb-col md="10" v-for="item of modifyMultisigAccount" :key="item">
        <span class="fs-08rem fw-bolder">{{item.cosignatoryPublicAccount.publicKey}}</span>
      </mdb-col>
    </mdb-row>
    <hr>
    <mdb-row>
      <mdb-col md="3">
        <span class="fs-08rem fw-bolder"><b>Minimmium Approval Delta: </b></span>
      </mdb-col>
      <mdb-col md="9">
        <span class="fs-08rem fw-bolder">{{transactionSelected.minApprovalDelta}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="3">
        <span class="fs-08rem fw-bolder"><b>Minimum Removal Delta:</b></span>
      </mdb-col>
      <mdb-col md="9">
        <span class="fs-08rem fw-bolder">{{transactionSelected.minRemovalDelta}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Versión: </b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transactionSelected.version}}</span>
      </mdb-col>
    </mdb-row>
    <hr>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Signer:</b></span>
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

export default {
  name: 'TypeModifyMultisign',
  components: {
    mdbRow,
    mdbCol
  },
  props: {
    transactionSelected: Object
  }
}
</script>

