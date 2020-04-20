<template>
  <div>
    <div class="">
      <v-row class="ma-0 pa-0 justify-space-between">
        <v-col class="pa-1 grey lighten-5" cols="3" style="border-radius: 5px">
          <p class="ma-0 text-center grey--text caption">Block Height</p>
          <p class="ma-0 text-center body-2 text-break">
            {{ ([undefined, null].includes(getCurrentBlock)) ? 'Loading...' : getCurrentBlock.height.compact() }}
          </p>
        </v-col>

        <v-col class="pa-1 grey lighten-5" cols="5" style="border-radius: 5px">
          <p class="ma-0 text-center grey--text caption">Node</p>
          <p class="ma-0 text-center body-2 text-break">{{ node }}</p>
        </v-col>

        <v-col class="pa-1 grey lighten-5" cols="3" style="border-radius: 5px">
          <p class="ma-0 text-center grey--text caption">Average</p>
          <p class="ma-0 text-center body-2 text-break">15000</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { Listener } from 'tsjs-xpx-chain-sdk'

export default {
  name: 'Info',

  data: () => ({
    node: null
  }),

  mounted () {
    this.node = this.$nodeman.currentNode
    this.getInitialBlock()
    this.runWS()
  },

  methods: {
    async getInitialBlock () {
      const height = await this.$provider.chainHttp.getBlockchainHeight().toPromise()
      const blockInfo = await this.$provider.blockHttp.getBlockByHeight(height.compact()).toPromise()
      this.$store.dispatch('updateCurrentBlock', blockInfo)
    },

    runWS () {
      // let currentNode = this.$nodeInfo.currentNode

      // if (currentNode.includes('http://')) {
      //   currentNode = currentNode.substr(7)
      //   currentNode = `ws://${currentNode}`
      // } else if (currentNode.includes('https://')) {
      //   currentNode = currentNode.substr(8)
      //   currentNode = `wss://${currentNode}`
      // }

      const listener = new Listener(this.$nodeman.formatted.ws, WebSocket)
      listener.open().then(() => {
        listener
          .newBlock()
          .subscribe(block => {
            this.$store.dispatch('updateCurrentBlock', block)
          })
      }).catch(err => {
        console.log(err)
      })
    }
  },

  computed: {
    getCurrentBlock () {
      return this.$store.getters.getCurrentBlock
    }
  }
}
</script>
