<template>
  <div>
    <div class="blue lighten-5">
      <v-row>
        <v-col>
          <div>
            <p class="text-center mb-2">
              <v-icon class="blue pa-3" dark style="border-radius: 50%">mdi-pound-box</v-icon>
            </p>
          </div>
          <p class="text-center ma-0 font-weight-medium">TxID / Hash</p>
          <p class="text-center ma-0 font-weight-medium">{{ hash }}</p>
          <p class="ma-0"><v-progress-linear v-if="load" class="mb-4" indeterminate/></p>
        </v-col>
      </v-row>

      <v-row v-if="hashInfo !== null">
        <v-col>
          <v-row>
            <v-col class="blue--text" xs="12" sm="12" md="4">Type</v-col>
            <v-col class="text-break" xs="12" sm="12" md="8">{{ `${type} ${hashInfo.type}` }}</v-col>
          </v-row>

          <v-row v-if="[undefined, null].includes(hashInfo.signer) === false">
            <v-col class="blue--text" xs="12" sm="12" md="4">Signer</v-col>
            <v-col class="text-break" xs="12" sm="12" md="8">{{ hashInfo.signer.address.pretty() }}</v-col>
          </v-row>

          <v-row v-if="[undefined, null].includes(hashInfo.recipient) === false">
            <v-col class="blue--text" xs="12" sm="12" md="4">Recipient</v-col>
            <v-col class="text-break" xs="12" sm="12" md="8">{{ hashInfo.recipient.pretty() }}</v-col>
          </v-row>

          <v-row v-if="[undefined, null].includes(hashInfo.message) === false">
            <v-col class="blue--text" xs="12" sm="12" md="4">Message</v-col>
            <v-col class="text-break" xs="12" sm="12" md="8">{{ (hashInfo.message.payload === '') ? 'Empty' : hashInfo.message.payload  }}</v-col>
          </v-row>

          <v-row v-if="[undefined, null].includes(hashInfo.namespaceName) === false">
            <v-col class="blue--text" xs="12" sm="12" md="4">NamespaceName</v-col>
            <v-col class="text-break" xs="12" sm="12" md="8">{{ hashInfo.namespaceName }}</v-col>
          </v-row>

          <v-row v-if="[undefined, null].includes(hashInfo.actionType) === false">
            <v-col class="blue--text" xs="12" sm="12" md="4">Action Type</v-col>
            <v-col class="text-break" xs="12" sm="12" md="8">{{ (hashInfo.actionType === 0) ? 'Link' : 'Unlink' }}</v-col>
          </v-row>

          <v-row v-if="[undefined, null].includes(hashInfo.mosaicId) === false">
            <v-col class="blue--text" xs="12" sm="12" md="4">MosaicID</v-col>
            <v-col class="text-break" xs="12" sm="12" md="8">{{ hashInfo.mosaicId.id.toHex().toUpperCase() }}</v-col>
          </v-row>

          <v-row v-if="[undefined, null].includes(hashInfo.namespaceId) === false">
            <v-col class="blue--text" xs="12" sm="12" md="4">NamespaceID</v-col>
            <v-col class="text-break" xs="12" sm="12" md="8">{{ hashInfo.namespaceId.id.toHex().toUpperCase() }}</v-col>
          </v-row>

          <v-row v-if="[undefined, null].includes(hashInfo.namespaceType) === false">
            <v-col class="blue--text" xs="12" sm="12" md="4">Namespace Type</v-col>
            <v-col class="text-break" xs="12" sm="12" md="8">{{ (hashInfo.namespaceType === 0) ? 'Root' : 'Sub' }}</v-col>
          </v-row>

          <v-row v-if="[undefined, null].includes(hashInfo.parentId) === false">
            <v-col class="blue--text" xs="12" sm="12" md="4">ParentID</v-col>
            <v-col class="text-break" xs="12" sm="12" md="8">{{ hashInfo.parentId.id.toHex().toUpperCase() }}</v-col>
          </v-row>

          <v-row>
            <v-col class="blue--text" xs="12" sm="12" md="4">Height</v-col>
            <v-col class="text-break" xs="12" sm="12" md="8">{{ hashInfo.transactionInfo.height.compact() }}</v-col>
          </v-row>

          <v-row v-if="[undefined, null].includes(hashInfo.mosaics) === false">
            <v-col class="blue--text" xs="12" sm="12" md="4">Mosaics in Transaction</v-col>
            <v-col class="text-break" xs="12" sm="12" md="8">{{ hashInfo.mosaics.length }}</v-col>
          </v-row>

          <v-row>
            <v-col class="blue--text" xs="12" sm="12" md="4">Network Type</v-col>
            <v-col class="text-break" xs="12" sm="12" md="8">
              {{ `${$provider.networkByNumber(hashInfo.networkType)} (${hashInfo.networkType})` }}
            </v-col>
          </v-row>

          <v-row>
            <v-col class="blue--text" xs="12" sm="12" md="4">Deadline</v-col>
            <v-col class="text-break" xs="12" sm="12" md="8">{{ hashInfo.deadline.value }}</v-col>
          </v-row>

          <v-row>
            <v-col class="blue--text" xs="12" sm="12" md="4">Signature</v-col>
            <v-col class="text-break" xs="12" sm="12" md="8">{{ hashInfo.signature }}</v-col>
          </v-row>

          <v-row>
            <v-col class="blue--text" xs="12" sm="12" md="4">Version</v-col>
            <v-col class="text-break" xs="12" sm="12" md="8">{{ hashInfo.version }}</v-col>
          </v-row>
        </v-col>
      </v-row>

      <p class="ma-0 font-weight-medium">Offers</p>
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
          <p class="ma-0 font-weight-medium">Inner Transaction</p>
          <p v-for="(item, index) in hashInfo.innerTransactions" :key="index" @click="showInner(item)">
            {{ item.type }} | {{ item.signer.address.pretty() }}
          </p>
        </v-col>
      </v-row>
    </div>

    <v-dialog v-model="dialog">
      <div class="white">
        <p class="ma-0 text-center text-break">Inner Transaction - Type</p>
        <p class="ma-0 text-break">{{ selectedItem }}</p>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { TransactionType } from 'tsjs-xpx-chain-sdk'

export default {
  name: 'Hash',

  data: () => ({
    hash: null,
    hashInfo: null,
    load: false,
    dialog: false,
    type: null,
    selectedItem: null
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
        console.log(transaction)
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
    }
  },

  watch: {
    hashInfo (nv, ov) {
      switch (nv.type) {
        case TransactionType.TRANSFER:
          console.log('TRANSFER', nv)
          this.type = 'Transfer'
          break

        case TransactionType.REGISTER_NAMESPACE:
          console.log('REGISTER_NAMESPACE', nv)
          this.type = 'Register Namespace'
          break

        case TransactionType.ADDRESS_ALIAS:
          console.log('ADDRESS_ALIAS', nv)
          this.type = 'Address Alias'
          break

        case TransactionType.MOSAIC_ALIAS:
          console.log('MOSAIC_ALIAS', nv)
          this.type = 'Mosaic Alias'
          break

        case TransactionType.MOSAIC_DEFINITION:
          console.log('MOSAIC_DEFINITION', nv)
          this.type = 'Mosaic Definicion'
          break

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
