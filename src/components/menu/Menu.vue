<template>
<div>
  <!-- Navbar-->
  <mdb-navbar class="background-explorer nav-xplorer" dark spand>
    <div class="row">
      <img src="@/assets/logo/proximax-white.png" height="30">
      <mdb-navbar-toggler>
        <mdb-navbar-nav nav>
          <a href="#" class="nav-link navbar-link text-white" @click="navExplorer()">Blocks</a>
          <mdb-dropdown tag="li">
            <mdb-dropdown-toggle tag="a" navLink class="background-explorer" slot="toggle">Select Node</mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <a href="#" class="dropdown-item" :class="{ active : nodeSelected === node}"  v-for="node in nodes" :key="node" @click="changeNode(node)">{{node}}</a>
            </mdb-dropdown-menu>
          </mdb-dropdown>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </div>
    <span class="text-white block">Current Block: <strong v-html="currentBlock"></strong></span>
  </mdb-navbar>
</div>
</template>

<script>
import { mdbNavbar, mdbNavbarNav, mdbNavItem, mdbNavbarToggler, mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem } from 'mdbvue'
import { Listener, Deadline } from "proximax-nem2-sdk"
import Utils from '@/services/Utils'
import EventBus from '@/eventBus'
import proximaxProvider from '@/services/proximaxProvider'
import axios from 'axios'

var _proximaxProvider

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
  mounted: function() {
    EventBus.$on('ActivateNodes', (nodes) => {
      this.nodes = nodes
      _proximaxProvider = new proximaxProvider()    
      let nodeSelected = localStorage.getItem('nodeSelected')
      console.log("Esta es una prueba", nodeSelected)
      if (nodeSelected === null) {
        nodeSelected = this.nodes[0]
        localStorage.setItem('nodeSelected', this.nodes[0])
      }
      this.connectWS(nodeSelected)
      this.nodeSelected = nodeSelected
      _proximaxProvider.blockchainHttp.getBlockchainHeight().subscribe(
        next => {
          _proximaxProvider.setBlocksHeightLocal(next)
          this.currentBlock = next.compact()
        },
        error => {
          console.log("Errorrrrr")        
        }
      )
    })
  },
  data () {
    return {
      nodes: null,
      nodeSelected: null,
      connector: null,
      currentBlock: null
    }
  },
  methods: {
    changeNode: function (node) {
      localStorage.setItem('nodeSelected', node)
      this.nodeSelected = node
      this.$router.push('/')
      location.reload()
    },
    navExplorer: function () {
      this.$router.push('/')
    },
    connectWS: function (node) {
      const listener = new Listener(`ws://${node}`, WebSocket)
      listener.open().then(() => {
        listener
          .newBlock()
          .subscribe(block => {
            block.numTransactions = (block.numTransactions === undefined) ? 0 : block.numTransactions
            block.totalFee = Utils.fmtAmountValue(block.totalFee.compact())
            block.date = Utils.fmtTime(new Date(block.timestamp.compact() + (Deadline.timestampNemesisBlock * 1000)))
            EventBus.$emit('CurrentBlock', block)
            this.currentBlock = block.height.compact()
          }, err => console.error(err))
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

  .nav-xplorer {
    display: flex;
    justify-content: space-between;
  }

  img {
    margin: 5px 10px 5px 10px;
  }

</style>
