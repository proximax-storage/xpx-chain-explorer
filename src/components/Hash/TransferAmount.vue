<template>
  <div v-if="amount !== null">
    <divider :title="'Amount'"/>
    <p class="ma-0 mb-4 black--text text-center headline text-break" xs="12" sm="12" md="8">
      <span class="font-weight-bold">{{ $utils.beautyInteger(this.amount.partA) }}</span>
      <span v-if="this.amount.partB !== null">{{ `.${this.amount.partB}` }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'TransferAmount',

  props: {
    mosaics: Array
  },

  components: {
    divider: () => import('@/components/global/Divider')
  },

  data: () => ({
    amount: null
  }),

  mounted () {
    let tmpAmount = 0
    this.mosaics.forEach((item, index) => {
      if (item.id.id.toHex() === this.$config.coin.mosaic.id) {
        tmpAmount += item.amount.compact()
      } else if (item.id.id.toHex() === this.$config.coin.namespace.id) {
        tmpAmount += item.amount.compact()
      }

      if (index + 1 === this.mosaics.length) {
        this.amount = this.$utils.fmtAmount(tmpAmount, 6, true)
      }
    })
  }
}
</script>
