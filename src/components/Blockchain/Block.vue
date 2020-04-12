<template>
  <div>
    <v-progress-linear v-if="load" class="mb-4" indeterminate/>

    <div class="blue lighten-5">
      <v-row>
        <v-col>
          <div>
            <p class="text-center mb-2">
              <v-icon class="blue pa-3" dark style="border-radius: 50%">mdi-cube</v-icon>
            </p>
          </div>
          <p class="text-center ma-0">Block</p>
          <p class="text-center ma-0">{{ this.block }}</p>
        </v-col>
      </v-row>

      <v-row v-if="blockInfo !== null">
        <v-col>
          <p class="text-break">{{ this.blockInfo }}</p>
        </v-col>
      </v-row>
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
