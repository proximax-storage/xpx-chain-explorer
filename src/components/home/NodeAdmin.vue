<template>
  <div class="node-admin">
    <div class="admin-item">
      <h1>Current Block</h1>
      <p>5000</p>
    </div>
    <div class="admin-item" style="flex-grow: 3">
      <h1>Node</h1>
      <p>
        <mdb-dropdown style="text-align: center">
          <mdb-dropdown-toggle slot="toggle" class="white-text" style="font-size: 20px; padding: 5px 10px; box-shadow: 0px 0px 0px transparent">{{ nameNode }}</mdb-dropdown-toggle>
          <mdb-dropdown-menu>
            <a class="nodeLink" v-for="(item, index) in nodeList" :key="index" @click="changeRoute(item)">{{ item.name }}</a>
          </mdb-dropdown-menu>
        </mdb-dropdown>
      </p>
    </div>
    <div class="admin-item">
      <h1>Avg Response Time</h1>
      <p>5000</p>
    </div>
  </div>
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
      nameNode: 'Select Node',
      nodeList: [
        { name: 'nodo-super--nodo1', route: 'route1' },
        { name: 'nodo-super--nodo2', route: 'route2' }
      ]
    }
  },
  methods: {
    changeRoute (item) {
      console.log(item)
      this.nameNode = item.name
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
    color: #7ab5e280 !important

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
