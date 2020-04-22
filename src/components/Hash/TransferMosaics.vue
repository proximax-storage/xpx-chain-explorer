<template>
  <div v-if="fmtMosaics.length > 0">
    <divider :title="'Mosaics in Transaction'"/>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">MosaicId</th>
            <th class="text-left">Name</th>
            <th class="text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in fmtMosaics" :key="index">
            <td>{{ item.id.toUpperCase() }}</td>
            <td>{{ item.name }}</td>
            <td>
              <span>{{ $utils.beautyInteger(item.amount.partA) }}</span>
              <span v-if="item.amount.partB !== null">{{ `.${item.amount.partA}` }}</span>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: 'TransferMosaics',

  props: {
    mosaics: Array
  },

  components: {
    divider: () => import('@/components/global/Divider')
  },

  data: () => ({
    fmtMosaics: []
  }),

  mounted () {
    this.formatMosaic()
  },

  methods: {
    formatMosaic () {
      const xpxmosaic = this.$config.coin.mosaic.id
      const xpxnamespace = this.$config.coin.namespace.id
      this.mosaics.forEach(async item => {
        if (item.id.id.toHex() !== xpxmosaic && item.id.id.toHex() !== xpxnamespace) {
          const tmpMosaic = {}
          try {
            let mosaic
            if (this.$utils.validateIsMosaics(item.id.id)) {
              mosaic = await this.$provider.mosaicHttp.getMosaic(item.id.id).toPromise()
            } else {
              // TODO: Asset in transaction is namespace?
            }
            tmpMosaic.id = item.id.id.toHex()
            tmpMosaic.amount = this.$utils.fmtAmount(item.amount.compact(), mosaic.divisibility, true)
          } catch (error) {
            console.log(error)
          }

          try {
            const mosaicNames = await this.$provider.mosaicHttp.getMosaicsNames([item.id.id]).toPromise()
            const $u = undefined
            console.log(mosaicNames)
            if (mosaicNames[0] !== $u && mosaicNames[0].names !== $u && mosaicNames[0].names[0] !== $u) {
              tmpMosaic.name = ([undefined, null, ''].includes(mosaicNames[0].names[0].name) === false) ? mosaicNames[0].names[0].name : 'Not Name'
            } else {
              tmpMosaic.name = 'Not Name'
            }
          } catch (error) {
            console.log(error)
          }
          this.fmtMosaics.push(tmpMosaic)
        }
      })
    }
  }
}
</script>
