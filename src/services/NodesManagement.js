import axios from 'axios'

class NodesManagement {
  constructor (nodes) {
    this.nodes = nodes
    this.currentNode = null
    this.formatted = null
  }

  async addNewNode (node) {
    let nodeInfo

    console.log(window.location)

    try {
      nodeInfo = await axios.get(`${node}/node/info`)
      this.nodes.push(node)
      console.log('Added', nodeInfo)
    } catch (error) {
      nodeInfo = error
      console.log('Rejected', nodeInfo)
    }
  }

  updateNodes () {

  }

  selectNode (index) {
    console.log(index)
    console.log(this.nodes[index])
    localStorage.setItem('currentNode', this.nodes[index])
  }

  getDefaultNode () {
    let defaultNode = null
    if (this.nodes.length > 0) {
      defaultNode = this.nodes[0]
    }
    return defaultNode
  }

  validateNodes () {
    const customNodes = JSON.parse(localStorage.getItem('customNodes'))
    if (customNodes !== null) {
      this.nodes = this.nodes.concat(customNodes)
    }

    const currentNode = localStorage.getItem('currentNode')
    console.log(currentNode)
    if (currentNode !== null) {
      this.currentNode = (currentNode).toString()
    } else {
      this.currentNode = this.nodes[0]
      localStorage.setItem('currentNode', JSON.stringify(this.nodes[0]))
    }

    this.formatCurrentNode()
  }

  formatCurrentNode () {
    const tmpObj = {}

    if (window.location.protocol === 'http:') {
      tmpObj.http = `http://${this.currentNode}:3000`
      tmpObj.ws = `ws://${this.currentNode}:3000`
    } else if (window.location.protocol === 'https:') {
      tmpObj.http = `https://${this.currentNode}:443`
      tmpObj.ws = `wss://${this.currentNode}:443`
    } else if (window.location.protocol === 'app:') {
      tmpObj.http = `http://${this.currentNode}:3000`
      tmpObj.ws = `ws://${this.currentNode}:3000`
    }

    this.formatted = tmpObj
  }
}

export default NodesManagement
