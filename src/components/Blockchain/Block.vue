<template>
  <div>
    <div class="grey lighten-5">
      <v-row>
        <v-col>
          <div>
            <p class="text-center mb-2">
              <v-icon class="blue pa-3" dark style="border-radius: 50%">mdi-cube</v-icon>
            </p>
          </div>
          <p class="text-center ma-0 font-weight-bold">Block Height</p>
          <p class="text-center ma-0 font-weight-bold">{{ block }}</p>
          <p class="ma-0"><v-progress-linear v-if="load" class="mb-4" indeterminate/></p>
        </v-col>
      </v-row>

      <div v-if="blockInfo !== null">
        <v-row>
          <v-col class="blue--text" xs="12" sm="12" md="4">Validator</v-col>
          <v-col class="text-break" xs="12" sm="12" md="8">{{ blockInfo.signer.publicKey }}</v-col>
        </v-row>

        <v-row>
          <v-col class="blue--text" xs="12" sm="12" md="4">Hash</v-col>
          <v-col class="text-break" xs="12" sm="12" md="8">{{ blockInfo.hash }}</v-col>
        </v-row>

        <v-row>
          <v-col class="blue--text" xs="12" sm="12" md="4">Timestamp</v-col>
          <v-col class="text-break" xs="12" sm="12" md="8">{{ blockInfo.timestamp.compact() }}</v-col>
        </v-row>

        <v-row>
          <v-col class="blue--text" xs="12" sm="12" md="4">Difficulty</v-col>
          <v-col class="text-break" xs="12" sm="12" md="8">{{ `${blockInfo.difficulty.compact()}%` }}</v-col>
        </v-row>

        <v-row>
          <v-col class="blue--text" xs="12" sm="12" md="4">Txs</v-col>
          <v-col class="text-break" xs="12" sm="12" md="8">{{ blockInfo.numTransactions }}</v-col>
        </v-row>

        <v-row>
          <v-col class="blue--text" xs="12" sm="12" md="4">Fee</v-col>
          <v-col class="text-break" xs="12" sm="12" md="8">{{ blockInfo.totalFee.compact() }}</v-col>
        </v-row>
      </div>
    </div>
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
