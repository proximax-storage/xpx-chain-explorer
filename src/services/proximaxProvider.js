import data from '../assets/json/nodes.json'
import { Observable, BehaviorSubject } from 'rxjs'
import {
  BlockchainHttp,
  QueryParams,
  MosaicHttp,
  Address,
  AccountHttp,
  Id,
  MosaicId,
  NamespaceHttp,
  PublicAccount,
  TransactionType,
  TransactionHttp,
  MosaicInfo
} from 'proximax-nem2-sdk'

export default class proximaxProvider {

  constructor() {
    this.Url = `http://${localStorage.getItem('nodeSelected')}`
    this.blocksHeight = new BehaviorSubject(null)
    this.blocksHeight$ = this.blocksHeight.asObservable()
    this.nodeSelecteds = data
    this.mosaicHttp = new MosaicHttp(this.Url)
    this.blockchainHttp = new BlockchainHttp(this.Url)
    this.accountHttp = new AccountHttp(this.Url)
    this.namespaceHttp = new NamespaceHttp(this.Url)
    this.transactionHttp = new TransactionHttp(this.Url)
    this.MosaicInfo = new MosaicInfo()
    this.accountInfo = {}
  }

  static mosaicXpx(){
    return {
      id: {
        higher: 3559101211,
        lower: 3530084852
      }
    }
  }

  static typeTransactions() {
    return {
      transfer: {
        id: TransactionType.TRANSFER,
        name: 'Transfer Transaction'
      },
      registerNamespace: {
        id: TransactionType.REGISTER_NAMESPACE,
        name: 'Register Namespace Transaction'
      },
      mosaicDefinition: {
        id: TransactionType.MOSAIC_DEFINITION,
        name: 'Mosaic definition'
      },
      mosaicSupplyChange: {
        id: TransactionType.MOSAIC_SUPPLY_CHANGE,
        name: 'Mosaic supply change'
      },
      modifyMultisigAccount: {
        id: TransactionType.MODIFY_MULTISIG_ACCOUNT,
        name: 'Modify multisig account'
      },
      aggregateComplete: {
        id: TransactionType.AGGREGATE_COMPLETE,
        name: 'Aggregate complete'
      },
      aggregateBonded: {
        id: TransactionType.AGGREGATE_BONDED,
        name: 'Aggregate bonded'
      },
      lock: {
        id: TransactionType.LOCK,
        name: 'Lock'
      },
      secretLock: {
        id: TransactionType.SECRET_LOCK,
        name: 'Secret lock'
      },
      secretProof: {
        id: TransactionType.SECRET_PROOF,
        name: 'Secret proof'
      }
    }
  }

  /**
   * createPublicAccount
   * @param publicKey
   * @param network
   * @returns {PublicAccount}
   */
  createPublicAccount(publicKey, network) {
    return PublicAccount.createFromPublicKey(publicKey, network);
  }

  /**
   * Create an Address from a given raw address.
   *
   * @param {*} address
   * @returns {Address}
   * @memberof proximaxProvider
   */
  createFromRawAddress(address) {
    console.log("desde el servicio",Address.createFromRawAddress(address));
    return Address.createFromRawAddress(address)
  }

  /**
   * Get blocks height local
   *
   * @returns
   * @memberof proximaxProvider
   */
  getBlocksHeightLocal() {
    return this.blocksHeight$
  }


  /**
   * Set blocks height local
   *
   * @param param
   * @memberof proximaxProvider
   */
  setBlocksHeightLocal(param) {
    this.blocksHeight.next(param.compact())
  }

  /**
   *Gets an AccountInfo for an account.
   *
   * @param {Address} address
   * @returns {Observable}
   * @memberof proximaxProvider
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
   * @memberof proximaxProvider
   */
  getMosaic(mosaicId) {
    return this.mosaicHttp.getMosaic(mosaicId)
  }

  /**
   *
   *
   * @param {any} param
   * @returns
   * @memberof proximaxProvider
   */
  getMosaicId(id) {
    return new MosaicId(id)
  }

  getMosaicsName(mosaicIds) {
    return this.mosaicHttp.getMosaicsName(mosaicIds)
  }

  /**
   * Get Namespaces Name From Hexadecimal
   *
   * @param {any} id
   * @returns {Observable<MosaicName[]>}
   * @memberof proximaxProvider
   */
  getNamespacesNameFromHex(id) {
    const idFromHex = Id.fromHex(id)
    const namespaceIds = this.getNameSpaceId([idFromHex.lower, idFromHex.higher])
    return this.getNamespacesName([namespaceIds])
  }

  /**
   * Get namespaces name
   *
   * @param {any} id
   * @returns
   * @memberof proximaxProvider
   */
  getNamespacesName(namespaceIds) {
    return this.namespaceHttp.getNamespacesName(namespaceIds)
  }

  /**
   * Return getTransaction from id or hash
   * @param param
   */
  getTransactionInformation(hash) {
    return this.transactionHttp.getTransaction(hash)
  }


  /**
   *
   *
   * @param {any} amount
   * @param {any} divisibility
   * @returns
   * @memberof proximaxProvider
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
   * @memberof proximaxProvider
   */
  getMosaicNameFromHex(id) {
    const idFromHex = Id.fromHex(id)   
    const mosaicId = this.getMosaicId([idFromHex.lower, idFromHex.higher]);
    return this.getMosaicsName([mosaicId]);
  }

  getAllNodes () {
    return this.nodes.nodes
  }

}
