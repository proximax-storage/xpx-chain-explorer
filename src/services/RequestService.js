import Axios from "axios";
import data from '../assets/json/nodes.json';

Axios.defaults.headers.common.Accept = 'application/json'

export default {
  getNodes(url){
    return this.Axios.get(url)
      .then(function (res) {
        console.log('Esta es la respuesta', res)
      })
      .catch(function (err) {
        console.error(`Este es un Errorrr ${err}`)
      })
  },
  
  /**
   * Add an array of nodes in the storage
   *
   * @param {any} nodes
   * @memberof RequestService
   */
  setArrayNode(nodes) {
    localStorage.setItem(this.nameItemsArrayStorage, JSON.stringify(nodes));
  },

  /**
   * Get a node selected
   *
   * @return object
   * @memberof RequestService
   */
  getNodeSelected() {
    return JSON.parse(localStorage.getItem(this.nameItemSelectedStorage));
  },

  /**
   * Get all nodes
   *
   * @returns
   * @memberof RequestService
   */
  getAllNodes() {    
    return data
  }
}