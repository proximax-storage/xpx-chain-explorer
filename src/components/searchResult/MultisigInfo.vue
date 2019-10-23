<template>
  <div class="multisig animated fast fadeIn">
    <h1 class="supertitle">Multisig Account Info</h1>
    <div class="info">
      <div class="left" v-if="!info.minRemoval > 0 && !info.minApproval > 0">
        <div class="up">
          <div class="title">Address</div>
          <div class="value">{{ info.account }}</div>
        </div>
        <div class="down">
          <div class="title">Account Address</div>
          <div class="value">{{ info.accountAddress }}</div>
        </div>
      </div>
      <div class="right" v-if="info.minRemoval > 0 && info.minApproval > 0">
        <div class="up">
          <div class="title">Minimal Removal</div>
          <div class="value">{{ info.minRemoval }}</div>
        </div>
        <div class="down">
          <div class="title">Minimal Approval</div>
          <div class="value">{{ info.minApproval }}</div>
        </div>
      </div>
    </div>
    <h1 class="supertitle" v-show="cosignatories.length > 0" style="padding-top: 10px">Cosignatories</h1>
    <div class="element" v-show="cosignatories.length > 0" v-for="(item, index) in cosignatories" :key="index + 'cosignatories'">
      <div class="title">Cosigner {{ index + 1 }}: </div>
      <div class="value">{{ item }}</div>
    </div>
    <h1 class="supertitle" v-show="relatedAccount.length > 0" style="padding-top: 10px">Related Multisig Account</h1>
    <div class="element" v-show="relatedAccount.length > 0" v-for="(item, index) in relatedAccount" :key="index + 'relatedAccount'">
      <div class="title">Account {{ index + 1 }}: </div>
      <div class="value link" @click="goToAddress(item)">{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Multisig',
  props: {
    info: Object,
    cosignatories: Array,
    relatedAccount: Array,
    multisigConsignatories: Array,

  },
  data () {
    return {
      cosignActive: false
    }
  },
  mounted () {
    this.cosignActive = (this.cosignatories.length > 0) ? true : false
  },
  methods: {
    goToAddress (address) {
      let routeData = this.$router.resolve({ path: `/result/address/${address}` })
      window.open(routeData.href, '_blank')
    },

    goToBlock (height) {
      let routeData = this.$router.resolve({ path: `/result/blockHeight/${height}` })
      window.open(routeData.href, '_blank')
    },

    goToHash (hash) {
      let routeData = this.$router.resolve({ path: `/result/hash/${hash}` })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="sass" scoped>
$radius: 20px

.supertitle
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  margin: 0px
  font-size: 17px
  color: #2BA1B9
  padding: 0px 0px 5px 0px

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  margin: 0px
  color: grey

.value
  font-size: 14px
  font-weight: normal
  text-transform: uppercase
  word-break: break-all

.link:hover
  color: #2BA1B9
  text-decoration: underline
  cursor: pointer

.up
  padding: 10px
  background: #f4f4f4
  border-radius: $radius
  margin-bottom: 10px

.down
  background: #f4f4f4
  padding: 10px
  border-radius: $radius

.multisig
  // margin: 15px 10px
  padding: 10px
  color: black
  & > .info
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    aling-items: center
    & > .left
      display: flex
      flex-flow: column nowrap
      border-radius: $radius
      flex-grow: 2
      margin-rigth: 10px
    & > .right
      display: flex
      flex-flow: column nowrap
      border-radius: $radius
      flex-grow: 1
  & > .element
    display: flex
    flex-flow: column nowrap
    justify-content: space-between
    aling-items: center
    border-radius: $radius
    background: #f4f4f4
    margin: 5px 0px
    padding: 10px

@media screen and (max-width: 595px)
  .value,
  .valueLower
    font-size: 13px

  .link
    color: #2BA1B9
    text-decoration: underline
    cursor: pointer

  .multisig > .info
    flex-flow: column nowrap
    & > .left
      margin: 0px 0px 5px 0px
    & > .right
      margin: 5px 0px 0px 0px
</style>
