<template>
  <div>
    <v-alert outlined color="grey lighten-2" border="top" xs="12" sm="12" md="8" lg="8">
      <v-row>
        <v-col>
          <div>
            <p class="text-center mb-2">
              <v-icon class="blue pa-3" dark style="border-radius: 50%">mdi-cube</v-icon>
            </p>
          </div>
          <p class="text-center ma-0 font-weight-bold primary--text">Block Height</p>
          <p class="text-center ma-0 font-weight-bold primary--text">{{ block }}</p>
          <p class="ma-0"><v-progress-linear v-if="load" class="mb-4" indeterminate/></p>
        </v-col>
      </v-row>

      <div v-if="blockInfo !== null">
        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Validator</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ blockInfo.signer.publicKey }}</p>
        </div>

        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Hash</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ blockInfo.hash }}</p>
        </div>

        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Timestamp</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ blockInfo.timestamp.compact() }}</p>
        </div>

        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Difficulty</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ `${blockInfo.difficulty.compact()}%` }}</p>
        </div>

        <div class="pb-2">
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Txs</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ blockInfo.numTransactions }}</p>
        </div>

        <div>
          <p class="ma-0 primary--text caption" xs="12" sm="12" md="4">Fee</p>
          <p class="ma-0 black--text text-break" xs="12" sm="12" md="8">{{ $utils.fmtAmount(blockInfo.totalFee.compact(), 6) }}</p>
        </div>
      </div>
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'Block',

  data: () => ({
    block: null,
    blockInfo: null,
    load: false
  }),

  mounted () {
    this.block = parseInt(this.$route.params.block)
    this.getBlockInfo(this.block)
  },

  methods: {
    async getBlockInfo (block) {
      this.load = true
      const blockInfo = await this.$provider.blockHttp.getBlockByHeight(block).toPromise()
      console.log(blockInfo)
      this.blockInfo = blockInfo
      this.load = false
    }
  }
}
</script>
