<template>
  <!--Navbar-->
  <mdb-navbar class="background-explorer" scrolling dark spand>
    <img src="@/assets/logo/proximax-white.png" height="30">
    <mdb-navbar-toggler>
      <mdb-navbar-nav nav right>
        <a href="#" class="nav-link navbar-link text-white" @click="navExplorer()">Explorer</a>
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
      "http://bctestnet1.xpxsirius.io:3000",
      "http://bctestnet2.xpxsirius.io:3000",
      "https://catapult.mocd.gov.ae/"
    ]

    const nodeSelected = localStorage.getItem('nodeSelected')

    return {
      nodes: nodes,
      nodeSelected: nodeSelected
    }
  },
  methods: {
    navExplorer: function() {
      this.$router.push('/explorer')
      return
    },
    changeNode: function (node) {
      localStorage.setItem('nodeSelected', node)  
      this.nodeSelected = node
      this.$router.push('/explorer')
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

</style>
