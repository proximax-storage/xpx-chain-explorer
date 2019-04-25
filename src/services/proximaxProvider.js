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
  MosaicInfo,
  MosaicService
} from 'proximax-nem2-sdk'

export default class proximaxProvider {

  constructor() {
    this.Url = `http://${localStorage.getItem('nodeSelected')}`
    this.blocksHeight = new BehaviorSubject(null)
    this.blocksHeight$ = this.blocksHeight.asObservable()
    this.mosaicHttp = new MosaicHttp(this.Url)
    this.blockchainHttp = new BlockchainHttp(this.Url)
    this.accountHttp = new AccountHttp(this.Url)
    this.namespaceHttp = new NamespaceHttp(this.Url)
    this.transactionHttp = new TransactionHttp(this.Url)
    this.MosaicInfo = new MosaicInfo()
    this.mosaicService = new MosaicService(this.accountHttp, this.mosaicHttp, this.namespaceHttp)
    this.accountInfo = {}
  }

  /**
   * Get id mosaic xpx
   *
   * @memberof proximaxProvider
   */
  static mosaicXpx(){
    return 'd423931bd268d1f4'
  }

  /**
   * Get id,name mosaic xpx
   *
   * @memberof proximaxProvider
   */
  static mosaicFullXpx(){
    return {
      id: 'd423931bd268d1f4',
      name: 'prx:xpx'
    }
  }

  /**
   * Get id,name namespace xpx
   *
   * @memberof proximaxProvider
   */
  static namespaceXpx(){
    return {
      id: '316d77fd8b6fb3be',
      name: 'prx'
    }
  }

  /**
   * Get type transactions
   *
   * @memberof proximaxProvider
   */
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
   * Create public account
   * 
   * @param publicKey
   * @param network
   * @returns {Observable} PublicAccount
   * @memberof proximaxProvider
   */
  createPublicAccount(publicKey, network) {
    return PublicAccount.createFromPublicKey(publicKey, network);
  }

  /**
   * Create an Address from a given raw address.
   *
   * @param address
   * @returns {Observable} Address
   * @memberof proximaxProvider
   */
  createFromRawAddress(address) {
    return Address.createFromRawAddress(address)
  }

  /**
   * Get block height
   *
   * @returns {Observable} Address
   * @memberof proximaxProvider
   */
  getBlocksHeightLocal() {
    return this.blocksHeight$
  }


  /**
   * Set blocks height local
   *
   * @param param
   * @returns {Observable} BlockHeight
   * @memberof proximaxProvider
   */
  setBlocksHeightLocal(param) {
    this.blocksHeight.next(param.compact())
  }

  /**
   * Gets an AccountInfo for an account.
   *
   * @param address
   * @returns {Observable} accountHttp
   * @memberof proximaxProvider
   */
  getAccountInfo(address) {
    return this.accountHttp.getAccountInfo(address)
  }

  /**
   * Get all transactions from an account
   *
   * @param address
   * @returns {Observable} accountHttp
   * @memberof proximaxProvider
   */
  getAllTransactionsFromAccount(publicAccount, queryParams = 10) {
    return this.accountHttp.transactions(publicAccount, new QueryParams(queryParams))
  }

  /**
   * Get mosaic
   *
   * @param mosaicId
   * @returns {Observable} mosaicHttp
   * @memberof proximaxProvider
   */
  getMosaic(mosaicId) {
    return this.mosaicHttp.getMosaic(mosaicId)
  }

  /**
   * Get mosaic Class
   *
   * @param id
   * @returns {Class} MosaicId
   * @memberof proximaxProvider
   */
  getMosaicId(id) {
    return new MosaicId(id)
  }

  /**
   * Get mosaics name
   *
   * @param mosaicIds
   * @returns {Observable} mosaicHttp
   * @memberof proximaxProvider
   */
  getMosaicsName(mosaicIds) {
    return this.mosaicHttp.getMosaicsName(mosaicIds)
  }

  /**
   * Get Namespaces Name From Hexadecimal
   *
   * @param id
   * @returns {Observable} getNamespacesName
   * @memberof proximaxProvider
   */
  getNamespacesNameFromHex(id) {
    const idFromHex = Id.fromHex(id)
    const namespaceIds = this.getNameSpaceId([idFromHex.lower, idFromHex.higher])
    return this.getNamespacesName([namespaceIds])
  }

  /**
   * Get namespace name
   *
   * @param namespaceIds
   * @returns {Observable} namespaceHttp
   * @memberof proximaxProvider
   */
  getNamespacesName(namespaceIds) {
    return this.namespaceHttp.getNamespacesName(namespaceIds)
  }

  /**
   * Get transaction for hash
   *
   * @param hash
   * @returns {Observable} transactionHttp
   * @memberof proximaxProvider
   */
  getTransactionInformation(hash) {
    return this.transactionHttp.getTransaction(hash)
  }

  /**
   * Get mosaic name from hexadecimal
   *
   * @param id
   * @returns MosaicName
   * @memberof proximaxProvider
   */
  getMosaicNameFromHex(id) {
    const idFromHex = Id.fromHex(id)   
    const mosaicId = this.getMosaicId([idFromHex.lower, idFromHex.higher]);
    return this.getMosaicsName([mosaicId]);
  }

}
