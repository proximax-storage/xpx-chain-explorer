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
          <p class="text-center ma-0">Namespace</p>
          <p class="text-center ma-0">{{ namespace }}</p>
          <p class="ma-0"><v-progress-linear v-if="load" class="mb-4" indeterminate/></p>
        </v-col>
      </v-row>

      <v-row v-if="namespaceInfo !== null">
        <v-col>
          <p class="text-break">{{ namespaceInfo }}</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { Id } from 'tsjs-xpx-chain-sdk'

export default {
  name: 'Namespace',

  data: () => ({
    namespace: null,
    namespaceInfo: null,
    load: false
  }),

  mounted () {
    this.namespace = (this.$route.params.namespace).toUpperCase()
    this.getNamespaceInfo(this.namespace)
  },

  methods: {
    async getNamespaceInfo (mosaic) {
      this.load = true
      try {
        const id = Id.fromHex(mosaic)
        const namespaceResult = await this.$provider.namespaceHttp.getNamespace(id).toPromise()
        console.log(namespaceResult)
        this.namespaceInfo = namespaceResult
      } catch (error) {
        console.log(error)
      }
      this.load = false
    }
  }
}
</script>
