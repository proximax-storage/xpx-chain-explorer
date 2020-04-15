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
          <p class="text-center ma-0">TxID / Hash</p>
          <p class="text-center ma-0">{{ this.hash }}</p>
          <p class="ma-0"><v-progress-linear v-if="load" class="mb-4" indeterminate/></p>
        </v-col>
      </v-row>

      <v-row v-if="hashInfo !== null">
        <v-col>
          <p class="text-break">{{ `Type: ${this.type} ${this.hashInfo.type}` }}</p>
          <p class="text-break">{{ `Signer: ${this.hashInfo.signer.address.pretty()}` }}</p>
          <p class="text-break" v-if="[undefined, null].includes(this.hashInfo.recipient) === false">
            {{ `Recipient: ${this.hashInfo.recipient.pretty()}` }}
          </p>
          <p class="text-break">{{ `Network Type: ${$provider.networkByNumber(this.hashInfo.networkType)} (${this.hashInfo.networkType})` }}</p>
          <p class="text-break">{{ `Hash: ${this.hashInfo.transactionInfo.hash}` }}</p>
        </v-col>
      </v-row>
    </div>

    <v-dialog v-model="dialog">
      <div class="white">
        <p class="ma-0 text-center">Inner Transaction - Type</p>
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
    dialog: true,
    type: null
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
