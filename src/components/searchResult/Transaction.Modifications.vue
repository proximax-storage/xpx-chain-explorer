<template>
  <div class="modif" v-if="visible">
    <h1 class="supertitle">Modifications</h1>
    <div v-if="type === 'Modify multisig account'">
      <div class="element" v-for="(item, index) in params" :key="index">
        <div style="padding: 2px">
          <div class="title">Address</div>
          <div class="value link" @click="goToAddress(item.cosignatoryPublicAccount.address.pretty())">
            {{ item.cosignatoryPublicAccount.address.pretty() }}
          </div>
        </div>

        <div style="padding: 2px">
          <div class="title">Public Key</div>
          <div class="value link" @click="goToAddress(item.cosignatoryPublicAccount.publicKey)">
            {{ item.cosignatoryPublicAccount.publicKey }}
          </div>
        </div>

        <div style="padding: 2px">
          <div class="title">Type</div>
          <div class="value">{{ (item.type == 0) ? 'Add' : 'Remove' }}</div>
        </div>
      </div>
    </div>
    <div v-else-if="type === 'Modify Asset Metadata'">
      <div class="element" v-for="(item, index) in params" :key="index">
        <div style="padding: 2px">
          <div class="title">Key</div>
          <div class="value">{{ item.key }}</div>
        </div>

        <div style="padding: 2px">
          <div class="title">Value</div>
          <div class="value">{{ item.value }}</div>
        </div>

        <div style="padding: 2px">
          <div class="title">Type</div>
          <div class="value">{{ item.type }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    params: Array,
    type: null
  },
  data () {
    return {
      arrFiltered: [],
      visible: false
    }
  },
  mounted () {
    if (this.params && this.params.length !== 0) {
      this.visible = true
    }
  },
  methods: {
     goToAddress (address) {
      let routeData = this.$router.resolve({ path: `/result/address/${address}` })
      window.open(routeData.href, '_blank')
    },

    goToBlock (height) {
      let routeData = this.$router.resolve({ path: `/result/blockHeight/${height}` })
      window.open(routeData.href, '_blank')
    },

    goToHash (hash) {
      let routeData = this.$router.resolve({ path: `/result/hash/${hash}` })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="sass" scoped>
$radius: 5px

.supertitle
  margin: 10px 0px 0px 0px
  font-size: 17px
  color: #2d819b
  padding: 5px 0px
  width: 100%

.modif
  padding: 10px

.element
  padding: 10px
  margin-bottom: 10px
  font-size: 10px
  cursor: pointer
  background: #f4f4f4
  border-radius: $radius
  &:last-child
    margin: 0px

.title
  font-size: 10px
  font-weight: bold
  text-transform: uppercase
  color: grey

.value
  font-size: 14px
  text-transform: uppercase
  word-break: break-all
  color: black

.link:hover
  color: #2d8e9b
  text-decoration: underline
  cursor: pointer

@media screen and (max-width: 700px)
  .value,
  .valueLower
    font-size: 13px

  .link
    color: #2d819b
    text-decoration: underline
    cursor: pointer
</style>
