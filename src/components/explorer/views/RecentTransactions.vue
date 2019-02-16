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
        <tr v-for="(transaction, i) in transactions" :key="i" v-show="(pag - 1) * NUM_RESULTS <= i  && pag * NUM_RESULTS > i">
          <td class="th-lg text-center">
            <span class="fs-08rem fw-bolder">{{transaction.deadline.value.toString()}}</span>
          </td>
          <td class="font-size-08rem text-center th-lg">
            {{transaction.fee.compact()}}
          </td>
          <td class="font-size-08rem th-lg">
            <span class="font-size-08rem">
              <i v-if="transaction.type === typeTransfer"  style="padding-right: 10px;" :style="{'color': transaction.recipient.address === address ? 'green' : 'red' }" class="fa fa-send" aria-hidden="true"></i>
              <router-link target="_blank" :to="`/account-info/${transaction.signer.address['address']}`" class="text-link mouse-pointer">{{transaction.signer.address.pretty()}}</router-link>
            </span>
          </td>
          <td class="font-size-08rem th-lg" :class="{'text-center': transaction.type !== typeTransfer}">
            <div v-if="transaction.type === typeTransfer">
              <span class="font-size-08rem">
                <router-link target="_blank" :to="`/account-info/${transaction.recipient.address}`" class="text-link mouse-pointer">{{transaction.recipient.pretty()}}</router-link>
              </span>
            </div>
            <div v-else>
              ---
            </div>
          </td>
          <td class="font-size-08rem th-lg mouse-pointer text-center">
            <i style="font-size: 18px; color: #118a81;" class="fa fa-search-plus" @click="viewInfo(transaction); showModal = true" aria-hidden="true"></i>
          </td>
        </tr>
      </mdb-tbl-body>
    </mdb-tbl>
    <Pagination :quantity="transactions.length" :numResults="NUM_RESULTS" @changePage="changePage" />

    <modal size="lg" v-if="showModal" @close="showModal = false">
        <modal-header class="background-explorer text-white">
          <modal-title>Type {{typeTransaction[0].name}}</modal-title>
        </modal-header>
        <modal-body>
          <section>
            <type-transfer v-if="typeTransaction[0].id === arraTypeTransaction[0].id" :transactionSelected="transactionSelected" ></type-transfer>
            <type-register-namespace v-if="typeTransaction[0].id === arraTypeTransaction[1].id" :transactionSelected="transactionSelected" ></type-register-namespace>
            <type-mosaic-definition v-if="typeTransaction[0].id === arraTypeTransaction[2].id" :transactionSelected="transactionSelected" ></type-mosaic-definition>
            <type-mosaic-supply-change v-if="typeTransaction[0].id === arraTypeTransaction[3].id" :transactionSelected="transactionSelected" ></type-mosaic-supply-change>
            <type-modify-multisign v-if="typeTransaction[0].id === arraTypeTransaction[4].id" :transactionSelected="transactionSelected" ></type-modify-multisign>
          </section>
        </modal-body>
      </modal>
  </div>
</template>

<script>
import { mdbTbl, mdbTblHead, mdbTblBody, Modal, ModalHeader, ModalTitle, ModalBody, mdbRow, mdbCol } from 'mdbvue'
import { TransactionType } from 'proximax-nem2-sdk'
import Pagination from '@/components/shared/Pagination'
import TypeTransfer from '@/components/explorer/views/infoTransactions/TypeTransfer'
import TypeRegisterNamespace from '@/components/explorer/views/infoTransactions/TypeRegisterNamespace'
import TypeMosaicDefinition from '@/components/explorer/views/infoTransactions/TypeMosaicDefinition'
import TypeMosaicSupplyChange from '@/components/explorer/views/infoTransactions/TypeMosaicSupplyChange'
import TypeModifyMultisign from '@/components/explorer/views/infoTransactions/TypeModifyMultisign'

export default {
  name: 'RecentTransactions',
  props: {
    transactions: Array,
    address: String
  },
  components: {
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    Pagination,
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    mdbRow,
    mdbCol,
    TypeTransfer,
    TypeRegisterNamespace,
    TypeMosaicDefinition,
    TypeMosaicSupplyChange,
    TypeModifyMultisign
  },
  data () {
    console.log(this.transactions)

    return {
      headElements: ['Timestamp', 'Fee',  'Sender', 'Recipient', 'View more'],
      NUM_RESULTS: 5, // Numero de resultados por página
      pag: 1, // Página inicial
      showModal: false,
      typeTransaction: null,
      typeTransfer: TransactionType.TRANSFER,
      arraTypeTransaction: [
        {
          id: TransactionType.TRANSFER,
          name: 'Transfer'
        },
        {
          id: TransactionType.REGISTER_NAMESPACE,
          name: 'Register namespace'
        },
        {
          id: TransactionType.MOSAIC_DEFINITION,
          name: 'Mosaic definition'
        },
        {
          id: TransactionType.MOSAIC_SUPPLY_CHANGE,
          name: 'Mosaic supply change'
        },
        {
          id: TransactionType.MODIFY_MULTISIG_ACCOUNT,
          name: 'Modify multisig account'
        },
        {
          id: TransactionType.AGGREGATE_COMPLETE,
          name: 'Aggregate complete'
        },
        {
          id: TransactionType.AGGREGATE_BONDED,
          name: 'Aggregate bonded'
        },
        {
          id: TransactionType.LOCK,
          name: 'Lock'
        },
        {
          id: TransactionType.SECRET_LOCK,
          name: 'Secret lock'
        },
        {
          id: TransactionType.SECRET_PROOF,
          name: 'Secret proof'
        }
      ]
    }
  },
  methods: {
    changePage: function(event) {
      this.pag = event    
    },
    viewInfo: function(transaction) {
      this.typeTransaction = this.arraTypeTransaction.filter( element => element.id === transaction.type )
      this.transactionSelected = transaction
      console.log(this.arraTypeTransaction);
      
      console.log(this.typeTransaction);
      console.log(this.transactionSelected);
      
    }
  }

}
</script>
