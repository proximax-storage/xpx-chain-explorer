
export default class localService {

  constructor() {
    this.mosaicsName = JSON.parse(localStorage.getItem('mosaicsName'))
    this.namespaceName = JSON.parse(localStorage.getItem('namespaceName'))
  }

  setNamespaceName (id, name) {
    if (this.namespaceName == null) {
      this.namespaceName = {}
    }
    if (!this.namespaceName.hasOwnProperty(id)) {
      this.namespaceName[id] = name
      localStorage.setItem('namespaceName', JSON.stringify(this.namespaceName))
    }    
  }

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
