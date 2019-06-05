<template>
  <!-- Node Administrator Component -->
  <div class="node-admin">

    <!-- Current Block Area -->
    <div class="admin-item">
      <h1>Current Block</h1>
      <p>{{ updateBlock }}</p>
    </div>
    <!-- End Current Block Area -->

    <!-- Node Selector Area -->
    <div class="admin-item" style="flex-grow: 3">
      <h1>Node</h1>
      <p>
        <mdb-dropdown style="text-align: center">
          <mdb-dropdown-toggle slot="toggle" class="white-text" style="font-size: 20px; padding: 5px 10px; box-shadow: 0px 0px 0px transparent">{{ getCurrentNode || 'bctestnet1.xpxsirius.io:3000' }}</mdb-dropdown-toggle>
          <mdb-dropdown-menu>
            <a class="nodeLink" v-for="item in getAllNodes" :key="item.index" @click="changeNode(item.index)">{{ item.name }}</a>
          </mdb-dropdown-menu>
        </mdb-dropdown>
      </p>
    </div>
    <!-- End Node Selector Area -->

    <!-- Average Response Time -->
    <div class="admin-item">
      <h1>Avg Response Time</h1>
      <p>5000</p>
    </div>
    <!-- End Average Response Area -->

  </div>
  <!-- End Node Administratos -->
</template>

<script>
import { mdbDropdown, mdbDropdownMenu, mdbDropdownToggle } from 'mdbvue'

export default {
  name: 'NodeAdmin',
  components: {
    mdbDropdown,
    mdbDropdownMenu,
    mdbDropdownToggle
  },
  data () {
    return {
      //nameNode: 
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
      return this.$store.getters.getCurrentNode
    },

    /**
     * Get All Nodes 
     * 
     * Get the list of available nodes from the store
     */
    getAllNodes () {
      let tmpArray = []
      let tmp = Array.from(this.$store.getters.getAllNodes)
      tmp.forEach((item, index) => {
        tmpArray.push({ name: item, index: index })
      });
      return tmpArray
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
    }
  }
}
</script>

<style lang="sass" scoped>
*
  margin: 0px
  padding: 0px

.nodeLink
  display: block
  margin: 3px
  font-weight: bold !important
  padding: 5px
  &:hover
    background: dodgerblue
    color: white !important

.node-admin
  display: flex
  flex-flow: row wrap
  justify-content: space-evenly
  & > .admin-item
    flex-grow: 1
    border: 1px solid #7ab5e280
    padding: 10px
    border-radius: 7px
    min-width: 200px
    margin: 10px
    & > h1
      font-size: 15px
      margin: 0px
      font-weight: bold
      text-transform: uppercase
      color: #7ab5e2
    & > p
      font-size: 30px
      color: #f4f4f4
</style>
