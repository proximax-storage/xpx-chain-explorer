<template>
  <div class="transaction">
    <div class="tran-layout-up">
      <div>
        <h1 class="supertitle">Transfer Transaction</h1>
        <div class="up">
          <div class="title">Sender</div>
          <div class="value">SFE551IK2M2IU8S82TGEI88DIQUE76CXGQIJ</div>
        </div>
        <div class="down">
          <div class="title">Recipient</div>
          <div class="value">SFE551IK2M2IU8S82TGEI88DIQUE76CXGQIJ</div>
        </div>
      </div>
      <div>
        <h1 class="supertitle" style="color: transparent">Timestamp</h1>
        <div class="up">
          <div class="title">Timestamp</div>
          <div class="value">hd6638hfgwuw872yhj4</div>
        </div>
        <div class="down">
          <div class="title">Block Height</div>
          <div class="value">SFE551IK2M2IU8S82TGEI88DIQUE76CXGQIJ</div>
        </div>
      </div>
    </div>
    <div class="tran-layout-middle">
      <h1 class="amount">Amount: <span>10000</span></h1>
      <p class="fee">Fee: <span>0.00</span></p>
    </div>
    <div class="tran-layout-down">
      <div class="layout-down-children">
        <div class="down-radius">
          <div class="title">Signature</div>
          <div class="value">SFE551IK2M2IU8S82TGEI88DIQUE76CXGQIJ</div>
        </div>
      </div>
      <div class="layout-down-children">
        <div class="down-radius">
          <div class="title">Message</div>
          <div class="value">SFE551IK2M2IU8S82TGEI88DIQUE76CXGQIJ</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Transaction'
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

.amount
  color: black
  margin: 0px
  font-weight: bold
  font-size: 30px
  text-transform: uppercase
  & > span
    font-weight: normal

.fee
  font-size: 10px
  margin: 0px
  font-weight: bold
  & > span
    font-weight: normal

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

.down-radius
  background: #F4F4F4
  border-radius: $radius
  padding: 10px

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
    flex-flow: row wrap
    justify-content: space-between
    align-items: center
    margin: 0px
    & > div:first-child
      margin-right: 5px
      flex-grow: 1
    & > div:last-child
      margin-left: 5px
      flex-grow: 1

@media screen and (max-width: 550px)
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
