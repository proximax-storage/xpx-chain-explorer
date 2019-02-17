<template>
  <!--Navbar-->
  <mdb-navbar class="background-explorer" scrolling dark spand>
    <img src="@/assets/logo/proximax-white.png" height="30">
    <mdb-navbar-toggler>
      <mdb-navbar-nav nav right>
        <span class="text-white block">Current Block: <strong>7487876</strong></span>
        <a href="#" class="nav-link navbar-link text-white" @click="navExplorer()">Blocks</a>
        <mdb-dropdown tag="li">
          <mdb-dropdown-toggle tag="a" navLink class="background-explorer" slot="toggle">Select Node</mdb-dropdown-toggle>
          <mdb-dropdown-menu right>
            <a href="#" class="dropdown-item" :class="{ active : nodeSelected === node}"  v-for="node in nodes" :key="node" @click="changeNode(node)">{{node}}</a>
          </mdb-dropdown-menu>
        </mdb-dropdown>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import { mdbNavbar, mdbNavbarNav, mdbNavItem, mdbNavbarToggler, mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem } from 'mdbvue'
import { Listener } from "proximax-nem2-sdk"

export default {
  name: 'Menu',
  components: {
    mdbNavbar,
    mdbNavbarNav,
    mdbNavItem,
    mdbNavbarToggler,
    mdbDropdown,
    mdbDropdownToggle,
    mdbDropdownMenu,
    mdbDropdownItem
  },
  data () {
    let nodes = [
      "bctestnet1.xpxsirius.io:3000",
      "bctestnet2.xpxsirius.io:3000"
    ]
    const nodeSelected = localStorage.getItem('nodeSelected')
    this.connectWS(nodeSelected)
    return {
      nodes: nodes,
      nodeSelected: nodeSelected,
      connector: null
    }
  },
  methods: {
    changeNode: function (node) {
      localStorage.setItem('nodeSelected', node)
      this.$router.push('/explorer')
    },
    connectWS: function (node) {
      this.connector = new Listener(`ws://${node}`)
      // Try to open the connection
      this.connector.open().then(() => {
        listener
          .newBlock()
          .subscribe(block => console.log(block), err => console.error(err))
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .dropdown .active {
    background: #18ada3 !important;
    color: white;
  }

  .dropdown-item:hover {
    background: #18ada3 !important;
    color: white !important;
  }

  .nav-link:hover {
    background: white !important;
  }

  .block {
    display: block;
    padding: .5rem 1rem;
    padding-right: 0;
    padding-left: 0;
  }

</style>
