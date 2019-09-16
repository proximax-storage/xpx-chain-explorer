<template>
  <!-- Node Administrator Component -->
  <div class="node-admin animated fast fadeIn">

    <!-- Node Selector Area -->
    <div class="admin-item" style="flex-grow: 3">
      <h1>Node</h1>
      <p>
        <mdb-dropdown style="text-align: center">
          <mdb-dropdown-toggle slot="toggle" class="button-config black-text" style="width:100%; padding: 5px 0px; box-shadow: 0px 0px 0px transparent">
            <span class="button-toggle">{{ getCurrentNode }}</span>
          </mdb-dropdown-toggle>
          <mdb-dropdown-menu>
            <a class="nodeLink" v-for="item in getAllNodes" :key="item.index" @click="changeNode(item.index)">
              {{ item.name }}
            </a>
            <a class="nodeLink" @click="addNode('open')">Add Node</a>
          </mdb-dropdown-menu>
        </mdb-dropdown>
      </p>
    </div>
    <!-- End Node Selector Area -->

    <!-- Current Block Area -->
    <div class="admin-item">
      <h1>Current Block</h1>
      <p>{{ updateBlock }}</p>
    </div>
    <!-- End Current Block Area -->

    <!-- Average Response Time -->
    <div class="admin-item">
      <h1>Avg Response Time</h1>
      <p>{{ getAverage }}(ms)</p>
    </div>
    <!-- End Average Response Area -->

    <div class="newNode" v-if="newNode">
      <mdb-input class="place-white" style="width: 100%" v-model="newNodeValue" label="Add you new node" placeholder="http://mynode.io:8080 or https://mynode.io:8080"/>
      <div>{{ nodeMessage }}</div>
      <mdb-progress v-if="nodeLoader === true" bgColor="cyan darken-3" style="width: 100%" indeterminate/>
      <div>
        <div class="closer" @click="addNode('close')">Cancel</div>
        <div class="add" @click="addNode('add')">Add</div>
      </div>
    </div>

  </div>
  <!-- End Node Administratos -->
</template>

<script>
import {
  mdbDropdown,
  mdbDropdownMenu,
  mdbDropdownToggle,
  mdbInput,
  mdbProgress
} from 'mdbvue'
import axios from 'axios'

export default {
  name: 'NodeAdmin',
  components: {
    mdbDropdown,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbInput,
    mdbProgress
  },
  data () {
    return {
      newNode: false,
      newNodeValue: '',
      nodeMessage: '',
      nodeLoader: false
    }
  },
  computed: {
    /**
     * Update Block
     *
     * Get the last stored block from the store
     */
    updateBlock () {
      return this.$store.getters.getCurrentBlock
    },

    /**
     * Update Node
     *
     * Get the last stored Node from the store
     */
    getCurrentNode () {
      return this.$store.state.currentNode
    },

    /**
     * Get All Nodes
     *
     * Get the list of available nodes from the store
     */
    getAllNodes () {
      let tmpArray = []
      let tmp = Array.from(this.$store.state.nodes)
      tmp.forEach((item, index) => {
        tmpArray.push({ name: item, index: index })
      });
      return tmpArray
    },

    /**
     * Get Average
     */
    getAverage () {
      let ave = this.$store.getters.getAverageList
      let count = 0
      ave.forEach(el => {
        count += el
      })

      count = count / ave.length
      return count.toFixed(2)

    }
  },
  methods: {
    /**
     * Change Node
     *
     * Execute the Change the node action and reload the page
     */
    changeNode (index) {
      this.$store.dispatch('updateCurrentNode', index)
      window.location.reload()
    },

    addNode(action) {
      if (action == 'open') {
        this.newNode = true
      } else if (action == 'close') {
        this.newNode = false
        this.nodeMessage = ''
        this.newNodeValue = ''
        this.nodeLoader = false
      } else if (action == 'add') {
        // this.newNode = false
        this.nodeLoader = true
        if (this.newNodeValue !== '') {
          this.nodeMessage = ''
          axios.get(`${this.newNodeValue}/node/info`).then(
            response => {
              if (this.$store.state.nodes.includes(this.newNodeValue) === false) {
                if (response.data.networkIdentifier === this.$store.state.netType.number) {
                  this.$store.dispatch('pushNewNode', this.newNodeValue)
                  if (this.$storage.get('customNodes') === null || this.$storage.get('customNodes') === undefined) {
                    this.$storage.set('customNodes', [this.newNodeValue])
                  } else {
                    let tmpCustomNodes = JSON.parse(this.$storage.get('customNodes'))
                    tmpCustomNodes.push(this.newNodeValue)
                    this.$storage.set('customNodes', JSON.stringify(tmpCustomNodes))
                  }
                  this.nodeLoader = false
                  this.nodeMessage = 'Node Accepted - Available from the list of nodes'
                  let tmpObj = {
                    name: response.data.friendlyName,
                    ip: response.data.host,
                    version: response.data.version,
                    location: '',
                    lat: 0,
                    lon: 0,
                    height: null,
                    status: "Online",
                    active: false,
                    visible: true,
                    urlNode: this.newNodeValue,
                    icon: 'nodes.svg'
                  }
                  let mapCustomNodes = this.$storage.get('mapCustomNodes')
                  if (mapCustomNodes !== null) {
                    mapCustomNodes = JSON.parse(mapCustomNodes)
                    mapCustomNodes.push(tmpObj)
                    mapCustomNodes = JSON.stringify(mapCustomNodes)
                    this.$storage.set('mapCustomNodes', mapCustomNodes)
                  } else {
                    let tmpArr = [tmpObj]
                    let strData = JSON.stringify(tmpArr)
                    this.$storage.set('mapCustomNodes', strData)
                  }
                } else {
                  this.nodeLoader = false
                  this.nodeMessage = 'Node not Accepted - Incompatible Network Type'
                }
              } else {
                this.nodeLoader = false
                this.nodeMessage = 'Node not Accepted - This node is already in the list'
              }
            }
          )
          .catch(err => {
            this.nodeLoader = false
            this.nodeMessage = 'Node not Accepted'
          })
        }
      }
    }
  }
}
</script>

<style lang="sass">
*
  margin: 0px
  padding: 0px

.md-form input[type=search]:focus:not([readonly])
    box-shadow: 0 1px 0 0 #2BA1B9 !important
    border-bottom: 1px solid #2BA1B9 !important

.place-white
  color: black !important
  margin: 0px !important
  & > input
    color: black !important
    border-bottom: #2BA1B9
    margin: 0px
  & > label
    color: #2BA1B9 !important
    &::after
      background: red !important

.button-config
  background: transparent !important
  padding: 0px 20px !important
  border-radius: 20px
  &:hover
    background: #2ba1b940 !important
  &:focus
    background: #2ba1b940 !important

.nodeLink
  display: block
  margin: 3px
  font-weight: bold !important
  padding: 5px
  border-radius: 5px
  &:hover
    background: #2BA1B9 !important
    color: white !important

.newNode
  width: 100%
  background: #f4f4f4
  padding: 15px
  text-align: center
  display: flex
  flex-flow: column nowrap
  justify-content: center
  align-items: center
  margin-bottom: 10px
  & > div
    color: black
    font-size: 10px
    display: flex
    flex-flow: row wrap
    & > .closer
      flex-grow: 1
      color: white
      background: red
      border-radius: 15px
      padding: 5px 20px
      font-size: 12px
      font-weight: bold
      margin: 5px
    & > .add
      flex-grow: 1
      color: white
      background: #2BA1B9
      border-radius: 15px
      padding: 5px 20px
      font-size: 12px
      font-weight: bold
      margin: 5px

.node-admin
  display: flex
  flex-flow: row wrap
  justify-content: space-evenly
  position: relative
  z-index: 3000
  & > .admin-item
    flex-grow: 1
    background: #f4f4f4
    padding: 10px
    border-radius: 20px
    min-width: 200px
    margin: 10px
    display: flex
    flex-flow: column
    align-items: flex-start
    justify-content: center
    & > h1
      font-size: 10px
      margin: 0px
      font-weight: bold
      text-transform: uppercase
      color: black
    & > p
      margin: 0px
      font-size: 20px
      color: black
      text-align: left
    &:first-child
      background: white
      box-shadow: inset 0px 0px 0px 2px #ddd

.button-toggle
  font-size: 20px
  word-break: break-all

@media screen and (max-width: 600px)
  .node-admin
    flex-flow: column nowrap
    & > .admin-item
      border-radius: 20px
      & > h1
        font-size: 10px
      & > p
        font-size: 15px

  .button-toggle
    font-size: 15px
</style>
