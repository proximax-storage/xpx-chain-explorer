<template>
  <div>
    <v-alert outlined color="grey lighten-2" border="top" xs="12" sm="12" md="8" lg="8">
      <v-row>
        <v-col>
          <div>
            <p class="text-center mb-2">
              <v-icon class="blue pa-3" dark style="border-radius: 50%">mdi-pound-box</v-icon>
            </p>
          </div>
          <p class="text-center ma-0 font-weight-bold primary--text">TxID / Hash</p>
          <p class="text-center ma-0 font-weight-bold primary--text text-break">{{ hash }}</p>
          <p class="ma-0"><v-progress-linear v-if="load" class="mb-4" indeterminate/></p>
        </v-col>
      </v-row>

      <subtrans :hashInfo="hashInfo"/>

      <p v-if="this.type === 'Add Exchange Offer'" class="ma-0 font-weight-medium">Offers</p>
      <v-simple-table v-if="this.type === 'Add Exchange Offer'">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Index</th>
              <th class="text-left">MosaicID</th>
              <th class="text-left">Mosaic Amount</th>
              <th class="text-left">Cost</th>
              <th class="text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in hashInfo.offers" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.mosaicId.id.toHex() }}</td>
              <td>{{ item.mosaicAmount.compact() }}</td>
              <td>{{ item.cost.compact() }}</td>
              <td>{{ item.duration.compact() }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-row v-if="[undefined, null].includes(hashInfo) === false && [undefined, null].includes(hashInfo.innerTransactions) === false">
        <v-col>
          <divider :title="'Inner Transactions'"/>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Index</th>
                  <th class="text-left">Type</th>
                  <th class="text-left">Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in hashInfo.innerTransactions" :key="index" @click="openModal(index)">
                  <td>{{ index + 1 }}</td>
                  <td>{{ getType(item.type) }}</td>
                  <td>{{ $utils.fmtAmount(item.maxFee.compact(), 6) }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-alert>

    <v-dialog v-model="dialog">
      <div class="white pa-4">
        <div class="d-flex justify-space-between align-center pb-4">
          <h1 class="title">Inner Transaction</h1>
        </div>
        <subtrans :hashInfo="modalTrans"/>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { TransactionType } from 'tsjs-xpx-chain-sdk'

export default {
  name: 'Hash',

  components: {
    divider: () => import('@/components/global/Divider'),
    subtrans: () => import('@/components/Hash/Subtransaction')
  },

  data: () => ({
    hash: null,
    hashInfo: null,
    load: false,
    dialog: false,
    type: null,
    selectedItem: null,
    modalTrans: null
  }),

  mounted () {
    this.hash = this.$route.params.hash
    this.transactionInfo(this.hash)
  },

  methods: {
    async transactionInfo (hash) {
      this.load = true
      try {
        const transaction = await this.$provider.transactionHttp.getTransaction(hash).toPromise()
        this.hashInfo = transaction
        this.load = false
      } catch (error) {
        console.log(error)
        this.load = false
      }
    },

    showInner (item) {
      this.selectedItem = item
      this.dialog = true
    },

    openModal (index) {
      this.modalTrans = this.hashInfo.innerTransactions[index]
      this.dialog = true
    },

    getType (type) {
      let tmpType
      switch (type) {
        case TransactionType.TRANSFER:
          tmpType = 'Transfer'
          break

        case TransactionType.REGISTER_NAMESPACE:
          tmpType = 'Register Namespace'
          break

        case TransactionType.ADDRESS_ALIAS:
          tmpType = 'Address Alias'
          break

        case TransactionType.MOSAIC_ALIAS:
          tmpType = 'Mosaic Alias'
          break

        case TransactionType.MOSAIC_DEFINITION:
          tmpType = 'Mosaic Definicion'
          break

        case TransactionType.MOSAIC_SUPPLY_CHANGE:
          tmpType = 'Mosaic Supply Change'
          break

        case TransactionType.MODIFY_MULTISIG_ACCOUNT:
          tmpType = 'Modify Multisig Account'
          break

        case TransactionType.AGGREGATE_COMPLETE:
          tmpType = 'Aggregate Complete'
          break

        case TransactionType.AGGREGATE_BONDED:
          tmpType = 'Aggregate Bonded'
          break

        case TransactionType.LOCK:
          tmpType = 'Lock'
          break

        case TransactionType.SECRET_LOCK:
          tmpType = 'Secret Lock'
          break

        case TransactionType.SECRET_PROOF:
          tmpType = 'Secret Proof'
          break

        case TransactionType.MODIFY_ACCOUNT_RESTRICTION_ADDRESS:
          tmpType = 'Modify Account Restriction Address'
          break

        case TransactionType.MODIFY_ACCOUNT_RESTRICTION_MOSAIC:
          tmpType = 'Modify Account Restriction Mosaic'
          break

        case TransactionType.MODIFY_ACCOUNT_RESTRICTION_OPERATION:
          tmpType = 'Modify Account Restriction Operation'
          break

        case TransactionType.LINK_ACCOUNT:
          tmpType = 'Link Account'
          break

        case TransactionType.MODIFY_ACCOUNT_METADATA:
          tmpType = 'Modify Account Metadata'
          break

        case TransactionType.MODIFY_MOSAIC_METADATA:
          tmpType = 'Modify Mosaic Metadata'
          break

        case TransactionType.MODIFY_CONTRACT:
          tmpType = 'Modify Contract'
          break

        case TransactionType.CHAIN_UPGRADE:
          tmpType = 'Chain Upgrade'
          break

        case TransactionType.CHAIN_CONFIGURE:
          tmpType = 'Chain Configure'
          break
        case TransactionType.ADD_EXCHANGE_OFFER:
          tmpType = 'Add Exchange Offer'
          break

        case TransactionType.EXCHANGE_OFFER:
          tmpType = 'Exchange Offer'
          break

        case TransactionType.REMOVE_EXCHANGE_OFFER:
          tmpType = 'Remove Exchange Offer'
          break
      }

      return tmpType
    }
  },

  watch: {
    hashInfo (nv, ov) {
      switch (nv.type) {
        // datos listo
        case TransactionType.TRANSFER:
          console.log('TRANSFER', nv)
          this.type = 'Transfer'
          break

          // datos listo
        case TransactionType.REGISTER_NAMESPACE:
          console.log('REGISTER_NAMESPACE', nv)
          this.type = 'Register Namespace'
          break

          // datos listo
        case TransactionType.ADDRESS_ALIAS:
          console.log('ADDRESS_ALIAS', nv)
          this.type = 'Address Alias'
          break

          // datos listo
        case TransactionType.MOSAIC_ALIAS:
          console.log('MOSAIC_ALIAS', nv)
          this.type = 'Mosaic Alias'
          break

          // datos listo
        case TransactionType.MOSAIC_DEFINITION:
          console.log('MOSAIC_DEFINITION', nv)
          this.type = 'Mosaic Definicion'
          break

        // datos listo
        case TransactionType.MOSAIC_SUPPLY_CHANGE:
          console.log('MOSAIC_SUPPLY_CHANGE', nv)
          this.type = 'Mosaic Supply Change'
          break

        case TransactionType.MODIFY_MULTISIG_ACCOUNT:
          console.log('MODIFY_MULTISIG_ACCOUNT', nv)
          this.type = 'Modify Multisig Account'
          break

        case TransactionType.AGGREGATE_COMPLETE:
          console.log('AGGREGATE_COMPLETE', nv)
          this.type = 'Aggregate Complete'
          break

        case TransactionType.AGGREGATE_BONDED:
          console.log('AGGREGATE_BONDED', nv)
          this.type = 'Aggregate Bonded'
          break

        // datos listo
        case TransactionType.LOCK:
          console.log('LOCK', nv)
          this.type = 'Lock'
          break

        case TransactionType.SECRET_LOCK:
          console.log('SECRET_LOCK', nv)
          this.type = 'Secret Lock'
          break

        case TransactionType.SECRET_PROOF:
          console.log('SECRET_PROOF', nv)
          this.type = 'Secret Proof'
          break

        case TransactionType.MODIFY_ACCOUNT_RESTRICTION_ADDRESS:
          console.log('MODIFY_ACCOUNT_RESTRICTION_ADDRESS', nv)
          this.type = 'Modify Account Restriction Address'
          break

        case TransactionType.MODIFY_ACCOUNT_RESTRICTION_MOSAIC:
          console.log('MODIFY_ACCOUNT_RESTRICTION_MOSAIC', nv)
          this.type = 'Modify Account Restriction Mosaic'
          break

        case TransactionType.MODIFY_ACCOUNT_RESTRICTION_OPERATION:
          console.log('MODIFY_ACCOUNT_RESTRICTION_OPERATION', nv)
          this.type = 'Modify Account Restriction Operation'
          break

        case TransactionType.LINK_ACCOUNT:
          console.log('LINK_ACCOUNT', nv)
          this.type = 'Link Account'
          break

        case TransactionType.MODIFY_ACCOUNT_METADATA:
          console.log('MODIFY_ACCOUNT_METADATA', nv)
          this.type = 'Modify Account Metadata'
          break

        case TransactionType.MODIFY_MOSAIC_METADATA:
          console.log('MODIFY_MOSAIC_METADATA', nv)
          this.type = 'Modify Mosaic Metadata'
          break

        case TransactionType.MODIFY_CONTRACT:
          console.log('MODIFY_CONTRACT', nv)
          this.type = 'Modify Contract'
          break

        case TransactionType.CHAIN_UPGRADE:
          console.log('CHAIN_UPGRADE', nv)
          this.type = 'Chain Upgrade'
          break

        case TransactionType.CHAIN_CONFIGURE:
          console.log('CHAIN_CONFIGURE', nv)
          this.type = 'Chain Configure'
          break

        // datos listo
        case TransactionType.ADD_EXCHANGE_OFFER:
          console.log('ADD_EXCHANGE_OFFER', nv)
          this.type = 'Add Exchange Offer'
          break

        case TransactionType.EXCHANGE_OFFER:
          console.log('EXCHANGE_OFFER', nv)
          this.type = 'Exchange Offer'
          break

        case TransactionType.REMOVE_EXCHANGE_OFFER:
          console.log('REMOVE_EXCHANGE_OFFER', nv)
          this.type = 'Remove Exchange Offer'
          break

        default:
          console.log('ANY', nv)
          break
      }
    }
  }
}
</script>
