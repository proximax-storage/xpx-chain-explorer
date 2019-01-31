import Axios from "axios";

Axios.defaults.headers.common.Accept = 'application/json'

/**
 * Class that contains the methods of the nodes
 * 
 * @param url indicates the route for the http request
 * @property axios, It is where the axios library is imported to make the requests
 * @property url, It is replaced by the parameter to make the request
 */
export default class requestService {
  
  constructor(url) {
    this.axios = Axios
    this.url = url
  }
  
  getNodes(){
    return this.Axios.get(this.url)
      .then(function (res) {
        console.log(`Esta es la respuesta ${res}`)
      })
      .catch(function (err) {
        console.error(`Este es un Errorrr ${err}`)
      })
  }
}