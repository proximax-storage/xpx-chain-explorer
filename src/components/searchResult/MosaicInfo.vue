<template>
  <div class="mosaicInfo animated fast fadeIn">
    <!-- <h1 class="supertitle">Mosaic Info</h1> -->
    <div class="mos-layout-up">
      <div>
        <div class="up">
          <div class="title">Name</div>
          <div class="valueLower">{{ detail.name || 'No Available' }}</div>
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

      <div>
        <div class="up">
          <div class="title">Active</div>
          <div class="value" style="color: orange; font-weight: bold" v-if="$store.state.currentBlock.height === 'Loading'">
            Loading
          </div>
          <div class="value" :style="($store.state.currentBlock.height >= detail.height.compact() + detail.duration.compact()) ? 'color: red' : 'color: green'" v-else>
            {{ ($store.state.currentBlock.height >= detail.height.compact() + detail.duration.compact()) ? false : true }}
          </div>
        </div>
        <div class="down">
          <div class="title">Expires</div>
          <div class="value">{{ `Block: ${detail.height.compact() + detail.duration.compact()}` }}</div>
        </div>
      </div>
    </div>

    <h1 class="supertitle center-text" style="margin-top: 10px">Mosaic Properties</h1>
    <div class="mos-layout-plus">
      <div>
        <div class="element" style="border-radius: 20px">
          <div class="title">Transferable</div>
          <div class="value" :style="(this.detail.properties.transferable === true) ? 'color: green' : 'color: red'">
            {{ this.detail.properties.transferable }}
          </div>
        </div>
        <div class="element" style="border-radius: 20px">
          <div class="title">Levy Mutable</div>
          <div class="value" :style="(this.detail.properties.levyMutable === true) ? 'color: green' : 'color: red'">
            {{ this.detail.properties.levyMutable }}
          </div>
        </div>
        <div class="element" style="border-radius: 20px">
          <div class="title">Supply Mutable</div>
          <div class="value" :style="(this.detail.properties.supplyMutable === true) ? 'color: green' : 'color: red'">
            {{ this.detail.properties.supplyMutable }}
          </div>
        </div>
        <div class="element" style="border-radius: 20px">
          <div class="title">Duration</div>
          <div class="value">
            {{ `(Block: ${this.detail.duration.compact()}) ${$utils.calculateDuration(this.detail.duration.compact())}` }}
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
    console.log('MosaicInfo', this.detail.toString())
  },
  methods: {
    goToAddress (address) {
      let routeData = (address.length === 64) ?
      this.$router.resolve({ path: `/result/publicKey/${ address }` }) :
      this.$router.resolve({ path: `/result/address/${ address }` })
      window.open(routeData.href, '_blank')
    },

    goToBlock (height) {
      let routeData = this.$router.resolve({ path: `/result/blockHeight/${ height }` })
      window.open(routeData.href, '_blank')
    },

    goToHash (hash) {
      let routeData = this.$router.resolve({ path: `/result/hash/${ hash }` })
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
  color: #2BA1B9
  padding: 0px 0px 5px 0px

.center-text
  text-align: center

.link:hover
  color: #2BA1B9
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

.down-radius
  background: #F4F4F4
  border-radius: $radius
  padding: 10px

.element
  background: #f4f4f4
  padding: 10px
  margin-bottom: 10px
  border: $radius !important

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

.valueLower
  font-size: 13px
  font-weight: normal
  word-break: break-all

.mosaicInfo
  padding: 10px
  color: black
  & > .mos-layout-up
    display: flex
    flex-flow: row
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
        flex-grow: 1
        margin: 0px
        margin-right: 5px
      &:nth-child(2n)
        flex-grow: 1
        margin: 0px
        margin: 0px 5px
      &:last-child
        flex-grow: 1
        margin: 0px
        margin-left: 5px
  & > .mos-layout-plus
    display: flex
    flex-flow: column nowrap

@media screen and (max-width: 700px)
  .value,
  .valueLower
    font-size: 13px

  .link
    color: #2BA1B9
    text-decoration: underline
    cursor: pointer

  .mosaicInfo
    & > .mos-layout-up
      flex-flow: column
      & > div
        flex-flow: column
        width: 100%
        &:first-child
          margin: 0px 0px 10px 0px
        &:last-child
          margin: 0px
    & > .mos-layout-down
      flex-flow: column
      & > div
        flex-flow: column
        width: 100%
        &:first-child
          margin: 0px 0px 10px 0px
        &:last-child
          margin: 0px

</style>
