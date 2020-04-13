<template>
  <div>
    <div class="blue lighten-5">
      <v-row>
        <v-col>
          <div>
            <p class="text-center mb-2">
              <v-icon class="blue pa-3" dark style="border-radius: 50%">mdi-arrange-bring-forward</v-icon>
            </p>
          </div>
          <p class="text-center ma-0">Mosaic</p>
          <p class="text-center ma-0">{{ mosaic }}</p>
          <p class="ma-0"><v-progress-linear v-if="load" class="mb-4" indeterminate/></p>
        </v-col>
      </v-row>

      <v-row v-if="mosaicInfo !== null">
        <v-col>
          <p class="text-break">{{ mosaicInfo }}</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { Id } from 'tsjs-xpx-chain-sdk'

export default {
  name: 'Mosaic',

  data: () => ({
    mosaic: null,
    mosaicInfo: null,
    load: false
  }),

  mounted () {
    this.mosaic = (this.$route.params.mosaic).toUpperCase()
    this.getMosaicInfo(this.mosaic)
  },

  methods: {
    async getMosaicInfo (mosaic) {
      this.load = true
      try {
        const id = Id.fromHex(mosaic)
        const mosaicResult = await this.$provider.mosaicHttp.getMosaic(id).toPromise()
        console.log(mosaicResult)
        this.mosaicInfo = mosaicResult
      } catch (error) {
        console.log(error)
      }
      this.load = false
    }
  }
}
</script>
