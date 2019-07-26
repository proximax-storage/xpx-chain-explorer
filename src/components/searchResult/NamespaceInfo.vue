<template>
  <div class="namespaceInfo animated fast fadeIn">
    <h1 class="supertitle">Namespace Info</h1>

    <div class="nam-layout-up">
      <div>
        <div class="up">
          <div class="title">Owner Address</div>
          <div class="value link" @click="goToAddress(detail.owner.address.pretty())">{{ detail.owner.address.pretty() }}</div>
        </div>
        <div class="down">
          <div class="title">Owner Public Key</div>
          <div class="value link" @click="goToAddress(detail.owner.publicKey)">{{ detail.owner.publicKey }}</div>
        </div>
      </div>
      <div>
        <div class="up">
          <div class="title">Name</div>
          <div class="value">{{ detail.name || 'No Available' }}</div>
        </div>
        <div class="down">
          <div class="title">Namespace Id</div>
          <div class="value">{{ detail.id.toHex() }}</div>
        </div>
      </div>
    </div>

    <div class="nam-layout-down">
      <div>
        <div class="up">
          <div class="title">Start Height</div>
          <div class="value link" @click="goToBlock(detail.startHeight.compact())">{{ detail.startHeight.compact() }}</div>
        </div>
        <div class="down">
          <div class="title">End Height</div>
          <div class="value">
            {{ (typeof detail.endHeight.compact() === 'number') ? detail.endHeight.compact() : parseInt(detail.endHeight.toHex(), 16) }}
          </div>
        </div>
      </div>
      <div>
        <div class="up">
          <div class="title">Parent Id</div>
          <div class="value">{{ detail.parentId.toHex() }}</div>
        </div>
        <div class="down">
          <div class="title">Depth</div>
          <div class="value">{{ detail.depth }}</div>
        </div>
      </div>
      <div v-if="detail.levels.lenght !== 0">
        <div class="up">
          <div class="title">Levels</div>
          <div class="value">{{ detail.levels.length }}</div>
        </div>
        <div class="down">
          <div class="title">Type</div>
          <div class="value">{{ (detail.type === 0) ? 'Root' : 'Sub' }}</div>
        </div>
      </div>
    </div>

    <h1 class="supertitle center-text">Alias</h1>
    <div class="nam-layout-plus" v-if="detail.alias.mosaicId !== undefined">
      <div>
        <div class="up">
          <div class="title">Mosaic Id</div>
          <div class="value link" @click="goToMosaic(getId(detail.alias.mosaicId).toHex())">
            {{ getId(detail.alias.mosaicId).toHex() }}
          </div>
        </div>
        <div class="down">
          <div class="title">Type</div>
          <div class="value">{{ detail.alias.type }}</div>
        </div>
      </div>
    </div>

    <h1 class="supertitle center-text">Levels</h1>
    <div class="nam-layout-plus" v-if="arrayLevels.lenght !== 0">
      <div v-for="(item, index) in arrayLevels" :key="index">
        <div class="up">
          <div class="title">Namespace Id</div>
          <div class="value link" @click="goToNamespace(item.id.toHex())">{{ item.id.toHex() }}</div>
        </div>
        <div class="down">
          <div class="title">Name</div>
          <div class="value">{{ item.name }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Id } from 'tsjs-xpx-catapult-sdk'

export default {
  name: 'NamespaceInfo',
  props: {
    detail: Object
  },
  data () {
    return {
      arrayLevels: []
    }
  },
  mounted () {
    this.getMosaicName()
  },
  methods: {
    getId (id) {
      let idfull = new Id(id)
      return idfull
    },
    getMosaicName () {
      let tmpArr = Array.from(this.detail.levels)
      tmpArr.forEach(el => el.name = 'No Available')
      tmpArr.forEach((el, index) => {
        this.$proxProvider.getNamespacesName([el.id]).subscribe(
          nameResponse => {
            if (nameResponse.length === 1) {
              el.name = nameResponse[0].name
              nameResponse = nameResponse.reverse()
              console.log("Name Response", nameResponse)
              el.name = nameResponse[0].name
            } else if (nameResponse.length === 2) {
              nameResponse = nameResponse.reverse()
              console.log("Name Response", nameResponse)
              el.name = `${nameResponse[0].name}.${nameResponse[1].name}`
            } else if (nameResponse.length === 3) {
              nameResponse = nameResponse.reverse()
              console.log("Name Response", nameResponse)
              el.name = `${nameResponse[0].name}.${nameResponse[1].name}.${nameResponse[2].name}`
            }

            if (tmpArr.length === index + 1) {
              this.arrayLevels = tmpArr
            }
          }
        )
      })
    },
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
$radius: 20px

.supertitle
  margin: 0px
  font-size: 17px
  color: #2d819b
  padding: 0px 0px 5px 0px

.center-text
  text-align: center

.link:hover
  color: #2d819b
  text-decoration: underline
  cursor: pointer

.up
  background: #f4f4f4
  border-radius: $radius
  padding: 10px
  margin-bottom: 10px

.down
  background: #F4F4F4
  border-radius: $radius
  padding: 10px
  margin: 0px 0px 10px 0px

.down-radius
  background: #F4F4F4
  border-radius: $radius
  padding: 10px

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  color: grey

.value
  font-size: 13px
  font-weight: normal
  text-transform: uppercase
  word-break: break-all

.namespaceInfo
  padding: 10px
  color: black
  & > .nam-layout-up
    display: flex
    justify-content: space-between
    align-items: center
    & > div
      flex-grow: 1
      &:first-child
        margin-right: 5px
      &:last-child
        margin-left: 5px
  & > .nam-layout-down
    display: flex
    justify-content: space-between
    align-items: center
    padding-top: 10px
    & > div
      margin: 0px 5px
      flex-grow: 1
      &:first-child
        margin: 0px
        margin-right: 5px
      &:last-child
        margin: 0px
        margin-left: 5px
  & > .nam-layout-plus
    display: block
    width: 100%
    margin-bottom: 10px
    & > div
      display: flex
      width: 100%
      margin-bottom: 10px
      background: #f4f4f4
      border-radius: 20px
      & > div
        flex-grow: 1
        &.up
          min-width: 300px
          text-align: center
          margin: 0px 5px 0px 0px
        &.down
          min-width: 300px
          text-align: center
          margin: 0px 0px 0px 5px
</style>
