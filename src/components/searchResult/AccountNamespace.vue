<template>
  <div class="linkedNamespace animated fast fadeIn" v-if="namespacesList && namespacesList.length > 0">
    <!-- <h1 class="supertitle">Namespaces</h1> -->
    <div class="guide">
      <div>
        <div class="title">Namespace Id</div>
      </div>

      <div>
        <div class="title">Namespace Name</div>
      </div>

      <div>
        <div class="title">Namespace Status</div>
      </div>
    </div>

    <div class="element" v-for="(item, index) in namespacesList" :key="index">
      <div>
        <div class="title">Namespace Id</div>
        <div class="value link" @click="goToNamespace(item.id)">{{ item.id }}</div>
      </div>

      <div>
        <div class="title">Namespace Name</div>
        <div class="valueLower">{{ (item.name === "") ? 'Unnamed' : item.name }}</div>
      </div>

      <div>
        <div class="title">Namespace Status</div>
        <div class="value">{{ item.status }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Id } from 'tsjs-xpx-catapult-sdk'

export default {
  props: {
    namespacesList: Array
  },
  data () {
    return {
      idsArr: []
    }
  },
  mounted () {
    console.log(this.namespacesList)
  },
  methods: {
    goToAddress (address) {
      let routeData = (address.length === 64) ?
      this.$router.resolve({ path: `/searchResult/publicKey/${ address }` }) :
      this.$router.resolve({ path: `/searchResult/address/${ address }` })
      window.open(routeData.href, '_blank')
    },

    goToBlock (height) {
      let routeData = this.$router.resolve({ path: `/searchResult/blockHeight/${height}` })
      window.open(routeData.href, '_blank')
    },

    goToHash (hash) {
      let routeData = this.$router.resolve({ path: `/searchResult/transactionHash/${hash}` })
      window.open(routeData.href, '_blank')
    },

    goToNamespace (namespaceId) {
      let routeData = this.$router.resolve({ path: `/searchResult/namespaceInfo/${namespaceId}` })
      window.open(routeData.href, '_blank')
    },

    goToMosaic (mosaicId) {
      let routeData = this.$router.resolve({ path: `/searchResult/mosaicInfo/${mosaicId}` })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="sass" scoped>
$radius: 5px

.supertitle
  display: flex
  flex-flow: row nowrap
  justify-content: center
  color: #2BA1B9
  margin: 0px
  font-size: 17px
  padding: 0px 0px 5px 0px

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  color: grey
  margin: 0px
  display: none

.value
  font-size: 14px
  font-weight: normal
  text-transform: uppercase
  word-break: break-all
  color: black

.valueLower
  font-size: 14px
  font-weight: normal
  word-break: break-all
  color: black

.link:hover
  color: #2BA1B9
  text-decoration: underline
  cursor: pointer

.linkedNamespace
  padding: 10px

.guide
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    aling-items: center
    border-radius: $radius
    background: #1a1a1a
    margin: 5px 0px
    padding: 10px
    cursor: pointer
    & > div
      width: 200px
      flex-grow: 1
      text-align: center
      & > .title
        display: block
        color: white !important

.element
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    aling-items: center
    border-radius: $radius
    background: #f4f4f4
    margin: 5px 0px
    padding: 10px
    cursor: pointer
    & > div
      width: 200px
      flex-grow: 1
      text-align: center

@media screen and (max-width: 490px)
  .title
    display: block

  .guide
    display: none

  .element
    flex-flow: column
    & > div
      width: 100%
      padding: 2px
      border-bottom: 1px solid #ddd
      &:last-child
        border-bottom: 0px solid white
</style>
