/**
 * Class responsible for making changes to the explorer's storage
 */
export default class localService {

  constructor() {
    this.mosaicsName = JSON.parse(localStorage.getItem('mosaicsName'))
    this.namespaceName = JSON.parse(localStorage.getItem('namespaceName'))
  }

  /**
   * Method to add a namespace to the localstorage
   * @param id to namespace in hex
   * @param name of namespace
   * @memberof localService
   */
  setNamespaceName (id, name) {
    if (this.namespaceName == null) {
      this.namespaceName = {}
    }
    if (!this.namespaceName.hasOwnProperty(id)) {
      this.namespaceName[id] = name
      localStorage.setItem('namespaceName', JSON.stringify(this.namespaceName))
    }    
  }

  /**
   * Method to add a mosaic to the localstorage
   * @param id to mosaic in hex
   * @param name of mosaic
   * @memberof localService
   */
  setMosaicName (id, name) {
    if (this.mosaicsName == null) {
      this.mosaicsName = {}
    }
    if (!this.mosaicsName.hasOwnProperty(id)) {
      this.mosaicsName[id] = name
      localStorage.setItem('mosaicsName', JSON.stringify(this.mosaicsName))
    }    
  }

}
