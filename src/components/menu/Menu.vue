<template>
  <!--Navbar-->
  <mdb-navbar class="background-explorer" scrolling dark spand>
    <img src="@/assets/logo/proximax-white.png" height="30">
    <mdb-navbar-toggler>
      <mdb-navbar-nav nav right>
        <mdb-nav-item href="#" @click.prevent="navExplorer()">Explorer</mdb-nav-item>
        <mdb-dropdown tag="li">
          <mdb-dropdown-toggle tag="a" navLink class="background-explorer" slot="toggle">Select Node</mdb-dropdown-toggle>
          <mdb-dropdown-menu right>
            <mdb-dropdown-item v-for="node in nodes" :key="node">{{node}}</mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import { mdbNavbar, mdbNavbarNav, mdbNavItem, mdbNavbarToggler, mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem } from 'mdbvue'
import requestService from '@/services/RequestService'

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
    let nodes = requestService.getAllNodes()

    return {
      nodes: nodes.nodes
    }
  },
  methods: {
    navExplorer () {
      this.$router.push('/explorer')
      return
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
</style>
