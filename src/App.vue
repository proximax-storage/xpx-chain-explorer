<template>
  <!-- Main Component -->
  <div id="app">

    <!-- Header Component -->
    <app-header/>
    <!-- End Header Component -->

    <!-- All Views Container -->
    <div class="view-container">
      <router-view class="view"/>
    </div>
    <!-- End All View Container -->

    <!-- Footer Component -->
    <app-footer/>
    <!-- End Footer Component -->

  </div>
  <!-- End Main Component -->
</template>

<script>
import AppHeader from '@/components/global/AppHeader.vue'
import AppFooter from '@/components/global/AppFooter.vue'
import {
  Account,
  NetworkType,
  Listener,
  Deadline
} from 'tsjs-xpx-catapult-sdk'
import axios from 'axios'

export default {
  components: {
    AppHeader,
    AppFooter
  },
  mounted () {
    // Call Load Nodes Method
    this.readConfig()
    this.loadNodes()
    this.average()
  },
  data () {
    return {
      averageTime: 0
    }
  },
  methods: {
    /**
     * Load Nodes Method
     *
     * This method initializes the communication with the node,
     * from which the necessary information is obtained to render the data
     * of the proximax blockchain
     */
    loadNodes () {
      axios.get('./config/nodes.json')
        .then(response => {
          let data = response
          this.$store.dispatch('updateNodes', data.data.nodes)
          this.runWS()
        })
    },

    /**
     * Run WS / Run WebSocket
     *
     * This method runs a websocket, configured to maintain a constant
     * communication with the node
     */
    runWS () {
      // $storage is localstorage service (Persistence Service) included in the main instance of vue (No need import)
      // $utils is Utils service (Utils Service) included in the main instance of vue (No need import)

      // Get the current Node from the persistence service
      let currentNode = this.$storage.get('currentNode')

      // In the case that there is no information in the persistence service,
      // it is obtained from es vuex or $ store
      if (currentNode == null) {
        currentNode = this.$store.state.currentNode
      }

      // Print current node in console
      // console.log("NODO", currentNode)

      // Run the ws using the current node
      const listener = new Listener(`ws://${currentNode}`, WebSocket)
      listener.open().then(() => {
        listener
          .newBlock()
          .subscribe(block => {
            block.height = block.height.compact()

            // Print the current closed block
            // console.log('block', block.height)

            block.numTransactions = (block.numTransactions === undefined) ? 0 : block.numTransactions
            block.totalFee = this.$utils.fmtAmountValue(block.totalFee.compact())
            block.date = this.$utils.fmtTime(new Date(block.timestamp.compact() + (Deadline.timestampNemesisBlock * 1000)))
            this.$store.dispatch('changeCurrentBlock', block)
            this.reset()
          })
        }
      )
      .catch(err => {
        // Show error message in the console
        console.log('AQUI')
        this.$store.dispatch('updateErrorInfo', {
          active: true,
          message: 'Comunication error whit node!',
          submessage: 'Check the internet connection and reload the page'
        })

        // console.error(err)
      })
    },

    /**
     * Calculate Average
     */
    average () {
      setInterval(() => {
        this.averageTime += 1
        // console.log(this.averageTime)
      }, 1)
    },

    /**
     * Reset Average Time
     *
     */
    reset () {
      let time = this.averageTime
      this.$store.dispatch('updateAverage', time)
      this.averageTime = 0
    },

    readConfig () {
      axios.get('./config/rentalFee.json')
        .then(response => {
          let tmp = response.data
          this.$store.dispatch('setRentalFeeInfo', tmp)
        })
    }
  }
}
</script>

<style lang="sass">
@font-face
  font-family: 'LocalLato'
  src: url('./assets/fonts/Lato-Regular.ttf')

*
  margin: 0px
  padding: 0px
  transition: .3s
  box-sizing: border-box

html
  background-image: url('./assets/background-proximax-explorer.jpg')
  background-position: top center
  background-size: 100%
  background-repeat: no-repeat
  background-color: #f3f3f3

body
  background: transparent

#app
  font-family: 'LocalLato' !important
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: white
  background: transparent

@media screen and (min-width: 1367px)
  .view-container
    display: flex
    flex-flow: row nowrap
    width: 100%
    justify-content: center
    align-items: center
    margin: 0px
    & > .view
      width: 100%
      max-width: 1366px

@media screen and (max-width: 1366px)
  .view-container
    display: flex
    width: 100%
    justify-content: center
    align-items: center
    & > .view
      width: 100%

@media screen and (max-width: 1024px)
  .view-container
    justify-content: center
    align-items: center
    & > .view
      width: 100%

@media screen and (max-width: 960px)
  .view-container > .view
      width: 100%
</style>
