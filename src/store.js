import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nodes: undefined,
    currentNode: 'bctestnet1.xpxsirius.io:3000',
    currentBlock: { height: 'Loading' },
    errorInfo: { active: false, message: '', submessage: '' },
    loaderActive: true
  },
  mutations: {
    UPDATE_NODES: (state, data) => {
      state.nodes = data
      state.currentNode = state.nodes[0]
    },
    UPDATE_CURRENT_NODE: (state, index) => {
      state.currentNode = state.nodes[index]
      localStorage.setItem('currentNode', state.currentNode)
    },
    UPDATE_CURRENT_BLOCK: (state, data) => {
      state.currentBlock = data
    },
    UPDATE_ERROR_INFO: (state, data) => {
      state.errorInfo = data
    },
    CHANGE_LOADER: (state, data) => {
      console.log('CHANGE_LOADER')
      state.loaderActive = data
    }
  },
  actions: {
    updateNodes ({ commit }, data) {
      commit('UPDATE_NODES', data)
    },
    updateCurrentNode ({ commit }, index) {
      commit('UPDATE_CURRENT_NODE', index)
    },
    changeCurrentBlock ({ commit }, data) {
      commit('UPDATE_CURRENT_BLOCK', data)
    },
    updateErrorInfo ({ commit }, data) {
      commit('UPDATE_ERROR_INFO', data)
    },
    changeLoader ({ commit }, data) {
      console.log('changeLoader')
      commit('CHANGE_LOADER', data)
    }
  },
  getters: {
    getCurrentBlock: state => state.currentBlock.height,
    getAllNodes: state => state.nodes,
    getCurrentNode: state => {
      let memoryNode = localStorage.getItem('currentNode')
      return (memoryNode === '' || memoryNode === undefined) ? state.currentNode : memoryNode
    },
    getErrorInfo: state => state.errorInfo,
    getLoaderState: state => state.loaderActive
  }
})
