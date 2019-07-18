<template>
  <div class="mosaicInfo animated fast fadeIn">
    <h1 class="supertitle">Mosaic Info</h1>
    <div class="mos-layout-up">
      <div>
        <div class="up">
          <div class="title">Name</div>
          <div class="value">{{ detail.name || 'No Available' }}</div>
        </div>
        <div class="down">
          <div class="title">Mosaic Id</div>
          <div class="value">{{ detail.mosaicId.toHex() }}</div>
        </div>
      </div>
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
    </div>

    <div class="mos-layout-down">
      <div>
        <div class="up" v-if="detail.divisibility > 0">
          <div class="title">Supply</div>
          <div class="value" v-html="$utils.fmtDivisibility(detail.supply.compact(), detail.divisibility)"></div>
        </div>
        <div class="up" v-else>
          <div class="title">Supply</div>
          <div class="value" v-html="detail.supply.compact()"></div>
        </div>
        <div class="down">
          <div class="title">Divisibility</div>
          <div class="value">{{ detail.divisibility }}</div>
        </div>
      </div>
      <div>
        <div class="up">
          <div class="title">Height</div>
          <div class="value link" @click="goToBlock(detail.height.compact())">{{ detail.height.compact() }}</div>
        </div>
        <div class="down">
          <div class="title">Revision</div>
          <div class="value">{{ detail.revision }}</div>
        </div>
      </div>
    </div>

    <div class="mos-layout-plus" style="margin-top: 7px">
      <h1 class="supertitle">Mosaic Properties</h1>
      <div>
        <div class="element">
          <div class="title">Transferable</div>
          <div class="value" :style="(this.detail.properties.transferable === true) ? 'color: green' : 'color: red'">
            {{ this.detail.properties.transferable }}
          </div>
        </div>
        <div class="element">
          <div class="title">Levy Mutable</div>
          <div class="value" :style="(this.detail.properties.levyMutable === true) ? 'color: green' : 'color: red'">
            {{ this.detail.properties.levyMutable }}
          </div>
        </div>
        <div class="element">
          <div class="title">Supply Mutable</div>
          <div class="value" :style="(this.detail.properties.supplyMutable === true) ? 'color: green' : 'color: red'">
            {{ this.detail.properties.supplyMutable }}
          </div>
        </div>
        <div class="element">
          <div class="title">Duration</div>
          <div class="value">
            {{ $utils.calculateDuration(this.detail.duration.compact()) }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'MosaicInfo',
  props: {
    detail: Object
  },
  mounted () {
    console.log('MosaicInfo', this.detail)
  },
  methods: {
    goToAddress (address) {
      let routeData = (address.length === 64) ?
      this.$router.resolve({ path: `/searchResult/publicKey/${ address }` }) :
      this.$router.resolve({ path: `/searchResult/address/${ address }` })
      window.open(routeData.href, '_blank')
    },

    goToBlock (height) {
      let routeData = this.$router.resolve({ path: `/searchResult/blockHeight/${ height }` })
      window.open(routeData.href, '_blank')
    },

    goToHash (hash) {
      let routeData = this.$router.resolve({ path: `/searchResult/transactionHash/${ hash }` })
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

.element
  background: #f4f4f4
  padding: 10px
  &:first-child
    border-radius: $radius $radius 0px 0px
  &:last-child
    border-radius: 0px 0px $radius $radius
  &:nth-child(2n)
    background: #DDD

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase

.value
  font-size: 13px
  font-weight: normal
  text-transform: uppercase
  word-break: break-all

.mosaicInfo
  background: #2d8e9b
  padding: 10px
  color: black
  & > .mos-layout-up
    display: flex
    justify-content: space-between
    align-items: center
    & > div
      flex-grow: 1
      &:first-child
        margin-right: 5px
      &:last-child
        margin-left: 5px
  & > .mos-layout-down
    display: flex
    justify-content: space-between
    align-items: center
    padding-top: 10px
    & > div
      margin: 0px 5px
      &:first-child
        flex-grow: 3
        margin: 0px
        margin-right: 5px
      &:last-child
        flex-grow: 1
        margin: 0px
        margin-left: 5px
  & > .mos-layout-Plus
    display: flex
    justify-content: space-between
    align-items: center
    & > div
      margin: 0px 5px
      flex-grow: 1
      &:first-child
        border-radius: $radius $radius 0px 0px
        margin: 0px
        margin-right: 5px
      &:last-child
        border-radius: 0px 0px $radius $radius
        margin: 0px
        margin-left: 5px
</style>
