<template>
  <div class="publicKey">
    <div class="pk-layout-up">
      <div>
        <h1 class="supertitle">Account Info</h1>
        <div class="up">
          <div class="title">Address</div>
          <div class="value">{{ detail.address.pretty() }}</div>
        </div>
        <div class="down">
          <div class="title">Public Key</div>
          <div class="value">{{ detail.publicKey }}</div>
        </div>
      </div>
      <div>
        <h1 class="supertitle">Owner Mosaic</h1>
        <div class="up">
          <div class="title">Id</div>
          <div class="value">{{ getId }}</div>
        </div>
        <div class="down">
          <div class="title" style="opacity: 0">Amount</div>
          <div class="value" style="opacity: 0">0</div>
        </div>
      </div>
    </div>
    <div class="pk-layout-down">
      <h1 class="balance" v-html="formatBalance"></h1>
    </div>
  </div>
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
  computed: {
    getId () {
      return proximaxProvider.mosaicXpx()
    },
    getBalance () {
      // console.log(this.detail.mosaics)
      let xpxMosaics = this.detail.mosaics.filter(el => el.id.id.toHex().toUpperCase() === proximaxProvider.mosaicXpx())
      console.log(xpxMosaics)
      let amount
      if (xpxMosaics.length > 0) {
        amount = this.$utils.fmtAmountValue(xpxMosaics[0].amount.compact())
      } else {
        amount = this.$utils.fmtAmountValue(0)
      }
      console.log(amount)
      // console.log(this.detail.mosaics)
      // this.detail.mosaics.forEach((el, index) => {
        //   console.log("AQUIII", el.amount.compact(), el.id.id.toHex())
      //   console.log(typeof el.id.id.toHex().toUpperCase(), typeof proximaxProvider.mosaicXpx())
      //   console.log(el.id.id.toHex().toUpperCase() === proximaxProvider.mosaicXpx())
      //   if (el.id.id.toHex().toUpperCase() == proximaxProvider.mosaicXpx()) {
        //     console.log("entro aqui")
      //     this.amount = el.amount.compact()
      //     console.log(this.$utils.fmtAmountValue(amount))
      //     this.amount = this.$utils.fmtAmountValue(amount)
      //   } else {
        //     this.amount = this.$utils.fmtAmountValue(0)
      //   }
      // })

      // return this.amount
      // let item = this.detail.mosaics.filter(el => el.id.id)
      // console.log(item)
      return amount
    },
    formatBalance () {
      return `<div>XPX BALANCE: ${ this.getBalance }</div>`
    }
  },
  props: {
    detail: Object
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

.balance
  color: black
  margin: 0px
  font-weight: bold
  font-size: 30px

.supertitle
  margin: 0px
  font-size: 17px
  color: #7AB5E2
  padding: 0px 0px 5px 0px

.up
  background: #DDDDDD
  border-radius: $radius $radius 0px 0px
  padding: 10px

.down
  background: #F4F4F4
  border-radius: 0px 0px $radius $radius
  padding: 10px

.publicKey
  margin: 15px 10px
  border: 1px solid #7ab5e280
  border-radius: $radius
  padding: 10px
  color: black
  & > .pk-layout-up
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
  & > .pk-layout-down
    background:  #F4F4F4
    display: flex
    flex-flow: row nowrap
    justify-content: center
    align-items: center
    border-radius: $radius
    padding: 10px
    margin: 0px

@media screen and (max-width: 550px)
  .publicKey
    & > .pk-layout-up
      flex-flow: column
      & > div:first-child
        margin: 0px 0px 10px 0px
      & > div:last-child
        margin: 0px 0px 10px 0px
</style>
