<template>
  <!-- Public Key Component -->
  <div class="publicKey animated fast fadeIn">

    <!-- Down Container -->
    <div class="pk-layout-down">
      <h1 class="balance" v-html="formatBalance"></h1>
    </div>
    <!-- End Down Container -->

    <!-- Up Container -->
    <div class="pk-layout-up">

      <!-- Left -->
      <div>
        <h1 class="supertitle">Account Info</h1>
        <div class="up">
          <div class="title">Address</div>
          <div class="value link" @click="goToAddress(detail.address.pretty())">{{ detail.address.pretty() }}</div>
        </div>
        <div class="down">
          <div class="title">Public Key</div>
          <div class="value link" @click="goToAddress(detail.publicKey)">{{ detail.publicKey }}</div>
        </div>
      </div>
      <!-- End Left -->

      <!-- Right -->
      <div>
        <h1 class="supertitle">XPX Info</h1>
        <div class="up">
          <div class="title">Namespace Name</div>
          <div class="valueLower">PRX</div>
        </div>
        <div class="down">
          <div class="title">XPX Mosaic Id</div>
          <div class="value">{{ getId }}</div>
        </div>
      </div>
      <!-- End Right -->

    </div>
    <!-- End Up Container -->

  </div>
  <!-- End Public Key Component -->
</template>

<script>
import proximaxProvider from '@/services/proximaxProviders.js'

export default {
  name: 'PublicKey',
  data () {
    return {
      amount: 0
    }
  },
  props: {
    detail: Object
  },
  mounted () {
    console.log(this.detail)
  },
  computed: {
    /**
     * Get ID
     *
     * Return XPX Mosaic ID
     */
    getId () {
      return proximaxProvider.mosaicXpx()
    },

    /**
     * Get Balance
     *
     * This computed property obtains the balance depending on the mosaics that the component
     * receives by parameters, analyzing the xpx mosaic and printing its value
     */
    getBalance () {
      // console.log(this.detail.mosaics)
      let xpxMosaics = this.detail.mosaics.filter(el => el.id.id.toHex().toUpperCase() === proximaxProvider.mosaicXpx())
      // console.log(xpxMosaics)
      let amount
      if (xpxMosaics.length > 0) {
        amount = this.$utils.fmtAmountValue(xpxMosaics[0].amount.compact())
      } else {
        amount = this.$utils.fmtAmountValue(0)
      }
      return amount
    },

    /**
     * Format Balance
     *
     * return the balance in html format
     */
    formatBalance () {
      return `<div><span style="color: #2BA1B9">Balance:</span> ${ this.getBalance } XPX</div>`
    }
  },
  methods: {
    goToAddress (address) {
      let routeData = (address.length === 64) ?
      this.$router.resolve({ path: `/searchResult/publicKey/${ address }` }) :
      this.$router.resolve({ path: `/searchResult/address/${ address }` })
      window.open(routeData.href, '_blank')
    }
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

.value
  font-size: 14px
  font-weight: normal
  text-transform: uppercase
  word-wrap: break-word

.valueLower
  font-size: 14px
  font-weight: normal
  word-wrap: break-word

.balance
  color: black
  margin: 0px
  font-size: 30px

.supertitle
  color: #2BA1B9
  margin: 0px
  font-size: 17px
  padding: 0px 0px 5px 0px

.up
  background: #f4f4f4
  border-radius: $radius
  padding: 10px
  margin-bottom: 10px

.down
  background: #F4F4F4
  border-radius: $radius
  padding: 10px

.publicKey
  // margin: 15px 10px 0px 10px
  color: black
  & > .pk-layout-up
    padding: 10px
    background: transparent
    display: flex
    flex-flow: row wrap
    justify-content: space-evenly
    & > div
      margin: 10px
    & > div:first-child
      flex-grow: 4
      margin-right: 5px
      border-radius: $radius
    & > div:last-child
      flex-grow: 1
      background: transparent
      margin-left: 5px
      border-radius: $radius
  & > .pk-layout-down
    display: flex
    text-align: center
    flex-flow: row nowrap
    justify-content: center
    align-items: center
    margin: 0px
    padding: 10px
    border-bottom: 1px solid silver

@media screen and (max-width: 740px)
  .value,
  .valueLower
    font-size: 13px

  .link
    color: #2BA1B9
    text-decoration: underline
    cursor: pointer

  .publicKey
    & > .pk-layout-up
      flex-flow: column
      & > div:first-child
        margin: 0px 0px 10px 0px
      & > div:last-child
        margin: 0px 0px 10px 0px
</style>
