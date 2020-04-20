<template>
  <div v-if="hashInfo !== null">
    <div class="pb-2">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Type</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ `${getType(hashInfo.type)} (${hashInfo.type})` }}</p>
    </div>

    <div class="pb-2">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Network Type</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">
        {{ `${$provider.networkByNumber(hashInfo.networkType)} (${hashInfo.networkType})` }}
      </p>
    </div>

    <div class="pb-2">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Height</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ hashInfo.transactionInfo.height.compact() }}</p>
    </div>

    <div class="pb-2">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Deadline</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ hashInfo.deadline.value }}</p>
    </div>

    <div class="pb-2">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Signature</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ hashInfo.signature }}</p>
    </div>

    <div class="pb-2">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Version</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ hashInfo.version }}</p>
    </div>

    <divider :title="'Details'"/>

    <div class="pb-2" v-if="[undefined, null].includes(hashInfo.signer) === false">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Signer</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ hashInfo.signer.address.pretty() }}</p>
    </div>

    <div class="pb-2" v-if="[undefined, null].includes(hashInfo.recipient) === false">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Recipient</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ hashInfo.recipient.pretty() }}</p>
    </div>

    <div class="pb-2" v-if="[undefined, null].includes(hashInfo.message) === false">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Message</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ (hashInfo.message.payload === '') ? 'Empty' : hashInfo.message.payload  }}</p>
    </div>

    <div class="pb-2" v-if="[undefined, null].includes(hashInfo.namespaceName) === false">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">NamespaceName</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ hashInfo.namespaceName }}</p>
    </div>

    <div class="pb-2" v-if="[undefined, null].includes(hashInfo.actionType) === false">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Action Type</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ (hashInfo.actionType === 0) ? 'Link' : 'Unlink' }}</p>
    </div>

    <div class="pb-2" v-if="[undefined, null].includes(hashInfo.mosaicId) === false">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">MosaicID</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ hashInfo.mosaicId.id.toHex().toUpperCase() }}</p>
    </div>

    <div class="pb-2" v-if="[undefined, null].includes(hashInfo.namespaceId) === false">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">NamespaceID</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ hashInfo.namespaceId.id.toHex().toUpperCase() }}</p>
    </div>

    <div class="pb-2" v-if="[undefined, null].includes(hashInfo.namespaceType) === false">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Namespace Type</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ (hashInfo.namespaceType === 0) ? 'Root' : 'Sub' }}</p>
    </div>

    <div class="pb-2" v-if="[undefined, null].includes(hashInfo.parentId) === false">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">ParentID</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ hashInfo.parentId.id.toHex().toUpperCase() }}</p>
    </div>

    <div class="pb-2" v-if="[undefined, null].includes(hashInfo.mosaics) === false">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Mosaics in Transaction</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ hashInfo.mosaics.length }}</p>
    </div>

    <div class="pb-2" v-if="[undefined, null].includes(hashInfo.delta) === false">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Amount (Delta)</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ hashInfo.delta.compact() }}</p>
    </div>

    <div class="pb-2" v-if="[undefined, null].includes(hashInfo.direction) === false">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Direction</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ (hashInfo.direction === 1) ? 'Increase' : 'Decrease' }}</p>
    </div>

    <div class="pb-2" v-if="[undefined, null].includes(hashInfo.duration) === false">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Duration</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ hashInfo.duration.compact() }}</p>
    </div>

    <div class="pb-2" v-if="[undefined, null].includes(hashInfo.mosaicProperties) === false">
      <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Mosaic Properties</p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">
        <span>Divisibility: </span>
        <span>{{ hashInfo.mosaicProperties.divisibility }}</span>
      </p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">
        <span>Transferable: </span>
        <span :class="(hashInfo.mosaicProperties.transferable === true) ? 'green--text' : 'red--text'">
          {{ (hashInfo.mosaicProperties.transferable === true) ? 'Yes' : 'No' }}
        </span>
      </p>
      <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">
        <span>Supply Mutable: </span>
        <span :class="(hashInfo.mosaicProperties.supplyMutable === true) ? 'green--text' : 'red--text'">
          {{ (hashInfo.mosaicProperties.supplyMutable === true) ? 'Yes' : 'No' }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { TransactionType } from 'tsjs-xpx-chain-sdk'

export default {
  name: 'Subtransaction',

  components: {
    divider: () => import('@/components/global/Divider')
  },

  props: {
    hashInfo: {
      type: Object,
      defautl: null
    }
  },

  methods: {
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
  }
}
</script>
