import data from '../assets/json/nodes.json'
import { Observable, BehaviorSubject } from 'rxjs'
import {
  BlockchainHttp,
  QueryParams,
  MosaicHttp,
  Address,
  AccountHttp,
  Id,
  MosaicId
} from 'proximax-nem2-sdk'

export default class Service {

  constructor() {
    this.blocksHeight = new BehaviorSubject(null)
    this.mosaicHttp = new MosaicHttp('http://bctestnet1.xpxsirius.io:3000')
    this.blocksHeight$ = this.blocksHeight.asObservable()
    this.nodes = data
    this.blockchainHttp = new BlockchainHttp('http://bctestnet1.xpxsirius.io:3000')
    this.accountHttp = new AccountHttp('http://bctestnet1.xpxsirius.io:3000')
    this.accountInfo = {}
  }

  /**
   * Create an Address from a given raw address.
   *
   * @param {*} address
   * @returns {Address}
   * @memberof NemProvider
   */
  createFromRawAddress(address) {
    console.log("desde el servicio",Address.createFromRawAddress(address));
    return Address.createFromRawAddress(address)
  }

  /**
   * Get blocks height local
   *
   * @returns
   * @memberof Service
   */
  getBlocksHeightLocal() {
    return this.blocksHeight$
  }


  /**
   * Set blocks height local
   *
   * @param param
   * @memberof Service
   */
  setBlocksHeightLocal(param) {
    this.blocksHeight.next(param.compact())
  }

  /**
   *Gets an AccountInfo for an account.
   *
   * @param {Address} address
   * @returns {Observable}
   * @memberof Service
   */
  getAccountInfo(address) {
    return this.accountHttp.getAccountInfo(address)
  }


  getAllTransactionsFromAccount(publicAccount, queryParams = 10) {
    return this.accountHttp.transactions(publicAccount, new QueryParams(queryParams))
  }

  /**
   * Get mosaic
   *
   * @param {any} mosaicId
   * @returns
   * @memberof NemProvider
   */
  getMosaic(mosaicId) {
    return this.mosaicHttp.getMosaic(mosaicId)
  }

  /**
   *
   *
   * @param {any} param
   * @returns
   * @memberof NemProvider
   */
  getMosaicId(id) {
    return new MosaicId(id);
  }

  getMosaicsName(mosaicIds) {
    return this.mosaicHttp.getMosaicsName(mosaicIds)
  }


  /**
   *
   *
   * @param {any} amount
   * @param {any} divisibility
   * @returns
   * @memberof NemProvider
   */
  formatterAmount(amount, divisibility) {
    const amountDivisibility = parseFloat(amount / Math.pow(10, divisibility))
    return (amountDivisibility).toLocaleString('en-us', { minimumFractionDigits: divisibility })
  }

  /**
   * Get mosaic name from hexadecimal
   *
   * @param {any} id
   * @returns
   * @memberof NemProvider
   */
  getMosaicNameFromHex(id) {
    const idFromHex = Id.fromHex(id);
    const mosaicId = this.getMosaicId([idFromHex.lower, idFromHex.higher]);
    return this.getMosaicsName([mosaicId]);
  }

  getAllNodes () {
    return this.nodes.nodes
  }

}
