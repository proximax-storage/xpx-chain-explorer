<template>
  <div v-if="transactions.length !== 0">
    <div class="row mt-3rem">
      <div class="col-6">
        <h4>Recent transactions</h4>
        <h6>Account transactions</h6>
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
        <tr v-for="(transaction, i) in transactions" :key="i">
          <td class="th-lg text-center" v-if="i+1 >= firstItemIndex && i < lastItemIndex">
            <span class="fs-08rem fw-bolder">{{transaction.deadline.value.toString()}}</span>
          </td>
          <td class="font-size-08rem text-center th-lg" v-if="i+1 >= firstItemIndex && i < lastItemIndex">
            <div v-if="transaction.mosaics !== undefined">
              {{transaction.formattedAmount}}
            </div>
            <div v-else>
              0
            </div>
          </td>
          <td class="font-size-08rem text-center th-lg" v-if="i+1 >= firstItemIndex && i < lastItemIndex">
            {{transaction.fee.compact()}}
          </td>
          <td class="font-size-08rem text-center th-lg" v-if="i+1 >= firstItemIndex && i < lastItemIndex">
            <span class="font-size-08rem">
              <i v-if="transaction.type === arraTypeTransaction.transfer.id"  style="padding-right: 10px;" :style="{'color': transaction.signer.publicKey === publicKeyAddress ? 'red' : 'green' }" class="fa fa-send" aria-hidden="true"></i>
              <a class="text-link mouse-pointer" target="_blank">{{transaction.signer.address.pretty()}}</a>
            </span>
          </td>
          <td class="font-size-08rem text-center th-lg" v-if="i+1 >= firstItemIndex && i < lastItemIndex">
            <div v-if="transaction.type === arraTypeTransaction.transfer.id">
              <span class="font-size-08rem">
                  <a class="text-link mouse-pointer" target="_blank">{{transaction.recipient.pretty()}}</a>
                </span>
            </div>
            <div v-else>
              ---
            </div>
          </td>
          <td class="font-size-08rem text-align-center th-lg mouse-pointer" v-if="i+1 >= firstItemIndex && i < lastItemIndex">
            <i style="font-size: 18px; color: #118a81;" class="fa fa-search-plus" aria-hidden="true"></i>
          </td>
        </tr>
      </mdb-tbl-body>
      <!-- <mdb-pagination circle>
        <mdb-page-item disabled>First</mdb-page-item>
        <mdb-page-nav prev disabled></mdb-page-nav>
        <mdb-page-item active>1</mdb-page-item>
        <mdb-page-item>2</mdb-page-item>
        <mdb-page-item>3</mdb-page-item>
        <mdb-page-item>4</mdb-page-item>
        <mdb-page-item>5</mdb-page-item>
        <mdb-page-nav next></mdb-page-nav>
        <mdb-page-item>Last</mdb-page-item>
      </mdb-pagination> -->
    </mdb-tbl>
  </div>
</template>

<script>
import { mdbTbl, mdbTblHead, mdbTblBody, mdbPagination, mdbPageItem, mdbPageNav } from 'mdbvue'
import { TransactionType } from 'proximax-nem2-sdk'
export default {
  name: 'RecentTransactions',
  props: {
    transactions: Array,
    publicKeyAddress: String
  },
  components: {
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    mdbPagination,
    mdbPageItem,
    mdbPageNav,
    mdbPageNav
  },
  data () {
    console.log(this.transactions)

    return {
      headElements: ['Timestamp', 'Amount', 'Fee',  'Sender', 'Recipient', 'View more'],
      firstItemIndex: 0,
      lastItemIndex: 10,
      arraTypeTransaction: {
        transfer: {
          id: TransactionType.TRANSFER,
          name: 'Transfer'
        },
        registerNameSpace: {
          id: TransactionType.REGISTER_NAMESPACE,
          name: 'Register namespace'
        },
        mosaicDefinition: {
          id: TransactionType.MOSAIC_DEFINITION,
          name: 'Mosaic definition'
        },
        mosaicSupplyChange: {
          id: TransactionType.MOSAIC_SUPPLY_CHANGE,
          name: 'Mosaic supply change'
        },
        modifyMultisigAccount: {
          id: TransactionType.MODIFY_MULTISIG_ACCOUNT,
          name: 'Modify multisig account'
        },
        aggregateComplete: {
          id: TransactionType.AGGREGATE_COMPLETE,
          name: 'Aggregate complete'
        },
        aggregateBonded: {
          id: TransactionType.AGGREGATE_BONDED,
          name: 'Aggregate bonded'
        },
        lock: {
          id: TransactionType.LOCK,
          name: 'Lock'
        },
        secretLock: {
          id: TransactionType.SECRET_LOCK,
          name: 'Secret lock'
        },
        secretProof: {
          id: TransactionType.SECRET_PROOF,
          name: 'Secret proof'
        }
      }
    }
  }

}
</script>
