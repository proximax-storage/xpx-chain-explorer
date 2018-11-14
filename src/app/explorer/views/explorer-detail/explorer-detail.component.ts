import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MosaicId, Transaction, Address, TransactionType, BlockInfo } from 'nem2-sdk';
import { AppConfig } from '../../../config/app.config';
import { NemProvider } from '../../../shared/services/nem.provider';
import { NodeService } from '../../../dashboard/services/node.service';
import { SharedService } from '../../../shared';


@Component({
  selector: 'app-explorer-detail',
  templateUrl: './explorer-detail.component.html',
  styleUrls: ['./explorer-detail.component.scss']
})
export class ExplorerDetailComponent implements OnInit {

  address = this.route.snapshot.paramMap.get('account');
  blocksHeight = null;
  showInfoMosaic = false;
  elements = [];
  dataSelected = {};
  showAccountInfo = false;
  accountInfo = {};
  showRecentTransaction = false;
  observables = ['numberBlock'];

  constructor(
    private nemProvider: NemProvider,
    private nodeService: NodeService,
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {
  }


  ngOnInit() {
    this.observables['getNodeObservable'] = this.nodeService.getNodeObservable().subscribe(next => {
      this.blocksHeight = null;
      this.showInfoMosaic = false;
      this.elements = [];
      this.dataSelected = {};
      this.showAccountInfo = false;
      this.accountInfo = {};
      this.showRecentTransaction = false;
      this.getInfoAccountAndViewTransactions(this.address);
    });
  }


  ngOnDestroy() {
    this.observables['getNodeObservable'].unsubscribe();
  }


  /**
   * Obtain account information and search for all transactions from the public account
   *
   * @param {any} account
   * @memberof ExplorerDetailComponent
   */
  getInfoAccountAndViewTransactions(account) {
    this.nemProvider.getAccountInfo(Address.createFromRawAddress(account)).subscribe(
      resp => {
        console.log('INFO ACCOUNT', resp);
        this.accountInfo = resp;
        console.log(resp.mosaics.length);
        if (resp.mosaics.length > 0) {
          this.showInfoMosaic = true;
        }

        this.showAccountInfo = true;
        this.viewTransactionsFromPublicAccount(resp.publicAccount);
      },
      error => {
        console.log('error', error);
      }
    );
  }


  /**
   * Verify if there is an observable variable that has the number of blocks,
   * if it does not exist, consult the blocks and assign it to the observable variable
   *
   * @memberof ExplorerDetailComponent
   */
  viewBlockHeight() {
    this.observables['numberBlock'] = this.nemProvider.getBlocksHeightLocal().subscribe(
      next => {
        if (next === null) {
          this.nemProvider.blockchainHttp.getBlockchainHeight().subscribe(
            rsp => {
              this.nemProvider.setBlocksHeightLocal(rsp);
            }
          );
        } else {
          this.blocksHeight = next;
        }
      }
    );
  }

  /**
   * Search all transactions from the public account
   *
   * @param {any} publicAccount
   * @memberof ExplorerDetailComponent
   */
  viewTransactionsFromPublicAccount(publicAccount) {
    this.nemProvider.getAllTransactionsFromAccount(publicAccount, 100).subscribe(
      transactions => {
        console.log('mis transactions', transactions);
        transactions.forEach(element => {
          if (element.type === TransactionType.TRANSFER) {
            element['isSigner'] = (this.address === element['signer'].address['address']);
          }
        });
        this.elements = transactions;
        this.showRecentTransaction = true;
      }
    );
  }


}
