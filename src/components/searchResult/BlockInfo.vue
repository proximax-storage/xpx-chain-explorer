<template>

  <!-- Block Info Component -->
  <div class="blockInfo animated fast fadeIn">

    <!-- Up Container -->
    <div class="bi-layout-up">

      <!-- Left -->
      <div>
        <h1 class="supertitle">Block Info</h1>
        <div class="up">
          <div class="title">Height</div>
          <div class="value">{{ detail.height }}</div>
        </div>
        <div class="down">
          <div class="title">Timestamp</div>
          <div class="value">{{ detail.timestamp }}</div>
        </div>
      </div>
      <!-- End Left -->

      <!-- Right -->
      <div>
        <h1 class="supertitle" style="color: transparent">Harvester / Forger</h1>
        <div class="up">
          <div class="title">Harvester / Forger</div>
          <div class="value link" @click="goToAddress(detail.publicKey)">{{ detail.publicKey }}</div>
        </div>
        <div class="down">
          <div class="title">Hash</div>
          <div class="value">{{ detail.hash }}</div>
        </div>
      </div>
      <!-- End Right -->

    </div>
    <!-- End Up container -->

    <!-- Down Container -->
    <div class="bi-layout-down">
      <!-- Left -->
      <div class="layout-down-children">
        <div class="down-radius">
          <div class="title">Difficulty</div>
          <div class="value">{{ detail.difficulty }}</div>
        </div>
      </div>
      <!-- End Left -->

      <!-- Center -->
      <div class="layout-down-children">
        <div class="down-radius" style="background: #ddd">
          <div class="title">Txes</div>
          <div class="value">{{ detail.txes }}</div>
        </div>
      </div>
      <!-- End Center -->

      <!-- Right -->
      <div class="layout-down-children">
        <div class="down-radius">
          <div class="title">Fees</div>
          <div class="value" v-html="detail.fee"></div>
        </div>
      </div>
      <!-- End Right -->

    </div>
    <!-- End Down Container -->
  </div>
</template>

<script>
export default {
  name: 'BlockInfo',
  props: {
    detail: Object
  },

  methods: {
    goToAddress (address) {
      let routeData = this.$router.resolve({ path: `/searchResult/address/${ address }` })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="sass" scoped>
$radius: 5px

.supertitle
  margin: 0px
  font-size: 17px
  color: white
  padding: 0px 0px 5px 0px

.link:hover
  color: #2d8e9b
  text-decoration: underline
  cursor: pointer

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
  word-wrap: break-word

.layout-down-children
  flex-grow: 1

.blockInfo
  // margin: 15px 10px
  background: #2d8e9b
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
        width: 100%
        margin: 0px 0px 10px 0px
      & > div:last-child
        width: 100%
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
