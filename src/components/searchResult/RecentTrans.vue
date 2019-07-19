<template>

  <!-- Recent Transactions Component -->
  <div class="recent animated fast fadeIn">

    <!-- Title -->
    <h1 class="supertitle">{{ nameLabel }}</h1>

    <!-- Iterated Elements -->
    <div class="element" v-for="(item, index) in arrayTransactions" :key="index" :style="(index % 2 === 0) ? 'background: #DDD' : 'background: #f4f4f4'" v-show="index >= 0 && index < limit + 1">

      <div class="el-name value">{{ verifyType(item.type) }}</div>

      <!-- Left -->
      <div class="el-left">
        <h1 class="title alternate">Recipient / Sender</h1>
        <div>
          <figure>
            <img :src="require('@/assets/arrow-transaction-recipient-green.svg')" width="15">
          </figure>
          <div class="value link" @click="goToAddress(item.recipient.pretty())" v-if="item.recipient">{{ item.recipient.pretty() }}</div>
          <div class="value" v-else-if="item.type === typeTransactions.mosaicDefinition.id">
            {{ mosaicRental }}
          </div>
          <div class="value" v-else-if="item.type === typeTransactions.registerNamespace.id">
            {{ namespaceRental }}
          </div>
          <div class="value" v-else>No Available</div>
        </div>
        <div>
          <figure>
            <img :src="require('@/assets/arrow-transaction-sender-orange.svg')" width="15">
          </figure>
          <div class="value link" @click="goToAddress(item.signer.address.pretty())">{{ item.signer.address.pretty() }}</div>
        </div>
      </div>
      <!-- End Left -->

      <!-- Center -->
      <div class="el-middle">
        <div class="title">Timestamp</div>
        <div class="value">{{ item.deadline }}</div>
      </div>
      <!-- End Center -->

      <!-- Right -->
      <div class="el-middle">
        <div class="title">Fee</div>
        <div class="value" v-html="item.fee"></div>
      </div>
      <!-- End Right -->

      <div class="el-right">
        <div class="viewIcon" @click="redirectToDetail(item)">
          <mdb-icon far icon="eye"/>
        </div>
      </div>
    </div>
    <!-- End Iterated Elements -->

  </div>
  <!-- Recent Transaction Component -->
</template>

<script>
import proximaxProvider from '@/services/proximaxProviders.js'
import { mdbIcon } from 'mdbvue'

export default {
  name: 'RecentTrans',
  components: {
    mdbIcon
  },
  props: {
    limit: {
      required: false,
      type: Number,
      default: 50
    },
    arrayTransactions: Array,
    nameLabel: {
      type: String,
      default: 'Recent Transactions'
    }
  },
  data () {
    // console.log(proximaxProvider.typeTransactions())
    return {
      typeTransactions: proximaxProvider.typeTransactions(),
      mosaicRental: this.$store.state.rentalFeeInfo.mosaicRentalFee.address,
      namespaceRental: this.$store.state.rentalFeeInfo.namespaceRentalFee.address
    }
  },
  mounted () {
    // console.log(this.arrayTransactions)
    console.log(this.mosaicRental, this.namespaceRental)
  },
  methods: {
    /**
     * Redirect To Detail
     *
     * Execute the redirection action in detail in a new tab,
     * when the user clicks on one of the transactions listed
     */
    redirectToDetail (item) {
      let hash = item.transactionInfo.hash
      console.log(hash)

      let routeData = this.$router.resolve({ path: `/searchResult/transactionHash/${hash}` })
      window.open(routeData.href, '_blank')
    },

    goToAddress (address) {
      let routeData = this.$router.resolve({ path: `/searchResult/address/${address}` })
      window.open(routeData.href, '_blank')
    },
    verifyType (item) {
      let name = null
      console.log('verifyType')
      let objectOfTypes = Object.values(proximaxProvider.typeTransactions())
      objectOfTypes.forEach(element => {
        // console.log(element.name)
        if (item === element.id) {
          name = element.name
        }
      })

      return name
    },
  }
}
</script>

<style lang="sass" scoped>
$radius: 5px

.link:hover
  color: #2d8e9b
  text-decoration: underline
  cursor: pointer

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  margin: 0px

.value
  font-size: 14px
  font-weight: normal
  text-transform: uppercase
  text-align: center

.viewIcon
  font-size: 15px
  padding: 10px 30px
  margin: 5px
  border-radius: 5px
  border: 1px solid grey
  background: #cecece
  transition: all linear 0s
  &:hover
    background: #2d8e9b
    border: 1px solid #2d8e9b
    color: white

.balance
  color: black
  margin: 0px
  font-weight: bold
  font-size: 30px

.supertitle
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  margin: 0px
  font-size: 17px
  color: #2d8e9b
  padding: 0px 0px 5px 0px

.alternate
  display: none

.up
  background: #DDDDDD
  border-radius: $radius $radius 0px 0px
  padding: 10px

.down
  background: #F4F4F4
  border-radius: 0px 0px $radius $radius
  padding: 10px

.recent
  // margin: 15px 10px
  border-radius: $radius
  padding: 10px
  color: black
  & > .element
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    border-radius: $radius
    background: #f4f4f4
    margin: 5px 0px
    cursor: pointer
    border: 1px solid #dddddde4
    & > .el-name
      flex-grow: 1
      font-size: 11px
      text-transform: uppercase
      display: flex
      flex-flow: row nowrap
      justify-content: center
      align-items: center
      color: #2d8e9b
      font-weight: bold
      width: 200px
      padding: 5px
    & > .el-left
      flex-grow: 1
      display: flex
      flex-flow: column nowrap
      align-items: center
      padding: 5px
      border-radius: $radius 0px 0px $radius
      width: 450px
      & > div
        display: flex
        flex-flow: row nowrap
        align-items: center
        & > figure
          margin: 0px
          padding: 5px
        & > span
          font-size: 15px
    & > .el-middle
      flex-grow: 2
      display: flex
      flex-flow: column wrap
      align-items: center
      justify-content: center
      padding: 5px
    & > .el-right
      flex-grow: 2
      display: flex
      flex-flow: column wrap
      align-items: center
      justify-content: center
      border-radius: 0px $radius $radius 0px
      padding: 5px

@media screen and (max-width: 741px)
  .alternate
    display: block

  .recent > .element
    flex-flow: column
    & > .el-name
      width: 100%
    & > .el-left
      border-radius: $radius $radius 0px 0px
      padding: 5px
      width: initial
      // background: #00000020
      border-bottom: 1px solid #c0c0c090
    & > .el-middle
      border-radius: 0px
      padding: 5px
    & > .el-right
      // background: #00000020
      border-top: 1px solid #c0c0c090
      border-radius: 0px
      padding: 5px
      border-radius: 0px 0px $radius $radius
</style>
