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
  MosaicName,
  MosaicInfo,
  NamespaceInfo,
  NamespaceName,
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
   * Create mosaic id from mosaic and namespace
   *
   * @param {(string | number[])} id
   * @returns {MosaicId}
   * @memberof NemProvider
   */
  createMosaicIdFromMosaicAndNamespace(id: string | number[]): MosaicId {
    const mosaicId = new MosaicId(id);
    return mosaicId;
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
    const amountDivisibility = Number(amount / Math.pow(10, divisibility));
    return (amountDivisibility).toLocaleString('en-us', { minimumFractionDigits: divisibility });
  }


  /**
   *Gets an AccountInfo for an account.
   *
   * @param {Address} address
   * @returns {Observable<AccountInfo>}
   * @memberof NemProvider
   */
  getAccountInfo(address: Address): Observable<AccountInfo> {
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
   * Get blocks height local
   *
   * @returns
   * @memberof NemProvider
   */
  getBlocksHeightLocal() {
    return this.blocksHeight$;
  }

  /************************** MOSAICS **************************/

  /**
   * Get mosaic
   *
   * @param {any} mosaicId
   * @returns
   * @memberof NemProvider
   */
  getMosaic(mosaicId: MosaicId): Observable<MosaicInfo> {
    return this.mosaicHttp.getMosaic(mosaicId);
  }

  /**
   *
   *
   * @param {any} param
   * @returns
   * @memberof NemProvider
   */
  getMosaicId(id: string | number[]) {
    return new MosaicId(id);
  }

  /**
   * Get mosaics name
   *
   * @param {MosaicId[]} mosaicIds
   * @returns {Observable<MosaicName[]>}
   * @memberof NemProvider
   */
  getMosaicsName(mosaicIds: MosaicId[]): Observable<MosaicName[]> {
    return this.mosaicHttp.getMosaicsName(mosaicIds);
  }

  /**
   * Get mosaic name from hexadecimal
   *
   * @param {any} id
   * @returns
   * @memberof NemProvider
   */
  getMosaicNameFromHex(id): Observable<MosaicName[]> {
    const idFromHex = Id.fromHex(id);
    const mosaicId = this.getMosaicId([idFromHex.lower, idFromHex.higher]);
    return this.getMosaicsName([mosaicId]);
  }

  /**
   * Get mosaic from namespace
   *
   * @param {any} namespace
   * @returns
   * @memberof NemProvider
   */
  getMosaicsFromNamespace(namespace): Observable<MosaicInfo[]> {
    return this.mosaicHttp.getMosaicsFromNamespace(namespace);
  }

  /************************** NAMESPACE **************************/

  /**
   * Get namespace
   *
   * @param {any} id
   * @returns
   * @memberof NemProvider
   */
  getNamespace(namespaceId: NamespaceId): Observable<NamespaceInfo> {
    return this.namespaceHttp.getNamespace(namespaceId);
  }

  /**
   * Get namespace id
   *
   * @param {any} id
   * @returns
   * @memberof NemProvider
   */
  getNameSpaceId(id: string | number[]): NamespaceId {
    return new NamespaceId(id);
  }

  /**
   * Get Namespaces Name From Hexadecimal
   *
   * @param {any} id
   * @returns {Observable<MosaicName[]>}
   * @memberof NemProvider
   */
  getNamespacesNameFromHex(id): Observable<NamespaceName[]> {
    const idFromHex = Id.fromHex(id);
    const namespaceIds = this.getNameSpaceId([idFromHex.lower, idFromHex.higher]);
    return this.getNamespacesName([namespaceIds]);
  }


  /**
   * Get namespaces name
   *
   * @param {any} id
   * @returns
   * @memberof NemProvider
   */
  getNamespacesName(namespaceIds: NamespaceId[]): Observable<NamespaceName[]> {
    return this.namespaceHttp.getNamespacesName(namespaceIds);
  }

  getNamespacesLocal() {

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
}
