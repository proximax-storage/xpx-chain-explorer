<template>
  <div>
    <v-progress-linear v-if="load" class="mb-4" indeterminate/>
    <v-simple-table>
      <template v-slot:default>
        <thead class="grey lighten-5">
          <tr>
            <th>Height</th>
            <th>Validator</th>
            <th>Fee</th>
            <th>Txs</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in blocks" :key="index">
            <td class="caption" @click="$goToBlock(item.height.compact())">{{ item.height.compact() }}</td>
            <td class="caption" @click="$goToPublicKey(item.signer.publicKey)">{{ item.signer.publicKey }}</td>
            <td class="caption">{{ $utils.fmtAmount(item.totalFee.compact(), 6) }}</td>
            <td class="caption">{{ ([undefined, null].includes(item.numTransactions)) ? 0 : item.numTransactions }}</td>
            <td class="caption">{{ $provider.fmtTime(item.timestamp.compact()) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div v-if="blocks.length > 0" class="pa-5 text-center">
      <v-btn small color="primary" :loading="btnLoader" @click="loadMode">
        <span>Load More</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlockList',

  data: () => ({
    blocks: [],
    btnLoader: false,
    load: false
  }),

  mounted () {
    this.getInitialBlock()
  },

  methods: {
    async getInitialBlock () {
      this.load = true
      const height = await this.$provider.chainHttp.getBlockchainHeight().toPromise()
      const blocksInfo = await this.$provider.blockHttp.getBlocksByHeightWithLimit(height.compact(), 50).toPromise()
      console.log(blocksInfo)
      blocksInfo.forEach(item => {
        this.blocks.push(item)
      })
      this.load = false
    },

    async loadMode () {
      this.btnLoader = true
      const lastBlock = ((this.blocks[this.blocks.length - 1]).height.compact()) - 1
      console.log(lastBlock)
      const blocksInfo = await this.$provider.blockHttp.getBlocksByHeightWithLimit(lastBlock, 50).toPromise()
      console.log(blocksInfo)
      const numOfBlocks = Array.from(this.blocks)

      for (let i = 0; i < numOfBlocks.length; i++) {
        numOfBlocks[i] = numOfBlocks[i].height.compact()
      }

      blocksInfo.forEach(item => {
        if (numOfBlocks.includes(item.height.compact()) === false) {
          this.blocks.push(item)
        }
      })

      this.btnLoader = false
    }
  },

  watch: {
    getCurrentBlock (nv, ov) {
      const some = this.blocks.some(elem => elem.height.compact() === nv.height.compact())
      if (some === false) {
        this.blocks.unshift(nv)
      }
    }
  },

  computed: {
    getCurrentBlock () {
      return this.$store.getters.getCurrentBlock
    }
  }
}
</script>
