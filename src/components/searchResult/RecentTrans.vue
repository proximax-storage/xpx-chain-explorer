<template>

  <!-- Recent Transactions Component -->
  <div class="recent animated fast fadeIn">

    <!-- Title -->
    <h1 class="supertitle">{{ nameLabel }}</h1>

    <!-- Iterated Elements -->
    <div class="element" v-for="(item, index) in arrayTransactions" :key="index" :style="(index % 2 === 0) ? 'background: #DDD' : 'background: #f4f4f4'" v-show="index >= 0 && index < limit + 1" @click="redirectToDetail(item)">

      <!-- Left -->
      <div class="el-left">
        <h1 class="title alternate">Recipient / Sender</h1>
        <div>
          <figure>
            <img :src="require('@/assets/arrow-transaction-recipient-green.svg')" width="15">
          </figure>
          <div class="value" v-if="item.recipient">{{ item.recipient.pretty() }}</div>
          <div class="value" v-else-if="item.type === typeTransactions.mosaicDefinition.id">New Mosaic</div>
          <div class="value" v-else-if="item.type === typeTransactions.mosaicSupplyChange.id">New Mosaic Supply</div>
          <div class="value" v-else-if="item.type === typeTransactions.registerNamespace.id">Root NS</div>
          <div class="value" v-else-if="item.type === typeTransactions.mosaicAlias.id">Mosaic Alias</div>
        </div>
        <div>
          <figure>
            <img :src="require('@/assets/arrow-transaction-sender-orange.svg')" width="15">
          </figure>
          <div class="value">{{ item.signer.address.pretty() }}</div>
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
      <div class="el-right">
        <div class="title">Fee</div>
        <div class="value" v-html="item.fee"></div>
      </div>
      <!-- End Right -->

    </div>
    <!-- End Iterated Elements -->

  </div>
  <!-- Recent Transaction Component -->
</template>

<script>
import proximaxProvider from '@/services/proximaxProviders.js'

export default {
  name: 'RecentTrans',
  props: {
    limit: {
      required: false,
      type: Number,
      default: 50
    },
    arrayTransactions: Array,
    nameLabel: {
      type: String,
      default: 'Recent Transaction'
    }
  },
  data () {
    // console.log(proximaxProvider.typeTransactions())
    return {
      typeTransactions: proximaxProvider.typeTransactions()
    }
  },
  mounted () {
    // console.log(this.arrayTransactions)
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
  margin: 0px

.value
  font-size: 10px
  font-weight: normal
  text-transform: uppercase

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
  color: #7AB5E2
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
  margin: 15px 10px
  border: 1px solid #7ab5e280
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
    & > .el-left
      flex-grow: 1
      display: flex
      flex-flow: column nowrap
      align-items: center
      padding: 5px
      border-radius: $radius 0px 0px $radius
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
    & > .el-right
      flex-grow: 2
      display: flex
      flex-flow: column wrap
      align-items: center
      justify-content: center
      border-radius: 0px $radius $radius 0px

@media screen and (max-width: 741px)
  .alternate
    display: block

  .recent > .element
    flex-flow: column
    & > .el-left
      border-radius: $radius $radius 0px 0px
      padding: 5px
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
