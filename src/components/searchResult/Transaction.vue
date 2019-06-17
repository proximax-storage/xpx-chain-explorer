<template>
  <!-- Transaction Component -->
  <div class="transaction animated fast fadeIn">

    <!-- Up -->
    <div class="tran-layout-up">

      <!-- left -->
      <div>
        <h1 class="supertitle">{{ transactionType || 'Hash Transaction'}}</h1>
        <div class="up">
          <div class="title">Sender</div>
          <div class="value" style="cursor: pointer" @click="goToAddress(detail.signer.address.pretty())">
            {{ detail.signer.address.pretty() }}
          </div>
        </div>
        <div class="down">
          <div class="title">Recipient</div>
          <div class="value" v-if="detail.recipient" style="cursor: pointer" @click="goToAddress(detail.recipient.pretty())">
            {{ detail.recipient.pretty() }}
          </div>
          <div class="value" v-else>{{ 'No available' }}</div>
        </div>
      </div>
      <!-- End Left -->

      <!-- Right -->
      <div>
        <h1 class="supertitle" style="color: transparent">Timestamp</h1>
        <div class="up">
          <div class="title">Timestamp</div>
          <div class="value">{{ $utils.fmtTime(detail.deadline.value) }}</div>
        </div>
        <div class="down">
          <div class="title">Block Height</div>
          <div class="value">{{ detail.transactionInfo.height.compact() }}</div>
        </div>
      </div>
      <!-- End Right -->

    </div>
    <!-- End Up -->

    <!-- Center -->
    <div class="tran-layout-middle">
      <h1 class="amount" v-if="detail.amount">Amount: <span>{{ detail.amount || '0' }}</span></h1>
      <p class="fee">Fee: <span v-html="$utils.fmtAmountValue(detail.maxFee.compact())"></span></p>
    </div>
    <!-- End Center -->

    <!-- Down -->
    <div class="tran-layout-down">

      <!-- Up Element -->
      <div class="layout-down-children">
        <div class="down-radius">
          <div class="title">Signature</div>
          <div class="value">{{ detail.signature }}</div>
        </div>
      </div>
      <!-- End Up Element -->

      <!-- Down Element-->
      <div class="layout-down-children">
        <div class="down-radius">
          <div class="title">Hash</div>
          <div class="value">{{ detail.transactionInfo.hash }}</div>
        </div>
      </div>
      <!-- End Down Element-->

    </div>
    <!-- End Down -->

    <!-- Plus Area -->
    <div class="tran-layout-plus" v-if="plusInfo.length > 0">
      <!-- Name -->
      <h1 class="supertitle">Details</h1>

      <!-- Plus Container -->
      <div class="plus-cont">

        <!-- Amount / Delta -->
        <div class="layout-plus-children" v-if="detail.delta">
          <div class="title">Amount (Delta)</div>
          <div class="value" :style="(detail.direction === 1) ? 'color: green' : 'color: red'">
            {{ (detail.direction === 1) ? 'Increase: +' : 'Decrease: -' }}
            <span v-html="$utils.fmtAmountValue(this.detail.delta.compact())"></span>
          </div>
        </div>
        <!-- End Amount / Delta -->

        <!-- Iterated Element -->
        <div class="layout-plus-children" v-for="(item, index) in plusInfo" :key="index" :style="(index % 2 === 0) ? 'background: #DDDDDD' : 'background: #F4F4F4'" >
          <div class="title">{{ item.key }}</div>
          <div class="value">{{ item.value }}</div>
        </div>
        <!-- End Iterated Element -->

        <!-- Mosaic Properties Area -->
        <div class="layout-plus-children"  v-if="detail.mosaicProperties">
          <!-- Name -->
          <div class="title">Mosaic Properties</div>

          <!-- Properties Container -->
          <div class="value mosaic-properties">

            <span>
              Divisibility: <b>{{ detail.mosaicProperties.divisibility }}</b>
            </span>

            <span v-if="detail.mosaicProperties.supplyMutable">
              Supply Mutable: <b style="color: green">{{ detail.mosaicProperties.supplyMutable }} <mdb-icon icon="check"/></b>
            </span>

            <span v-if="!detail.mosaicProperties.supplyMutable">
              Supply Mutable: <b style="color: red">{{ detail.mosaicProperties.supplyMutable }} <mdb-icon icon="times"/></b>
            </span>

            <span v-if="detail.mosaicProperties.levyMutable">
              Levy Mutable: <b style="color: green">{{ detail.mosaicProperties.levyMutable }} <mdb-icon icon="check"/></b>
            </span>

            <span v-if="!detail.mosaicProperties.levyMutable">
              Levy Mutable: <b style="color: red">{{ detail.mosaicProperties.levyMutable }} <mdb-icon icon="times"/></b>
            </span>

            <span v-if="detail.mosaicProperties.transferable">
              Transferable: <b style="color: green">{{ detail.mosaicProperties.transferable }} <mdb-icon icon="check"/></b>
            </span>

            <span v-if="!detail.mosaicProperties.transferable">
              Transferable: <b style="color: red">{{ detail.mosaicProperties.transferable }} <mdb-icon icon="times"/></b>
            </span>

          </div>
          <!-- Properties Container -->

        </div>
        <!-- Mosaic Properties Area -->

      </div>
    </div>
    <!-- End Plus Area -->

    <!-- Cosignatures Component -->
    <cosignatures :params="detail.cosignatures"/>
    <!-- End Consignature Component -->

    <!-- Inner Transactions Component -->
    <inner-transactions :params="detail.innerTransactions" @runModal="infoReceiver"/>
    <!-- End Inner Transactions Component -->

  </div>
  <!-- End Transaction Component -->
</template>

<script>
import Cosignatures from '@/components/searchResult/Transaction.Cosignatures'
import InnerTransactions from '@/components/searchResult/Transaction.InnerTransactions'
import proximaxProvider from '@/services/proximaxProviders'
import { mdbIcon } from 'mdbvue'

export default {
  name: 'Transaction',
  props: {
    detail: Object
  },
  components: {
    mdbIcon,
    InnerTransactions,
    Cosignatures
  },
  data () {
    return {
      plusInfo: [],
      transactionType: 'Hash Transaction'
    }
  },

  /**
   * Mounted
   *
   * Call Verify Type and Verify Transaction Details
   */
  mounted () {
    this.verifyType()
    this.verifyTransactionDetails()
    // console.log("TRANSACTION", this.detail)
  },
  methods: {
    /**
     * Iterator
     *
     * This method iterates over the object received by parameter that
     * shows all the data it brings and pushes them in a local array
     */
    iterator (obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const element = obj[key];
          this.plusInfo.push({ key: key, value: element })
        }
      }
    },

    /**
     * Verify Type
     *
     * Verify the type of a transaction and change the name accordingly
     */
    verifyType () {
      let objectOfTypes = Object.values(proximaxProvider.typeTransactions())
      objectOfTypes.forEach(element => {
        // console.log(element.name)
        if (this.detail.type === element.id) {
          this.transactionType = element.name
        }
      })
    },

    /**
     * Verify Transaction Details
     *
     * This method verifies the type of transaction and builds
     * an appropriate object for the component
     */
    verifyTransactionDetails () {
      switch (this.transactionType) {
        case 'Transfer Transaction':
          this.plusInfo = [
            { key: 'Network Type', value: this.$proxProvider.getNetworkById(this.detail.networkType).name },
            { key: 'Version', value: this.detail.version },
            { key: 'Parent Id', value: (this.detail.parentId !== undefined) ? this.detail.parentId : 'No Available' },
            { key: 'Message', value: (this.detail.message.payload !== '') ? this.detail.message.payload : 'No Available' }
          ]
          //this.iterator(this.detail)
          break;
        case 'Register Namespace Transaction':
          this.plusInfo = [
            { key: 'Namespace Name', value: this.detail.namespaceName },
            { key: 'Namespace Id', value: this.detail.namespaceId.id.toHex() },
            { key: 'Network Type', value: this.$proxProvider.getNetworkById(this.detail.networkType).name },
            { key: 'Version', value: this.detail.version },
            { key: 'Parent Id', value: (this.detail.parentId !== undefined) ? this.detail.parentId : 'No Available' }
          ]
          // this.iterator(this.detail)
          break;
        case 'Mosaic definition':
          this.plusInfo = [
            { key: 'Mosaic Id', value: this.detail.mosaicId.id.toHex() },
            { key: 'Nonce', value: (this.detail.nonce !== undefined) ? this.detail.nonce : 'No Available' },
            { key: 'Network Type', value: this.$proxProvider.getNetworkById(this.detail.networkType).name },
            { key: 'Type', value: this.detail.type },
            { key: 'Version', value: this.detail.version }
          ]
          //this.iterator(this.detail)
          break;
        case 'Mosaic supply change':
          this.plusInfo = [
            { key: 'Mosaic Id', value: this.detail.mosaicId.id.toHex() },
            { key: 'Network Type', value: this.$proxProvider.getNetworkById(this.detail.networkType).name },
            { key: 'Type', value: this.detail.type },
            { key: 'Version', value: this.detail.version }
            // { key: 'Amount', value: this.$utils.fmtAmountValue(this.detail.delta.toHex()) },
            // { key: 'Direction', value: this.detail.direction },
          ]
          // this.iterator(this.detail)
          break;
        case 'Modify multisig account':
          this.iterator(this.detail)
          break;
        case 'Aggregate complete':
          // this.iterator(this.detail)
          break;
        case 'Aggregate bonded':
          // this.iterator(this.detail)
          break;
        case 'Lock':
          this.iterator(this.detail)
          break;
        case 'Secret lock':
          this.iterator(this.detail)
          break;
        case 'Secret proof':
          this.iterator(this.detail)
          break;
        case 'Mosaic Alias':
          this.plusInfo = [
            { key: 'Namespace Id', value: this.detail.namespaceId.id.toHex() },
            { key: 'Mosaic Id', value: this.detail.mosaicId.id.toHex() },
            { key: 'Action Type', value: (this.detail.actionType !== undefined) ? this.detail.actionType : 'No Available' },
            { key: 'Network Type', value: this.$proxProvider.getNetworkById(this.detail.networkType).name },
            { key: 'Type', value: this.detail.type },
            { key: 'Version', value: this.detail.version }
          ]
          // this.iterator(this.detail)
          break;
        case 'Address Alias':
          this.iterator(this.detail)
          break;
        case 'Modify Account Property Address':
          this.iterator(this.detail)
          break;
        case 'Modify Account Property Mosaic':
          this.iterator(this.detail)
          break;
        case 'Modify Account Entity Type':
          this.iterator(this.detail)
          break;
        case 'Link Account':
          this.iterator(this.detail)
          break;
        case 'Modify Account Metadata':
          this.iterator(this.detail)
          break;
        case 'Modify Mosaic Metadata':
          this.plusInfo = [
            { key: 'Modifications', value: this.detail.modifications },
            { key: 'Metadata Id', value: (this.detail.metadataId !== undefined) ? this.detail.metadataId : 'No Available' },
            { key: 'Metadata Type', value: (this.detail.metadataType !== undefined) ? this.detail.metadataType : 'No Available' },
            { key: 'Network Type', value: this.$proxProvider.getNetworkById(this.detail.networkType).name },
            { key: 'Type', value: this.detail.type },
            { key: 'Version', value: this.detail.version }
          ]
          // this.iterator(this.detail)
          break;
        case 'Modify Namespace Metadata':
          this.iterator(this.detail)
          break;
      }
    },

    /**
     * Pretty Convert
     *
     * Convert the element received by parameter to pretty format
     */
    goToAddress (address) {
      let routeData = this.$router.resolve({ path: `/searchResult/address/${address}` })
      window.open(routeData.href, '_blank')
    },

    infoReceiver (data, title) {
      console.log(data, title)

      this.$emit('runOpen', title)
      this.$emit('runPush', data)
    }
  }
}
</script>

<style lang="sass" scoped>
$radius: 5px

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase

.value
  font-size: 10px
  font-weight: normal
  text-transform: uppercase
  word-wrap: break-word
  &.mosaic-properties
    display: flex
    flex-flow: row wrap
    justify-content: space-around

.amount
  color: black
  margin: 0px
  font-weight: bold
  font-size: 30px
  text-transform: uppercase
  & > span
    font-weight: normal

.fee
  font-size: 15px
  margin: 0px
  font-weight: bold
  text-transform: uppercase
  & > span
    font-weight: normal

.supertitle
  margin: 0px
  font-size: 17px
  color: #7AB5E2
  padding: 0px 0px 5px 0px
  width: 100%

.up
  background: #DDDDDD
  border-radius: $radius $radius 0px 0px
  padding: 10px

.down
  background: #F4F4F4
  border-radius: 0px 0px $radius $radius
  padding: 10px

.down-radius
  background: #F4F4F4
  border-radius: $radius
  padding: 10px

.radius
  border-radius: $radius

.transaction
  margin: 15px 10px
  border: 1px solid #7ab5e280
  border-radius: $radius
  padding: 10px
  color: black
  & > .tran-layout-up
    background: transparent
    margin-bottom: 10px
    display: flex
    flex-flow: row wrap
    justify-content: space-evenly
    & > div:first-child
      flex-grow: 4
      margin-right: 5px
      border-radius: $radius
    & > div:last-child
      flex-grow: 1
      background: transparent
      margin-left: 5px
      border-radius: $radius
  & > .tran-layout-middle
    background:  #F4F4F4
    display: flex
    flex-flow: column wrap
    justify-content: center
    align-items: center
    border-radius: $radius
    padding: 10px
    margin-bottom: 10px
  & > .tran-layout-down
    display: flex
    flex-flow: column wrap
    justify-content: space-between
    align-items: center
    & > div:first-child
      margin-bottom: 10px
      width: 100%
      flex-grow: 1
    & > div:last-child
      margin-bottom: 0px
      width: 100%
      flex-grow: 1
  & > .tran-layout-plus
    margin-top: 10px
    display: flex
    flex-flow: column wrap
    box-sizing: border-box
    & > .plus-cont
      width: 100%
      background: #f4f4f4
      border-radius: $radius
      padding: 0px
      display: flex
      flex-flow: column wrap
      & > .layout-plus-children
        width: 100%
        padding: 10px
        box-sizing: border-box
        &:first-child
          border-radius: $radius $radius 0px 0px
        &:last-child
          border-radius: 0px 0px $radius $radius

@media screen and (max-width: 550px)
  .value
    font-size: 10px
    font-weight: normal
    text-transform: uppercase
    word-wrap: break-word
    &.mosaic-properties
      display: flex
      flex-flow: column
      justify-content: space-around

  .transaction
    & > .tran-layout-up
      background: transparent
      margin: 0px
      display: flex
      flex-flow: column wrap
      justify-content: space-evenly
      & > div:first-child
        flex-grow: 4
        margin: 0px 0px 10px 0px
        border-radius: $radius
      & > div:last-child
        flex-grow: 1
        background: transparent
        margin: 0px 0px 10px 0px
        border-radius: $radius
        & > .supertitle
          display: none
    & > .tran-layout-middle
      background:  #F4F4F4
      display: flex
      flex-flow: column wrap
      justify-content: center
      align-items: center
      border-radius: $radius
      padding: 10px
      margin: 0px 0px 10px 0px
    & > .tran-layout-down
      display: flex
      flex-flow: column wrap
      justify-content: space-between
      align-items: center
      margin: 0px
      & > div:first-child
        width: 100%
        margin: 0px 0px 10px 0px
      & > div:last-child
        width: 100%
        margin: 0px 0px 0px 0px
</style>
