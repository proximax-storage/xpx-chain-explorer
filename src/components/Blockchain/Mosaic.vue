<template>
  <div>
    <v-alert outlined color="grey lighten-2" border="top" xs="12" sm="12" md="8" lg="8">
      <v-row>
        <v-col>
          <div>
            <p class="text-center mb-2">
              <v-icon class="blue pa-3" dark style="border-radius: 50%">mdi-arrange-bring-forward</v-icon>
            </p>
          </div>
          <p class="text-center ma-0 font-weight-bold primary--text">MosaicID</p>
          <p class="text-center ma-0 font-weight-bold primary--text text-break">{{ mosaic }}</p>
          <p class="ma-0"><v-progress-linear v-if="load" class="mb-4" indeterminate/></p>
        </v-col>
      </v-row>

      <div v-if="mosaicInfo !== null">
        <div class="pb-2" v-if="mosaicName !== null">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Mosaic Name</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ mosaicName }}</p>
        </div>

        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">MosaicID</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ mosaicInfo.mosaicId.id.toHex().toUpperCase() }}</p>
        </div>

        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Supply</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">
            <span class="font-weight-bold">{{ $utils.beautyInteger(supply.partA) }}</span>
            <span v-if="supply.partB !== null">{{ `.${supply.partB}` }}</span>
          </p>
        </div>

        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Owner Address</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ mosaicInfo.owner.address.pretty() }}</p>
        </div>

        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Owner Public Key</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ mosaicInfo.owner.publicKey }}</p>
        </div>

        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Mosaic Properties</p>
          <v-alert color="blue lighten-5">
            <v-row>
              <v-col>
                <p class="ma-0 primary--text caption text-center" xs="12" sm="12" md="4">Divisibility</p>
                <p class="ma-0 black--text text-break font-weight-bold text-center" xs="12" sm="12" md="8">{{ mosaicInfo.properties.divisibility }}</p>
              </v-col>

              <v-col>
                <p class="ma-0 primary--text caption text-center" xs="12" sm="12" md="4">Transferable</p>
                <p class="ma-0 black--text text-break font-weight-bold text-center" xs="12" sm="12" md="8"
                  :class="(mosaicInfo.properties.transferable === true) ? 'green--text' : 'red--text'"
                >
                  {{ (mosaicInfo.properties.transferable === true) ? 'Yes' : 'No' }}
                </p>
              </v-col>

              <v-col>
                <p class="ma-0 primary--text caption text-center" xs="12" sm="12" md="4">Supply Mutable</p>
                <p class="ma-0 black--text text-break font-weight-bold text-center" xs="12" sm="12" md="8"
                  :class="(mosaicInfo.properties.supplyMutable === true) ? 'green--text' : 'red--text'"
                >
                  {{ (mosaicInfo.properties.supplyMutable === true) ? 'Yes' : 'No' }}
                </p>
              </v-col>
            </v-row>
          </v-alert>
        </div>
      </div>
    </v-alert>
  </div>
</template>

<script>
import { Id } from 'tsjs-xpx-chain-sdk'

export default {
  name: 'Mosaic',

  data: () => ({
    mosaic: null,
    mosaicInfo: null,
    mosaicName: null,
    supply: null,
    load: false
  }),

  mounted () {
    this.mosaic = (this.$route.params.mosaic).toUpperCase()
    this.getMosaicInfo(this.mosaic)
  },

  methods: {
    async getMosaicInfo (mosaic) {
      this.load = true
      const id = Id.fromHex(mosaic)
      try {
        const mosaicResult = await this.$provider.mosaicHttp.getMosaic(id).toPromise()
        console.log(mosaicResult)
        this.mosaicInfo = mosaicResult
        this.supply = this.$utils.fmtAmount(mosaicResult.supply.compact(), mosaicResult.divisibility, true)
        this.load = false
      } catch (error) {
        console.log(error)
        this.load = false
      }

      try {
        const mosaicName = (await this.$provider.mosaicHttp.getMosaicsNames([id]).toPromise())[0]
        console.log(mosaicName)
        this.mosaicName = mosaicName.names[0].name
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
