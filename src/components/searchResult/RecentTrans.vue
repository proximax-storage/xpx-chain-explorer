<template>

  <!-- Recent Transactions Component -->
  <div class="recent animated fast fadeIn">

    <!-- Title -->
    <h1 class="supertitle">{{ nameLabel }}</h1>

    <!-- Iterated Elements -->
    <div class="element" v-for="(item, index) in arrayTransactions" :key="index" :style="(index % 2 === 0) ? 'background: #f4f4f4' : 'background: white'" v-show="index >= 0 && index < limit + 1">

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
        <div class="title">Deadline</div>
        <div class="value">{{ item.deadline }}</div>
      </div>
      <!-- End Center -->

      <div class="el-right">
        <div class="viewIcon" @click="redirectToDetail(item)">
          <img :src="require('@/assets/info.svg')" alt="detail" style="width: 17px">
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
      default: 1000
    },
    arrayTransactions: Array,
    nameLabel: {
      type: String,
      default: 'Recent Transactions'
    }
  },
  data () {
    return {
      typeTransactions: proximaxProvider.typeTransactions(),
      mosaicRental: this.$store.state.rentalFeeInfo.mosaicRentalFee.address,
      namespaceRental: this.$store.state.rentalFeeInfo.namespaceRentalFee.address
    }
  },
  mounted () {
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

      let routeData = this.$router.resolve({ path: `/result/hash/${hash}` })
      window.open(routeData.href, '_blank')
    },

    goToAddress (address) {
      let routeData = this.$router.resolve({ path: `/result/address/${address}` })
      window.open(routeData.href, '_blank')
    },
    verifyType (item) {
      let name = null
      let objectOfTypes = Object.values(proximaxProvider.typeTransactions())
      objectOfTypes.forEach(element => {
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
$radius: 20px

.link:hover
  color: #2BA1B9
  text-decoration: underline
  cursor: pointer

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  color: grey
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
  transition: all ease .2s
  &:hover
    background: white
    box-shadow: 0px 0px 5px grey
    color: white

.balance
  color: black
  margin: 0px
  font-weight: bold
  font-size: 30px

.supertitle
  display: flex
  flex-flow: row nowrap
  justify-content: center
  margin: 0px
  font-size: 17px
  color: #2BA1B9
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
    border: 1px solid #f4f4f4e4
    & > .el-name
      flex-grow: 1
      font-size: 11px
      text-transform: uppercase
      display: flex
      flex-flow: row nowrap
      justify-content: center
      align-items: center
      color: #2BA1B9
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
  .link
    color: #2BA1B9
    text-decoration: underline
    cursor: pointer

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
