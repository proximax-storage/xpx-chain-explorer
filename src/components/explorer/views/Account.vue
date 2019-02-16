<template>
  <mdb-card class="card">
    <mdb-card-body>
      <div class="d-flex align-items-center" v-if="!showAccountInfo">
        <strong>Loading...</strong>
        <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
      </div>
      <div v-else>
      <mdb-card-title>Account Info</mdb-card-title>
      <hr>
        <mdb-card-text>
          <mdb-row class="info green-back">
            <mdb-col sm="4" md="3"><span class="fs-08rem bold">Address:</span></mdb-col>
            <mdb-col sm="8" md="9"><span class="fs-08rem">{{accountInfo.address.pretty()}}</span></mdb-col>
          </mdb-row>
          <mdb-row class="info">
            <mdb-col sm="4" md="3"><span class="fs-08rem bold">Public key:</span></mdb-col>
            <mdb-col sm="8" md="9">
              <div v-if="accountInfo.publicKey === '0000000000000000000000000000000000000000000000000000000000000000'">
                <span class="fs-08rem">You need to make a transaction to get a public key</span>
              </div>
              <div v-else>
                <span class="fs-08rem">{{accountInfo.publicKey}}</span>
              </div>
            </mdb-col>
          </mdb-row>
        </mdb-card-text>

        <!-- <mosaics-info :viewAmount="true" :mosaicsArray="mosaicsArray" ></mosaics-info> -->
        <div class="d-flex align-items-center" v-if="!showRecentTransaction">
          <strong>Loading Recent Transactions...</strong>
          <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
        </div>
        <div class="row mt-3rem" v-if="showRecentTransaction && transactionsFromPublicAccount.length == 0">
          <div class="col-6">
            <h4>Recent transactions</h4>
            <h6>nothing to show</h6>
          </div>
        </div>
        <recent-transactions :transactions='transactionsFromPublicAccount' :address='accountInfo.address.address' ></recent-transactions>
      </div>      
    </mdb-card-body>
  </mdb-card>
</template>
<script>
import proximaxProvider from '@/services/proximaxProvider'
import { TransactionType, Address } from 'proximax-nem2-sdk'
import { mdbCard, mdbCardBody, mdbCardTitle, mdbCardText, mdbRow, mdbCol } from 'mdbvue'
import RecentTransactions from '@/components/explorer/views/RecentTransactions'
import MosaicsInfo from '@/components/explorer/views/MosaicsInfo'

const _proximaxProvider = new proximaxProvider()

export default {
  name: 'Account',
  components: {
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbRow,
    mdbCol,
    RecentTransactions,
    MosaicsInfo
  },
  data () {
    return {
      accountInfo: [],
      dataSelected: {},
      transactionsFromPublicAccount: [],
      showInfoMosaic: false,
      showAccountInfo: false,
      showRecentTransaction: false,
      mosaicsArray: []
    }
  },
  created: function () {
    this.getInfoAccountAndViewTransactions(this.$route.params.address)
  },
  methods: {
    getInfoAccountAndViewTransactions: function(account) {
      const addr = Address.createFromRawAddress(account)
      
      _proximaxProvider.getAccountInfo(addr).subscribe(
        resp => {
          // Assign the response to accountInfo and show the account information
          this.showAccountInfo = true
          this.accountInfo = resp
          console.log("Cuenta: ", this.accountInfo);          

          // Search all transactions in the public account and show the table of recent transactions
          this.viewTransactionsFromPublicAccount(this.accountInfo['publicAccount'])

        },
        error => {
          console.log('dio error23....', error)
        }
      )
    },


    /**
     * Search all transactions from the public account
     *
     * @param {any} publicAccount
     * @memberof ExplorerDetailComponent
     */
    viewTransactionsFromPublicAccount(publicAccount) {
      _proximaxProvider.getAllTransactionsFromAccount(publicAccount, 100).subscribe(
        transactions => {
          console.log("Transacciones: ",transactions);          
          if (transactions.length > 0) {
            transactions.forEach(element => {
              this.transactionsFromPublicAccount.push(element);
            });
            this.showRecentTransaction = true;
          }
        },
        error => {
          console.log('dio error2....', error);
          this.transactionsFromPublicAccount = [];
          this.showRecentTransaction = false;
        }
      );
    }
  }
}
</script>