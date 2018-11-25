import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  Listener,
  Password,
  SimpleWallet,
  Account,
  Address,
  AccountHttp,
  MosaicHttp,
  NamespaceHttp,
  MosaicService,
  MosaicAmountView,
  Transaction,
  PublicAccount,
  QueryParams,
  AccountInfo,
  NetworkType,
  TransactionHttp,
  TransferTransaction,
  Deadline,
  PlainMessage,
  SignedTransaction,
  TransactionAnnounceResponse,
  Mosaic,
  MosaicId,
  UInt64,
  XEM,
  TransactionStatusError,
  TransactionStatus,
  BlockchainHttp,
  NamespaceId,
  Id,
} from 'proximax-nem2-sdk';

import { environment } from '../../../environments/environment';
import { CommonInterface, WalletInterface } from '../interfaces/shared.interfaces';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NemProvider {

  blocksHeight: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  blocksHeight$: Observable<number> = this.blocksHeight.asObservable();
  nameSpace = 'prx';
  transactionHttp: TransactionHttp;
  websocketIsOpen = false;
  connectionWs: Listener;
  accountHttp: AccountHttp;
  mosaicHttp: MosaicHttp;
  namespaceHttp: NamespaceHttp;
  mosaicService: MosaicService;
  transactionStatusError: TransactionStatusError;
  blockchainHttp: BlockchainHttp;
  url: any;

  constructor() { }

  initInstances(url) {
    this.url = `http://${url}`;
    this.transactionHttp = new TransactionHttp(this.url);
    this.accountHttp = new AccountHttp(this.url);
    this.mosaicHttp = new MosaicHttp(this.url);
    this.namespaceHttp = new NamespaceHttp(this.url);
    this.mosaicService = new MosaicService(this.accountHttp, this.mosaicHttp, this.namespaceHttp);
    this.transactionHttp = new TransactionHttp(this.url);
    this.blockchainHttp = new BlockchainHttp(this.url);
  }


  /**
 * createPublicAccount
 * @param publicKey
 * @param network
 * @returns {PublicAccount}
 */
  createPublicAccount(publicKey, network): PublicAccount {
    return PublicAccount.createFromPublicKey(publicKey, network);
  }


  /**
   * Create an Address from a given raw address.
   *
   * @param {*} address
   * @returns {Address}
   * @memberof NemProvider
   */
  createFromRawAddress(address: string): Address {
    return Address.createFromRawAddress(address);
  }

  /**
   *Gets an AccountInfo for an account.
   *
   * @param {Address} address
   * @returns {Observable<AccountInfo>}
   * @memberof NemProvider
   */
  getAccountInfo(address: Address): Observable<AccountInfo> {
    console.log('address', address);
    return this.accountHttp.getAccountInfo(address);
  }

  /**
   *Gets an array of confirmed transactions for which an account is signer or receiver.
   *
   * @param {*} publicKey
   * @param {NetworkType} network
   * @param {QueryParams} [queryParams]
   * @returns {Observable<Transaction[]>}
   * @memberof NemProvider
   */
  getAllTransactionsFromAccount(publicAccount, queryParams?): Observable<Transaction[]> {
    return this.accountHttp.transactions(publicAccount, new QueryParams(queryParams));
  }

  /**
   * Gets a transaction for a transactionId
   *
   * @param {string} transactionId
   * @returns {Observable<Transaction>}
   * @memberof NemProvider
   */
  getTransaction(transactionId: string): Observable<Transaction> {
    return this.transactionHttp.getTransaction(transactionId);
  }


  /**
   * Return getTransaction from id or hash
   * @param param
   */
  getTransactionInformation(hash): Observable<Transaction> {
    return this.transactionHttp.getTransaction(hash);
  }


  /**
   * Set blocks height local
   *
   * @param {any} param
   * @memberof NemProvider
   */
  setBlocksHeightLocal(param) {
    this.blocksHeight.next(param.compact());
  }

  /**
   * Get blocks height local
   *
   * @returns
   * @memberof NemProvider
   */
  getBlocksHeightLocal() {
    return this.blocksHeight$;
  }

  getMosaicId(param) {
    return new MosaicId(param);
  }

  /**
   * Get mosaic
   *
   * @param {any} mosaicId
   * @returns
   * @memberof NemProvider
   */
  getMosaic(mosaicId) {
    return this.mosaicHttp.getMosaic(mosaicId);
  }


  /**
   * Get  mosaics information for a given namespace.
   *
   * @param {any} id
   * @returns
   * @memberof NemProvider
   */
  getMosaicsFromNamespace(id) {
    const idFromHex = Id.fromHex(id);
    const namespaceId = new MosaicId([idFromHex.lower, idFromHex.higher]);
    return this.mosaicHttp.getMosaicsFromNamespace(namespaceId);
  }

  /**
   * Get name mosaic from hex
   *
   * @param {any} id
   * @returns
   * @memberof NemProvider
   */
  getNameMosaicFromHex(id) {
    const idFromHex = Id.fromHex(id);
    const mosaicId = new MosaicId([idFromHex.lower, idFromHex.higher]);
    return this.mosaicHttp.getMosaicsName([mosaicId]);
  }

  /**
   * Get namespace from hex
   *
   * @param {any} id
   * @returns
   * @memberof NemProvider
   */
  getNamespaceFromHex(id) {
    const idFromHex = Id.fromHex(id);
    const namespaceId = new NamespaceId([idFromHex.lower, idFromHex.higher]);
    return this.namespaceHttp.getNamespace(namespaceId);
  }

  /**
   * Get name of namespace
   *
   * @param {any} namespaceId
   * @returns
   * @memberof NemProvider
   */
  getNamespacesName(id) {
    const idFromHex = Id.fromHex(id);
    const namespaceId = new NamespaceId([idFromHex.lower, idFromHex.higher]);
    return this.namespaceHttp.getNamespacesName([namespaceId]);
  }


  createMosaicIdFromMosaicAndNamespace(id: string | number[]): MosaicId {
    const mosaicId = new MosaicId(id);
    return mosaicId;
  }



}
