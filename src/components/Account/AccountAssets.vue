<template>
  <div>
    <v-divider v-if="balance !== null"></v-divider>
    <div v-if="balance !== null">
      <p class="ma-0 primary--text text-center caption font-weight-bold" xs="12" sm="12" md="4">XPX Balance</p>
    </div>
    <div class="pb-5" v-if="balance !== null">
      <p class="ma-0 black--text text-center headline text-break" xs="12" sm="12" md="8">
        <span class="font-weight-bold">{{ $utils.beautyInteger(balance.amount.partA) }}</span>
        <span v-if="balance.amount.partB !== null">{{ `.${balance.amount.partB}` }}</span>
      </p>
    </div>

    <v-divider v-if="assets.length > 0"></v-divider>
    <div v-if="assets.length > 0">
      <p class="ma-0 primary--text text-center caption font-weight-bold" xs="12" sm="12" md="4">Assets</p>
    </div>

    <div style="overflow-y: auto !important">
      <v-simple-table class="pb-5" v-if="assets.length > 0">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">MosaicID</th>
              <th class="text-left">Mosaic Amount</th>
              <th class="text-left">Divisibility</th>
              <th class="text-left d-none d-md-display">Transferable</th>
              <th class="text-left d-none d-md-display">Supply Mutable</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in assets" :key="index">
              <td class="caption text-break">{{ item.id }}</td>
              <td class="caption text-break">
                <span class="font-weight-bold">{{ $utils.beautyInteger(item.amount.partA) }}</span>
                <span v-if="item.amount.partB !== null">{{ `.${item.amount.partB}` }}</span>
              </td>
              <td class="caption text-break" :class="(item.divisibility === true) ? 'green--text' : 'red-text'">
                {{ item.divisibility }}
              </td>
              <td class="caption text-break d-none d-md-display" :class="(item.transferable === true) ? 'green--text' : 'red-text'">
                {{ item.transferable }}
              </td>
              <td class="caption text-break d-none d-md-display" :class="(item.supplyMutable === true) ? 'green--text' : 'red-text'">
                {{ item.supplyMutable }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountAssets',

  props: {
    mosaics: {
      type: Array,
      default: null
    }
  },

  data: () => ({
    assets: [],
    balance: null
  }),

  mounted () {
    this.getAssetInfo()
  },

  methods: {
    getAssetInfo () {
      const xpx = this.$config.coin.mosaic
      console.log(this.mosaics[0].id.id.toHex(), xpx)
      for (let i = 0; i < this.mosaics.length; i++) {
        if (this.mosaics[i].id.id.toHex() === xpx.id) {
          this.balance = {
            id: this.mosaics[i].id.id.toHex().toUpperCase(),
            amount: this.$utils.fmtAmount(this.mosaics[i].amount.compact(), 6, true),
            divisibility: 6,
            transferable: 'No',
            supplyMutable: 'No'
          }

          this.mosaics.splice(i, 1)
        }
      }

      if (this.mosaics.length > 0) {
        this.mosaics.forEach(async (item, index) => {
          try {
            const mosaicInfo = await this.$provider.mosaicHttp.getMosaic(item.id).toPromise()
            const tmpObj = {
              id: mosaicInfo.mosaicId.id.toHex().toUpperCase(),
              amount: this.$utils.fmtAmount(item.amount.compact(), mosaicInfo.divisibility, true),
              divisibility: mosaicInfo.divisibility,
              transferable: (mosaicInfo.transferable === true) ? 'Yes' : 'No',
              supplyMutable: (mosaicInfo.supplyMutable === true) ? 'Yes' : 'No'
            }
            this.assets.push(tmpObj)
          } catch (error) {
            console.log(error)
          }
        })
      }
    }
  }
}
</script>
