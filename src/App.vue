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

    <top-buttom/>

    <!-- Footer Component -->
    <app-footer/>
    <!-- End Footer Component -->

  </div>
  <!-- End Main Component -->
</template>

<script>
import AppHeader from '@/components/global/AppHeader.vue'
import AppFooter from '@/components/global/AppFooter.vue'
import TopButtom from '@/components/global/TopButton.vue'
import {
  Account,
  NetworkType,
  Listener,
  Deadline,
  Address
} from 'tsjs-xpx-chain-sdk'
import axios from 'axios'

export default {
  components: {
    AppHeader,
    AppFooter,
    TopButtom
  },
  mounted () {
    // Call Load Nodes Method
    this.loadNodes()
    this.average()
    // this.loadNetwork()
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
      axios.get('./config/config.json')
        .then(response => {
          // NODE CONFIG
          let nodesFile = response.data.Nodes
          let tmpNodes = JSON.parse(this.$storage.get('customNodes'))
          if (tmpNodes !== null && typeof tmpNodes === 'object') {
            nodesFile = response.data.Nodes.concat(tmpNodes)
          } else {
            nodesFile = response.data.Nodes
          }
          this.$store.dispatch('updateNodes', nodesFile)
          this.runWS()
          // END NODE CCONFIG

          // NETWORK CONFIG
          let networksFile = response.data.NetworkType

          if (networksFile !== undefined) {
            this.$store.dispatch('setNetworkType', networksFile)
          } else if (typeof networksFile !== 'object' || networksFile === undefined) {
            this.$store.dispatch('setNetworkType', { name: "TEST_NET", number: 168 })
          }
          // END NETWORK CONFIG

          // RENTAL FEE CONFIG
          let rentalFile = response.data.RentalFeeInfo
          this.$store.dispatch('setRentalFeeInfo', rentalFile)
          // END RENTAL FEE CONFIG
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
      if (currentNode === null) {
        currentNode = this.$store.state.currentNode
      }

      if (currentNode.includes('http://')) {
        currentNode = currentNode.substr(7)
        currentNode = `ws://${currentNode}`
      } else if (currentNode.includes('https://')) {
        currentNode = currentNode.substr(8)
        currentNode = `wss://${currentNode}`
      }
      // Print current node in console

      // Run the ws using the current node
      const listener = new Listener(`${currentNode}`, WebSocket)
      listener.open().then(() => {
        listener
          .newBlock()
          .subscribe(block => {
            block.height = block.height.compact()
            this.$sessionStorage.set('currentBlockHeight', block.height)
            if (block.numTransactions !== undefined) {
              block.numTransactions = block.numTransactions
              block.totalFee = this.$utils.fmtAmountValue(block.totalFee.compact())
              block.date = this.$utils.fmtTime(new Date(block.timestamp.compact() + (Deadline.timestampNemesisBlock * 1000)))
              this.$store.dispatch('changeCurrentBlock', block)
              this.reset()
            } else if (block.numTransactions === undefined) {
              this.$proxProvider.blockHttp.getBlockByHeight(block.height).subscribe(
                response => {
                  block.numTransactions = response.numTransactions
                  block.totalFee = this.$utils.fmtAmountValue(response.totalFee.compact())
                  block.date = this.$utils.fmtTime(new Date(response.timestamp.compact() + (Deadline.timestampNemesisBlock * 1000)))
                  this.$store.dispatch('changeCurrentBlock', block)
                  this.reset()
                }
              )
            }

            // block.totalFee = this.$utils.fmtAmountValue(block.totalFee.compact())
            // block.date = this.$utils.fmtTime(new Date(block.timestamp.compact() + (Deadline.timestampNemesisBlock * 1000)))
            // this.$store.dispatch('changeCurrentBlock', block)
            // this.reset()
          })
        }
      )
      .catch(err => {
        // Show error message in the console
        this.$store.dispatch('updateErrorInfo', {
          active: true,
          message: 'Comunication error with node!',
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
    }
  }
}
</script>

<style lang="sass">
@font-face
  font-family: 'font'
  src: url('./assets/fonts/OpenSans-Regular.ttf')

*
  margin: 0px
  padding: 0px
  transition: .3s
  box-sizing: border-box

html
  // background-image: url('./assets/background-proximax-explorer.jpg')
  // background-position: top center
  // background-size: 100%
  // background-repeat: no-repeat
  // background-color: #f3f3f3
  background: white
body
  background: transparent

#app
  font-family: 'font' !important
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: white
  background: transparent
  &::-webkit-scrollbar
    background: red

label
  margin: 0px 0px 0px 0px !important
  margin-top: 0px !important
  margin-left: 0px !important
  margin-rigth: 0px !important
  margin-bottom: 0px !important

.mr-5
  margin: 0px 0px 0px 0px !important
  margin-top: 0px !important
  margin-left: 0px !important
  margin-rigth: 0px !important
  margin-bottom: 0px !important

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
