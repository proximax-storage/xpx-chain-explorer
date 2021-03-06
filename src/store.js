import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nodes: undefined,
    currentNode: '',
    currentBlock: { height: 'Loading' },
    errorInfo: { active: false, message: '', submessage: '' },
    loaderActive: true,
    average: 'Loading',
    averageList: [0],
    blockList: [],
    rentalFeeInfo: undefined,
    netType: undefined,
    xpx: '',
    namespaceXpx: '',
    protocol: 'http:'
  },
  mutations: {
    UPDATE_NODES: (state, data) => {
      state.nodes = data
      if (localStorage.getItem('currentNode') === null && state.currentNode === '') {
        state.currentNode = state.nodes[0]
      } else {
        state.currentNode = localStorage.getItem('currentNode')
      }
    },
    UPDATE_CURRENT_NODE: (state, index) => {
      state.currentNode = state.nodes[index]
      localStorage.setItem('currentNode', state.currentNode)
    },
    UPDATE_CURRENT_BLOCK: (state, data) => {
      state.currentBlock = data

      // Array for Graphics
      if (state.blockList.length === 0) {
        state.blockList.push(data.height)
        state.blockList.unshift(data.height - 1)
      } else {
        if (state.blockList.length < 10) {
          state.blockList.push(data.height)
        } else {
          state.blockList.push(data.height)
          state.blockList.shift()
        }
      }
    },
    UPDATE_ERROR_INFO: (state, data) => {
      state.errorInfo = data
    },
    CHANGE_LOADER: (state, data) => {
      state.loaderActive = data
    },
    UPDATE_AVERAGE: (state, data) => {
      state.average = data

      if (state.averageList.length < 10) {
        state.averageList.push(data)
      } else {
        state.averageList.push(data)
        state.averageList.shift()
      }
    },
    SET_RENTAL_FEE_INFO: (state, data) => {
      state.rentalFeeInfo = data
    },
    PUSH_NEW_NODE: (state, data) => {
      state.nodes.push(data)
    },
    SET_NETWORK_TYPE: (state, data) => {
      state.netType = data
    },
    UPDATE_COIN: (state, data) => {
      state.xpx = data.mosaic.id
      state.namespaceXpx = data.namespace.id
    },
    PROTOCOL: (state, data) => {
      console.log('PROTOCOL', data)
      state.protocol = data
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
      commit('CHANGE_LOADER', data)
    },
    updateAverage ({ commit }, data) {
      commit('UPDATE_AVERAGE', data)
    },
    setRentalFeeInfo ({ commit }, data) {
      commit('SET_RENTAL_FEE_INFO', data)
    },
    pushNewNode ({ commit }, data) {
      commit('PUSH_NEW_NODE', data)
    },
    setNetworkType ({ commit }, data) {
      commit('SET_NETWORK_TYPE', data)
    },
    updateCoin ({ commit }, data) {
      commit('UPDATE_COIN', data)
    },
    setProtocol ({ commit }, data) {
      commit('PROTOCOL', data)
    },
  },
  getters: {
    getCurrentBlock: state => state.currentBlock.height,
    getAllNodes: state => state.nodes,
    getCurrentNode: state => {
      let memoryNode = localStorage.getItem('currentNode')
      return (memoryNode === '' || memoryNode === undefined) ? state.currentNode : memoryNode
    },
    getCurrentNodeProtocol: state => {
      let memoryNode =Vue.prototype.$utils.buildUrl(`${state.protocol}//${localStorage.getItem('currentNode')}`) 
      return (memoryNode === '' || memoryNode === undefined) ? `${state.protocol}//${state.currentNode}` : memoryNode
    },
    getErrorInfo: state => state.errorInfo,
    getLoaderState: state => state.loaderActive,
    getAverage: state => state.average,
    getAverageList: state => state.averageList,
    getBlockList: state => state.blockList,
    getProtocol: state => state.protocol
  }
})
