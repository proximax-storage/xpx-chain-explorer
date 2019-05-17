<template>
  <div class="publicKey">
    <div class="pk-layout-up">
      <div>
        <h1 class="supertitle">Account Info</h1>
        <div class="up">
          <div class="title">Address</div>
          <div class="value">SFE551IK2M2IU8S82TGEI88DIQUE76CXGQIJ</div>
        </div>
        <div class="down">
          <div class="title">Public Key</div>
          <div class="value">SFE551IK2M2IU8S82TGEI88DIQUE76CXGQIJ</div>
        </div>
      </div>
      <div>
        <h1 class="supertitle">Owner Mosaic</h1>
        <div class="up">
          <div class="title">Id</div>
          <div class="value">hd6638hfgwuw872yhj4</div>
        </div>
        <div class="down">
          <div class="title">Quantity</div>
          <div class="value">SFE551IK2M2IU8S82TGEI88DIQUE76CXGQIJ</div>
        </div>
      </div>
    </div>
    <div class="pk-layout-down">
      <h1 class="balance">XPX BALANCE: XXXXXXXXXXX</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PublicKey'
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
</style>
