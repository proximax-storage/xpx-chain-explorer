<template>
  <mdb-card class="card">
    <mdb-card-body>
      <mdb-card-title>Account Info</mdb-card-title>
      <hr>
      <div v-if="showAccountInfo">
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

        <recent-transactions :transactions='transactionsFromPublicAccount' :publicKeyAddress='accountInfo.publicKey' ></recent-transactions>
      </div>      
    </mdb-card-body>
  </mdb-card>
</template>
<script>
import Service from '@/services/Service'
import { TransactionType, Address } from 'proximax-nem2-sdk'
import RecentTransactions from '@/components/explorer/views/RecentTransactions'
import { mdbCard, mdbCardBody, mdbCardTitle, mdbCardText, mdbRow, mdbCol } from 'mdbvue'

const _service = new Service()

export default {
  name: 'Account',
  components: {
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbRow,
    mdbCol,
    RecentTransactions
  },
  data () {
    this.getInfoAccountAndViewTransactions(this.$route.params.address)
    return {
      accountInfo: [],
      dataSelected: {},
      transactionsFromPublicAccount: [],
      showInfoMosaic: false,
      showAccountInfo: false,
      showRecentTransaction: false
    }
  },
  methods: {
    getInfoAccountAndViewTransactions: function(account) {
      let addr = Address.createFromRawAddress(account)
      console.log("esta es la direccion",addr);
      
      _service.getAccountInfo(addr).subscribe(
        resp => {
          // Assign the response to accountInfo and show the account information
          this.showAccountInfo = true
          this.accountInfo = resp

          // Search all transactions in the public account and show the table of recent transactions
          this.viewTransactionsFromPublicAccount(this.accountInfo['publicAccount'])

          // // If your account information has tiles, look up your information and name to display them in the tile table
          if (this.accountInfo['mosaics'].length > 0) {
            this.accountInfo['mosaics'].forEach(element => {
              this.buildMosaic(element)
            })
          }

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
      _service.getAllTransactionsFromAccount(publicAccount, 100).subscribe(
        transactions => {
          console.log("Transacciones: ",transactions);
          
          transactions.forEach(element => {
            if (element.type === TransactionType.TRANSFER) { element['isSigner'] = this.address === element['signer'].address['address']; }

          // Find the name of the mosaic of the transaction and consult the mosaic information.
            if (element['mosaics'] !== undefined && element['mosaics'] !== null) {
              if (element['mosaics'].length > 0) {
                element['mosaics'].forEach(mosaic => {
                  _service.getMosaic(mosaic.id).subscribe(
                    next => {
                      element['formattedAmount'] = _service.formatterAmount(mosaic.amount.compact(), next.divisibility);
                      this.transactionsFromPublicAccount.push(element);
                      this.showRecentTransaction = true;
                    }, error => {
                      console.log('dio error....', mosaic);
                    }
                  );
                });
              } else {
                this.transactionsFromPublicAccount.push(element);
                this.showRecentTransaction = true;
              }

            } else {
              this.transactionsFromPublicAccount.push(element);
              this.showRecentTransaction = true;
            }
          });

          // this.transactionsFromPublicAccount = transactions;
          // this.showRecentTransaction = true;
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
     * @memberof ExplorerAccountComponent
     */
    buildMosaic(infoBasicMosaic) {
      // console.log('infoBasicMosaic', infoBasicMosaic);
      _service.getMosaicNameFromHex(infoBasicMosaic.id.toHex()).subscribe(
        rsp => {
          console.log('rsp', rsp);
        },
        err => {
          console.log('err', err);
        }
      )
    }

  }
}
</script>

<style lang="scss" scoped>

  .info {
    padding: 10px;
  }

  .bold {
    font-weight: bold;
  }

  .green-back {
    background: #00968833;
  }
</style>


