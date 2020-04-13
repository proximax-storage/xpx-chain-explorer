<template>
  <div>
    <div class="blue lighten-5">
      <v-row>
        <v-col>
          <div>
            <p class="text-center mb-2">
              <v-icon class="blue pa-3" dark style="border-radius: 50%">mdi-arrange-bring-to-front</v-icon>
            </p>
          </div>
          <p class="text-center ma-0">AssetName</p>
          <p class="text-center ma-0">{{ asset }}</p>
          <p class="ma-0"><v-progress-linear v-if="load" class="mb-4" indeterminate/></p>
        </v-col>
      </v-row>

      <v-row v-if="assetInfo !== null">
        <v-col>
          <p class="text-break">{{ assetInfo }}</p>
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
import { Id, NamespaceId } from 'tsjs-xpx-chain-sdk'

export default {
  name: 'AssetName',

  data: () => ({
    asset: null,
    assetInfo: null,
    mosaicInfo: null,
    load: false
  }),

  mounted () {
    this.asset = (this.$route.params.name).toLowerCase()
    this.getAssetInfo(this.asset)
  },

  methods: {
    async getAssetInfo (assetName) {
      this.load = true
      try {
        let id = new NamespaceId(assetName)
        console.log(id)
        const namespaceResult = await this.$provider.namespaceHttp.getNamespace(id).toPromise()
        this.assetInfo = namespaceResult
        console.log(namespaceResult)
        if ([undefined, null].includes(namespaceResult.alias) === false) {
          id = new Id(namespaceResult.alias.mosaicId)
          const mosaicResult = await this.$provider.mosaicHttp.getMosaic(id).toPromise()
          this.mosaicInfo = mosaicResult
        }
      } catch (error) {
        console.log(error)
      }
      this.load = false
    }
  }
}
</script>
