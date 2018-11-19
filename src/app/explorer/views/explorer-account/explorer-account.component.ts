import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MosaicId, Transaction, Address, TransactionType, BlockInfo } from 'proximax-nem2-sdk';
import { AppConfig } from '../../../config/app.config';
import { NemProvider } from '../../../shared/services/nem.provider';
import { NodeService } from '../../../dashboard/services/node.service';
import { SharedService } from '../../../shared';


@Component({
  selector: 'app-explorer-account',
  templateUrl: './explorer-account.component.html',
  styleUrls: ['./explorer-account.component.scss']
})
export class ExplorerAccountComponent implements OnInit {

  address = this.route.snapshot.paramMap.get('account');
  blocksHeight = null;
  showInfoMosaic = false;
  elements = [];
  dataSelected = {};
  showAccountInfo = false;
  accountInfo = {};
  showRecentTransaction = false;
  observables = [];

  constructor(
    private nemProvider: NemProvider,
    private nodeService: NodeService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router
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
        this.accountInfo = resp;
        if (resp.mosaics.length > 0) {
          this.showInfoMosaic = true;
          this.nemProvider.getNameMosaicFromHex(this.accountInfo['mosaics'][0].id.toHex()).subscribe(
            name => {
              this.accountInfo['nameMosaic'] = name[0].name;
            }
          );
        }

        this.showAccountInfo = true;
        this.viewTransactionsFromPublicAccount(resp.publicAccount);
      },
      error => {
        console.log('getAccountInfo', error);
        this.router.navigate([`/${AppConfig.routes.explorer}`]);
        this.sharedService.showError('', `Resource not found`);
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
        transactions.forEach(element => {
          if (element.type === TransactionType.TRANSFER) {
            element['isSigner'] = (this.address === element['signer'].address['address']);
          }
        });
        this.elements = transactions;
        this.showRecentTransaction = true;
      },
      error => {
        console.log('transactions', error);
        this.router.navigate([`/${AppConfig.routes.explorer}`]);
        this.sharedService.showError('', `Resource not found`);
      }
    );
  }


}
