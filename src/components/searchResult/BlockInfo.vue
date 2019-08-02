<template>

  <!-- Block Info Component -->
  <div class="blockInfo animated fast fadeIn">

    <!-- Up Container -->
    <div class="bi-layout-up">

      <!-- Right -->
      <div>
        <div class="item">
          <div class="title">Validator</div>
          <div class="value link" @click="goToAddress(detail.publicKey)">{{ detail.publicKey }}</div>
        </div>
        <div class="item">
          <div class="title">Hash</div>
          <div class="value">{{ detail.hash }}</div>
        </div>
      </div>
      <!-- End Right -->

      <!-- Left -->
      <div>
        <div class="item">
          <div class="title">Timestamp</div>
          <div class="value">{{ detail.timestamp }}</div>
        </div>
        <div class="item">
          <div class="title">Difficulty</div>
          <div class="value">{{ detail.difficulty }}</div>
        </div>
      </div>
      <!-- End Left -->

    </div>
    <!-- End Up container -->

    <!-- Down Container -->
    <div class="bi-layout-down">

      <!-- Left -->
      <div class="layout-down-children">
        <div class="down-radius">
          <div class="title">Txs</div>
          <div class="value">{{ detail.txes }}</div>
        </div>
      </div>
      <!-- End Left -->

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
$radius: 20px

.supertitle
  margin: 0px
  font-size: 17px
  color: white
  padding: 0px 0px 5px 0px

.link:hover
  color: #2BA1B9
  text-decoration: underline
  cursor: pointer

.up
  background: #ddd
  border-radius: $radius $radius 0px 0px
  padding: 10px

.down
  background: #ddd
  border-radius: 0px 0px $radius $radius
  padding: 10px

.item
  background: #f4f4f4
  border-radius: $radius
  padding: 10px
  margin-top: 10px

.down-radius
  background: #f4f4f4
  border-radius: $radius
  padding: 10px

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  color: grey

.value
  font-size: 14px
  text-transform: uppercase
  word-wrap: break-word

.layout-down-children
  flex-grow: 1

.blockInfo
  // margin: 15px 10px
  padding: 10px
  color: black
  & > .bi-layout-up
    background: transparent
    margin-bottom: 10px
    display: flex
    flex-flow: row wrap
    justify-content: space-evenly
    & > div:first-child
      flex-grow: 2
      margin-right: 5px
      border-radius: $radius
    & > div:last-child
      flex-grow: 1
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
  .value,
  .valueLower
    font-size: 13px

  .link
    color: #2BA1B9
    text-decoration: underline
    cursor: pointer

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
