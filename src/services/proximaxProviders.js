import { Observable, BehaviorSubject } from 'rxjs'
import {
  BlockHttp,
  ChainHttp,
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
  MosaicService,
  NetworkType
} from 'tsjs-xpx-chain-sdk'

export default class proximaxProvider {

  constructor(url) {
    this.Url = url
    this.blocksHeight = new BehaviorSubject(null)
    this.blocksHeight$ = this.blocksHeight.asObservable()
    this.mosaicHttp = new MosaicHttp(this.Url)
    this.blockHttp = new BlockHttp(this.Url)
    this.chainHttp = new ChainHttp(this.Url)
    this.accountHttp = new AccountHttp(this.Url)
    this.namespaceHttp = new NamespaceHttp(this.Url)
    this.transactionHttp = new TransactionHttp(this.Url)
    this.MosaicInfo = new MosaicInfo()
    this.mosaicService = new MosaicService(this.accountHttp, this.mosaicHttp, this.namespaceHttp)
    this.accountInfo = {}
    this.NetworkType = NetworkType
  }

  /**
   * Get id mosaic xpx
   *
   * @memberof proximaxProvider
   */
  static mosaicXpx(){
    return '13BFC518E40549D7'
  }

  /**
   * Get id,name mosaic xpx
   *
   * @memberof proximaxProvider
   */
  static mosaicFullXpx(){
    return {
      id: '13BFC518E40549D7',
      name: 'prx.xpx'
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
      },
      mosaicAlias: {
        id: TransactionType.MOSAIC_ALIAS,
        name: 'Mosaic Alias'
      },
      addressAlias: {
        id: TransactionType.ADDRESS_ALIAS,
        name: 'Address Alias'
      },
      modifyAccountPropertyAddress: {
        id: TransactionType.MODIFY_ACCOUNT_PROPERTY_ADDRESS,
        name: 'Modify Account Property Address'
      },
      modifyAccountPropertyMosaic: {
        id: TransactionType.MODIFY_ACCOUNT_PROPERTY_MOSAIC,
        name: 'Modify Account Property Mosaic'
      },
      modifyAccountPropertyEntityType: {
        id: TransactionType.MODIFY_ACCOUNT_PROPERTY_ENTITY_TYPE,
        name: 'Modify Account Entity Type'
      },
      linkAccount: {
        id: TransactionType.LINK_ACCOUNT,
        name: 'Link Account'
      },
      modifyAccountMetadata: {
        id: TransactionType.MODIFY_ACCOUNT_METADATA,
        name: 'Modify Account Metadata'
      },
      modifyMosaicMetadata: {
        id: TransactionType.MODIFY_MOSAIC_METADATA,
        name: 'Modify Mosaic Metadata'
      },
      modifyNamespaceMetadata: {
        id: TransactionType.MODIFY_NAMESPACE_METADATA,
        name: 'Modify Namespace Metadata'
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
   * Create an Address from a given raw address.
   *
   * @param {Array} id
   * @returns {Observable} Address
   * @memberof proximaxProvider
   */
  createMosaicId(id) {
    return new MosaicId(id)
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


  // /**
  //  * Set blocks height local
  //  *
  //  * @param param
  //  * @returns {Observable} BlockHeight
  //  * @memberof proximaxProvider
  //  */
  // setBlocksHeightLocal(param) {
  //   this.blocksHeight.next(param.compact())
  // }

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
    return this.mosaicHttp.getMosaicsNames(mosaicIds)
  }

  /**
   * Get Namespaces From Account
   *
   * @param account
   * @returns {Observable} getNamespaces
   * @memberof proximaxProvider
   */
  getNamespacesFromAccount(account) {
    return this.namespaceHttp.getNamespacesFromAccount(account)
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
   * Get namespace name
   *
   * @param namespaceInfo
   * @returns { Observable } namespaceHttp
   * @memberof proximaxProvider
   */
  getNamespacesInfo(namespaceIds) {
    return this.namespaceHttp.getNamespace(namespaceIds)
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

  /**
   * Get All Networks
   *
   * It is a function that collects all the constants that contain the data
   * of the available networks from the sdk of proximax, filters and cleans,
   * to return an array of objects that contain in each element the name and
   * the numeric value of all the networks
   */
  getAllNetworks() {
    let object = this.NetworkType
    let arrTmp = []
    let arrFinal = []

    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        let element = object[key];
        arrTmp.push({ name: key, value: element })
      }
    }

    arrTmp.forEach(el => {
      if (isNaN(parseInt(el.network))) {
        arrFinal.push(el)
      }
    })

    return arrFinal
  }

  /**
   * Get Network By Id
   *
   * This is a method that uses the 'getAllNetworks' function and the 'id'
   * parameter to filter and return information from a network in an object
   * that contains the name and numerical value of that network
   *
   * @param { Number } id
   */
  getNetworkById(id) {
    let networks = this.getAllNetworks()
    let found = networks.filter(el => el.value === id)
    return (found.length !== 0) ? found[0] : null
  }
}
