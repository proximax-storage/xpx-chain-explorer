<template>
  <mdb-card class="card">
    <mdb-card-body>
      <div class="d-flex align-items-center" v-if="!showInfo">
        <strong>Loading...</strong>
        <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
      </div>
      <div v-if="showError">
        <mdb-alert color="danger">
          {{msg}}
        </mdb-alert>
      </div>
      <div v-if="!showError && showInfo">
        <mdb-card-title>{{typeTransaction}}</mdb-card-title>
        <hr>
        <info-transactions v-if="this.typeTransaction" :transactionSelected="infoTransaction" :classGreen="classGreen" :classInfo="classInfo" ></info-transactions>
      </div>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import proximaxProvider from '@/services/Service'
import { mdbCard, mdbCardBody, mdbCardTitle, mdbCardText, mdbRow, mdbCol, mdbAlert } from 'mdbvue'
import infoTransactions from '@/components/shared/infoTransactions'
const _proximaxProvider = new proximaxProvider()

export default {
  name: 'TransactionHast',
  components: {
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbRow,
    mdbCol,
    mdbAlert,
    infoTransactions
  },
  data () {
    return {
      infoTransaction: {},
      typeTransaction: '',
      classGreen: 2,
      classInfo: true,
      showInfo: false,
      showError: false,
      msg: ''
    }
  },
  created: function () {
    this.getInfoTransaction(this.$route.params.hast)
  },
  methods: {
    getInfoTransaction: function (hast) {
      _proximaxProvider.getTransactionInformation(hast).subscribe(
        resp => {
          const typeTransactions = proximaxProvider.typeTransactions()
          switch (resp.type) {
            case typeTransactions.transfer.id:
              this.typeTransaction = typeTransactions.transfer.name
              this.transferTransaction(resp)
              break;
          
            default:
              this.msg = 'Unexpected error try later!'
              this.showInfo = true
              this.showError = true
              break;
          }
          this.showInfo = true
        },
        error => {          
          this.msg = 'Communication error with the node!'
          this.showInfo = true
          this.showError = true
          console.log("Errrorrrrrr");
        }
      )
    },

    transferTransaction: function (transaction) {

      if (transaction.mosaics !== undefined && transaction.mosaics.length > 0) {
        console.log(transaction.mosaics)
        
        // _proximaxProvider.getMosaicNameFromHex(resp['mosaics'][0].id.toHex()).subscribe(
        //   name => {
        //     this.transactionInfo['mosaics'][0]['nameMosaic'] = name[0].name;
        //     this.showInfoMosaic = true;
        //     this.blockUI.stop();
        //   }
        // )
      }

      this.infoTransaction = [
        { label: 'From',          value: transaction.signer.address.pretty(),           classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'To',            value: transaction.recipient.pretty(),                classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Message',       value: transaction.message.payload,                   classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Timestamp',     value: transaction.deadline.value.toString(),         classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Block Height',  value: transaction.transactionInfo.height.compact(),  classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Hash',          value: transaction.transactionInfo.hash,              classLabel: 'col-md-2', classValue: 'col-md-10'},
        { label: 'Signature',     value: transaction.signature,                         classLabel: 'col-md-2', classValue: 'col-md-10'}
      ]
    }
  }
}
</script>
