import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nodes: undefined,
    currentNode: 'bctestnet1.xpxsirius.io:3000',
    currentBlock: { height: 'Loading' }
  },
  mutations: {
    UPDATE_NODES: (state, data) => {
      console.log('Llego a store', data)
      state.nodes = data
      state.currentNode = state.nodes[0]
      console.log(state.currentNode)
    },
    UPDATE_CURRENT_NODE: (state, index) => {
      state.currentNode = state.nodes[index]
      localStorage.setItem('currentNode', state.currentNode)
    },
    UPDATE_CURRENT_BLOCK: (state, data) => {
      state.currentBlock = data
    }
  },
  actions: {
    updateNodes ({ commit }, data) {
      commit('UPDATE_NODES', data)
    },
    updateCurrentNode ({ commit }, index) {
      console.log('LLEGA AQUI')
      commit('UPDATE_CURRENT_NODE', index)
    },
    changeCurrentBlock ({ commit }, data) {
      commit('UPDATE_CURRENT_BLOCK', data)
    },
  },
  getters: {
    getCurrentBlock: state => state.currentBlock.height,
    getAllNodes: state => state.nodes,
    getCurrentNode: state => {
      let memoryNode = localStorage.getItem('currentNode')
      return (memoryNode === '' || memoryNode === undefined) ? state.currentNode : memoryNode
    }
  }
})
