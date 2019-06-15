<template>
  <!-- Inner Transaction Component -->
  <div class="animated fast fadeIn">
    <!-- name -->
    <h1 class="supertitle" v-if="params">Inner Transactions</h1>

    <!-- Iterated Element -->
    <div>
      <div class="element" v-for="(item, index) in params" :key="index" style="border-radius: 5px" :style="(index % 2 === 0) ? 'background: #DDDDDD' : 'background: #F4F4F4'" >

        <div style="padding: 2px">
          <div class="title">Address</div>
          <div class="value">{{ item.signer.address.pretty() }}</div>
        </div>

        <div style="padding: 2px">
          <div class="title">Public Key</div>
          <div class="value">{{ item.signer.publicKey }}</div>
        </div>

        <div style="padding: 2px">
          <div class="title">Signature</div>
          <div class="value">{{ item.signature }}</div>
        </div>

        <div style="padding: 2px" v-if="item.mosaics">
          <div class="title">Mosaics</div>
          <div class="value">{{ item.mosaics.length }}</div>
        </div>

        <div style="padding: 2px" v-if="item.message">
          <div class="title">Message</div>
          <div class="value">{{ (item.message.payload !== '') ? item.message.payload : 'No Available' }}</div>
        </div>

      </div>
    </div>
    <!-- End Iterated Element -->
  </div>
  <!-- End Inner Transaction Component -->
</template>

<script>
export default {
  name: 'InnerTransaction',
  props: {
    params: Array
  },
  mounted () {
    // console.log('INNER TRANSACTIONS', this.params)
  }
}
</script>

<style lang="sass" scoped>
$radius: 5px

.supertitle
  margin: 10px 0px 0px 0px
  font-size: 17px
  color: #7AB5E2
  padding: 0px 0px 5px 0px
  width: 100%

.element
  padding: 10px
  margin-bottom: 10px
  font-size: 10px
  &:last-child
    margin: 0px

.title
  font-weight: bold
  text-transform: uppercase
  color: black
  font-family: 'Roboto', sans-serif

.value
  text-transform: uppercase
  word-break: break-all
  color: black
  font-family: 'Roboto', sans-serif
  font-weight: 400
</style>
