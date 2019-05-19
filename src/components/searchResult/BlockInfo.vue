<template>
  <div class="blockInfo">
    <div class="bi-layout-up">
      <div>
        <h1 class="supertitle">Block Info</h1>
        <div class="up">
          <div class="title">Height</div>
          <div class="value">SFE551IK2M2IU8S82TGEI88DIQUE76CXGQIJ</div>
        </div>
        <div class="down">
          <div class="title">Timestamp</div>
          <div class="value">SFE551IK2M2IU8S82TGEI88DIQUE76CXGQIJ</div>
        </div>
      </div>
      <div>
        <h1 class="supertitle" style="color: transparent">Harvester / Forger</h1>
        <div class="up">
          <div class="title">Harvester / Forger</div>
          <div class="value">hd6638hfgwuw872yhj4</div>
        </div>
        <div class="down">
          <div class="title">Hash</div>
          <div class="value">SFE551IK2M2IU8S82TGEI88DIQUE76CXGQIJ</div>
        </div>
      </div>
    </div>
    <div class="bi-layout-down">
      <div class="layout-down-children">
        <div class="down-radius">
          <div class="title">Difficulty</div>
          <div class="value">SFE551IK2M2IU8S82TGEI88DIQUE76CXGQIJ</div>
        </div>
      </div>
      <div class="layout-down-children">
        <div class="down-radius">
          <div class="title">Txes</div>
          <div class="value">SFE551IK2M2IU8S82TGEI88DIQUE76CXGQIJ</div>
        </div>
      </div>
      <div class="layout-down-children">
        <div class="down-radius">
          <div class="title">Fees</div>
          <div class="value">SFE551IK2M2IU8S82TGEI88DIQUE76CXGQIJ</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlockInfo'
}
</script>

<style lang="sass" scoped>
$radius: 5px

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

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase

.value
  font-size: 10px
  font-weight: normal
  text-transform: uppercase

.layout-down-children
  flex-grow: 1

.blockInfo
  margin: 15px 10px
  border: 1px solid #7ab5e280
  border-radius: $radius
  padding: 10px
  color: black
  & > .bi-layout-up
    background: transparent
    margin-bottom: 10px
    display: flex
    flex-flow: row wrap
    justify-content: space-evenly
    & > div:first-child
      flex-grow: 1
      margin-right: 5px
      border-radius: $radius
    & > div:last-child
      flex-grow: 4
      background: transparent
      margin-left: 5px
      border-radius: $radius
  & > .bi-layout-down
    display: flex
    flex-flow: row wrap
    justify-content: space-between
    align-items: center
    margin: 0px
    & > div:first-child
      margin-right: 5px
    & > div:nth-child(2)
      margin: 0px 5px
    & > div:last-child
      margin-left: 5px

@media screen and (max-width: 741px)
  .blockInfo
    & > .bi-layout-up
      flex-flow: column wrap
      justify-content: space-evenly
      margin: 0px
      & > div:first-child
        margin: 0px 0px 10px 0px
      & > div:last-child
        margin: 0px 0px 10px 0px
        & > .supertitle
          display: none
    & > .bi-layout-down
      flex-flow: column wrap
      margin: 0px
      justify-content: stretch
      & > div:first-child
        width: 100%
        margin: 0px 0px 10px 0px
      & > div:nth-child(2)
        width: 100%
        margin: 0px 0px 10px 0px
      & > div:last-child
        width: 100%
        margin: 0px 0px 0px 0px
</style>
