<template>
  <mdb-card class="card">
    <mdb-card-body>
      <div class="d-flex align-items-center" v-if="!showAccountInfo">
        <strong>Loading...</strong>
        <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
      </div>
      <div v-if="showError">
        <mdb-alert color="danger">
          {{msg}}
        </mdb-alert>
      </div>
      <div v-if="!showError && showAccountInfo">
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
          <mdb-row class="info green-back">
            <mdb-col sm="4" md="3"><span class="fs-08rem bold">XPX Balance::</span></mdb-col>
            <mdb-col sm="8" md="9"><span class="fs-08rem" v-html="mosaicXpx"></span></mdb-col>
          </mdb-row>
        </mdb-card-text>

        <br>

        <div class="d-flex align-items-center" v-if="!showInfoMosaic">
          <strong>Loading Owned Mosaics...</strong>
          <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
        </div>
        <div v-else class="row mt-3rem">
          <div class="col-6">
            <h4>Owned Mosaics</h4>
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
            <tr v-for="mosaic in accountInfo.mosaics" :key="mosaic">
              <td class="th-lg text-center">
                <span class="fs-08rem fw-bolder">{{mosaic.name}}</span>
              </td>
              <td class="th-lg text-center">
                <span class="fs-08rem fw-bolder" v-html="mosaic.amount"></span>
              </td>
            </tr>
            <tr v-if="accountInfo.mosaics.length === 0">
              <td class="th-lg text-center" colspan="2">
                <span>nothing to show</span>
              </td>
            </tr>
          </mdb-tbl-body>
        </mdb-tbl>
        </div>

        <!-- <mosaics-info :viewAmount="true" :mosaicsArray="mosaicsArray" ></mosaics-info> -->
        <div class="d-flex align-items-center" v-if="!showRecentTransaction">
          <strong>Loading Recent Transactions...</strong>
          <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
        </div>
        <br>
        <div class="row mt-3rem" v-if="showRecentTransaction && transactionsFromPublicAccount.length == 0">
          <div class="col-6">
            <h4>Recent transactions</h4>
            <h6>nothing to show</h6>
          </div>
        </div>
        <recent-transactions v-else-if="showRecentTransaction && transactionsFromPublicAccount.length > 0" :transactions='transactionsFromPublicAccount' :address='accountInfo.address.address' ></recent-transactions>
      </div>      
    </mdb-card-body>
  </mdb-card>
</template>
<script>
import proximaxProvider from '@/services/proximaxProvider'
import Utils from '@/services/Utils'
import { TransactionType, Address } from 'proximax-nem2-sdk'
import { mdbCard, mdbCardBody, mdbCardTitle, mdbCardText, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody, mdbAlert } from 'mdbvue'
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
    MosaicsInfo,
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    mdbAlert
  },
  data () {
    return {
      accountInfo: [],
      dataSelected: {},
      transactionsFromPublicAccount: [],
      showInfoMosaic: false,
      showAccountInfo: false,
      showRecentTransaction: false,
      showError: false,
      mosaicsArray: [],
      mosaicXpx: null,
      msg: ''
    }
  },
  created: function () {
    this.getInfoAccountAndViewTransactions(this.$route.params.address)
  },
  methods: {
    getInfoAccountAndViewTransactions: function(account) {
      const addr = Address.createFromRawAddress(account)
      const xpx = proximaxProvider.mosaicXpx()
      
      let suscripcion = _proximaxProvider.getAccountInfo(addr).subscribe(
        resp => {
          // Assign the response to accountInfo and show the account information
          this.accountInfo = resp
          
          // If your account information has tiles, look up your information and name to display them in the tile table
          if (this.accountInfo.mosaics.length > 0) {
            
            this.mosaicXpx = this.accountInfo.mosaics.filter(element => {
              return element.id.id.higher === xpx.id.higher && element.id.id.lower === xpx.id.lower
            })
            console.log("Este essss", this.mosaicXpx);

            this.mosaicXpx = Utils.fmtAmountValue(this.mosaicXpx[0].amount.compact())
            this.showAccountInfo = true

            this.accountInfo.mosaics = this.accountInfo.mosaics.filter(element => {
              return element.id.id.higher !== xpx.id.higher && element.id.id.lower !== xpx.id.lower
            })

            this.showInfoMosaic = (this.accountInfo.mosaics == 0 ) ? true : false

            this.accountInfo.mosaics.forEach((element, index) => {
              this.accountInfo.mosaics[index].amount = Utils.fmtAmountValue(element.amount.compact())
              this.buildMosaic(element, index)
            });            
          } else {
            this.mosaicXpx = Utils.fmtAmountValue(0)
            this.showInfoMosaic = true
            this.showAccountInfo = true
          }
          // Search all transactions in the public account and show the table of recent transactions
          this.viewTransactionsFromPublicAccount(this.accountInfo.publicAccount)
        },
        error => {
          this.msg = 'Communication error with the node!'
          this.showError = true
          this.showAccountInfo = true
        }
      )
    },


    /**
     * Search all transactions from the public account
     *
     * @param {any} publicAccount
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
    },

    /**
     * build a mosaic, obtaining mosaic information, name and format the amount.
     *
     * @param {any} infoBasicMosaic
     */
    buildMosaic: function(infoBasicMosaic, index) {
      // console.log('infoBasicMosaic', infoBasicMosaic);
      _proximaxProvider.getMosaicNameFromHex(infoBasicMosaic.id.toHex()).subscribe(
        rsp => {
          console.log('rsp', rsp);
          _proximaxProvider.namespaceHttp.getNamespacesName([rsp[0].namespaceId]).subscribe(
            namespaceName => {
              this.accountInfo.mosaics[index].name = `${namespaceName[0].name}:${rsp[0].name}`
              this.showInfoMosaic = (index == this.accountInfo.mosaics.length - 1) ? true : false
          })
        },
        err => {
          console.log('err', err);
        }
      )
    }
  }
}
</script>