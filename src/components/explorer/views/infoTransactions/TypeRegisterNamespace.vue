<template>
  <div>
    <!-- FROM & TO INFO -->
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Namespace:</b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transactionSelected.namespaceName}}</span>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Fee: </b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder" v-html="transactionSelected.fee"></span>
      </mdb-col>
    </mdb-row>
    <mdb-row v-if="transactionSelected.duration !== undefined">
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Duration: </b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{duration}}</span>
      </mdb-col>
    </mdb-row>
    <hr>

    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Signer: </b></span>
      </mdb-col>
      <mdb-col md="10">
        <router-link target="_blank" :to="`/account-info/${transactionSelected.signer.address.pretty()}`" class="text-link mouse-pointer">{{transactionSelected.signer.address.pretty()}}</router-link>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Deadline:</b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transactionSelected.deadline}}</span>
      </mdb-col>
    </mdb-row>
    <hr>
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Block Height:</b></span>
      </mdb-col>
      <mdb-col md="10">
        <router-link target="_blank" :to="`/block-info/${transactionSelected.transactionInfo.height.compact()}`" class="text-link mouse-pointer">{{transactionSelected.transactionInfo.height.compact()}}</router-link>
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
    <mdb-row>
      <mdb-col md="2">
        <span class="fs-08rem fw-bolder"><b>Signature: </b></span>
      </mdb-col>
      <mdb-col md="10">
        <span class="fs-08rem fw-bolder">{{transactionSelected.signature}}</span>
      </mdb-col>
    </mdb-row>

  </div>
</template>

<script>
import Utils from '@/services/Utils'
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
  },
  data () {
    return {
      duration: Utils.calculateDuration(this.transactionSelected.duration.compact())
    }
  }
}
</script>

