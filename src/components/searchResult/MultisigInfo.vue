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
      <div class="value">{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Multisig',
  props: {
    info: Object,
    cosignatories: Array,
    relatedAccount: Array
  },
  data () {
    return {
      cosignActive: false
    }
  },
  mounted () {
    console.log("Multisig", Array.from(this.info), this.cosignatories)
    this.cosignActive = (this.cosignatories.length > 0) ? true : false
  }
}
</script>

<style lang="sass" scoped>
$radius: 5px

.supertitle
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  margin: 0px
  font-size: 17px
  color: white
  padding: 0px 0px 5px 0px

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  margin: 0px

.value
  font-size: 10px
  font-weight: normal
  text-transform: uppercase
  word-break: break-all

.up
  padding: 10px
  background: #ddd
  border-radius: $radius $radius 0px 0px

.down
  padding: 10px
  border-radius: 0px 0px $radius $radius

.multisig
  // margin: 15px 10px
  padding: 10px
  background: #2d8e9b
  color: black
  & > .info
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    aling-items: center
    & > .left
      display: flex
      flex-flow: column nowrap
      background: #f4f4f4
      border-radius: $radius
      flex-grow: 2
      margin-rigth: 10px
    & > .right
      display: flex
      flex-flow: column nowrap
      background: #f4f4f4
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
  .multisig > .info
    flex-flow: column nowrap
    & > .left
      margin: 0px 0px 5px 0px
    & > .right
      margin: 5px 0px 0px 0px
</style>
