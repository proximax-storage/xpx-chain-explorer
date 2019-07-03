<template>
  <!-- Cosignatures Components -->
  <div class="tran-layout-plus animated fast fadeIn" v-if="visible">
    <!-- Name -->
    <h1 class="supertitle">Cosignatures</h1>

    <!-- Iterated Elements -->
    <div>
      <div class="element" v-for="(item, index) in params" :key="index" style="border-radius: 5px" :style="(index % 2 === 0) ? 'background: #DDDDDD' : 'background: #F4F4F4'" >

        <div>
          <div class="title">Signature</div>
          <div class="value">{{ item.signature }}</div>
        </div>

        <div>
          <div class="title">Signer</div>
          <div class="value">Address:
            <span class="link" @click="goToAddress(item.signer.address.pretty())">{{ item.signer.address.pretty() }}</span>
          </div>
          <div class="value">Public Key:
            <span class="link" @click="goToAddress(item.signer.publicKey)">{{ item.signer.publicKey }}</span>
          </div>
        </div>

      </div>
    </div>
    <!-- End Iterated Elements -->

  </div>
  <!-- Cosignatures Component -->
</template>

<script>
export default {
  name: 'Cosignatures',
  props: {
    params: Array
  },
  data () {
    return {
      visible: false
    }
  },
  mounted () {
    if (this.params && this.params.length !== 0) {
      console.log('Si llega')
      this.visible = true
    }
  },
  methods: {
    goToAddress (address) {
      let routeData = (address.length === 64) ?
      this.$router.resolve({ path: `/searchResult/publicKey/${ address }` }) :
      this.$router.resolve({ path: `/searchResult/address/${ address }` })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="sass" scoped>
.supertitle
  margin: 0px
  font-size: 17px
  color: white
  padding: 0px 0px 5px 0px
  width: 100%

.element
  padding: 10px
  margin-bottom: 10px
  font-size: 10px
  &:last-child
    margin: 0px
  & > div
    padding: 5px 0px

.title
  font-weight: bold
  text-transform: uppercase
  color: black
  font-family: 'Roboto', sans-serif

.value
  word-break: break-all
  text-transform: uppercase
  color: black
  font-family: 'Roboto', sans-serif
  font-weight: 400

.link:hover
  color: #2d8e9b
  text-decoration: underline
  cursor: pointer
</style>
