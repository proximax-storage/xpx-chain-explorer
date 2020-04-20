<template>
  <div>
    <v-alert outlined color="grey lighten-2" border="top" xs="12" sm="12" md="8" lg="8">
      <v-row>
        <v-col>
          <div>
            <p class="text-center mb-2">
              <v-icon class="blue pa-3" dark style="border-radius: 50%">mdi-arrange-bring-to-front</v-icon>
            </p>
          </div>
          <p class="text-center ma-0 font-weight-bold primary--text">NamespaceID</p>
          <p class="text-center ma-0 font-weight-bold primary--text text-break">{{ namespace }}</p>
          <p class="ma-0"><v-progress-linear v-if="load" class="mb-4" indeterminate/></p>
        </v-col>
      </v-row>

      <div v-if="namespaceInfo !== null">
        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Owner Address</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ namespaceInfo.owner.address.pretty() }}</p>
        </div>

        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Owner PublicKey</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ namespaceInfo.owner.publicKey }}</p>
        </div>

        <div class="pb-2" v-if="namespaceName !== null">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Namespace Name</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ namespaceName }}</p>
        </div>

        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">NamespaceID</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ namespaceInfo.id.id.toHex().toUpperCase() }}</p>
        </div>

        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Namespace Type</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ (namespaceInfo.type === 0) ? 'Root' : 'Sub' }}</p>
        </div>

        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Levels</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ namespaceInfo.levels.length }}</p>
        </div>

        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Start Height</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ namespaceInfo.startHeight.compact() }}</p>
        </div>

        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">End Height</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">
            {{ (typeof namespaceInfo.endHeight.compact() === 'number') ? namespaceInfo.endHeight.compact() : $convHex.hexToDec(namespaceInfo.endHeight.toHex()) }}
          </p>
        </div>

        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Depth</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ namespaceInfo.depth }}</p>
        </div>
      </div>
    </v-alert>
  </div>
</template>

<script>
import { Id } from 'tsjs-xpx-chain-sdk'

export default {
  name: 'Namespace',

  data: () => ({
    namespace: null,
    namespaceInfo: null,
    namespaceName: null,
    load: false
  }),

  mounted () {
    this.namespace = (this.$route.params.namespace).toUpperCase()
    this.getNamespaceInfo(this.namespace)
  },

  methods: {
    async getNamespaceInfo (mosaic) {
      this.load = true
      const id = Id.fromHex(mosaic)
      try {
        const namespaceResult = await this.$provider.namespaceHttp.getNamespace(id).toPromise()
        console.log(namespaceResult)
        this.namespaceInfo = namespaceResult
        this.load = false
      } catch (error) {
        console.log(error)
        this.load = false
      }

      try {
        const namespaceName = (await this.$provider.namespaceHttp.getNamespacesName([id]).toPromise())[0]
        console.log(namespaceName)
        this.namespaceName = namespaceName.name
      } catch (error) {
        console.warn(error)
      }
    }
  }
}
</script>
