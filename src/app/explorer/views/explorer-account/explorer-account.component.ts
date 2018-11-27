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
  transactionsFromPublicAccount = [];
  dataSelected = {};
  showAccountInfo = false;
  accountInfo = {};
  showRecentTransaction = false;
  observables = [];
  infoMosaic = {};
  mosaicsArray = [];

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
      this.transactionsFromPublicAccount = [];
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
   * Obtain account information and search for
   * all transactions from the public account
   *
   *
   * @param {any} account
   * @memberof ExplorerDetailComponent
   */
  getInfoAccountAndViewTransactions(account) {
    this.nemProvider.getAccountInfo(Address.createFromRawAddress(account)).subscribe(
      resp => {
        this.accountInfo = resp;
        this.showAccountInfo = true;
        this.viewTransactionsFromPublicAccount(resp.publicAccount);
        if (resp.mosaics.length > 0) {
          // for (let index = 0; index < 5; index++) {
            resp.mosaics.forEach(element => {
              this.buildMosaic(element);
            });
          // }

        }
      },
      error => {
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
            element['isSigner'] = this.address === element['signer'].address['address'];
          }
        });
        this.transactionsFromPublicAccount = transactions;
        this.showRecentTransaction = true;
      },
      error => {
        this.showRecentTransaction = false;
        // this.router.navigate([`/${AppConfig.routes.explorer}`]);
        // this.sharedService.showError('', `Resource not found`);
      }
    );
  }

  /**
   * build a mosaic, obtaining mosaic information, name and format the amount.
   *
   * @param {any} infoBasicMosaic
   * @memberof ExplorerAccountComponent
   */
  buildMosaic(infoBasicMosaic) {
    this.nemProvider.getMosaic(infoBasicMosaic.id).subscribe(
      next => {
        const arrayMosaic = next;
        arrayMosaic['formattedAmount'] = this.nemProvider.formatterAmount(infoBasicMosaic.amount.compact(), next.divisibility);
        arrayMosaic['infoBasicMosaic'] = infoBasicMosaic;
        this.nemProvider.getNameMosaicFromHex(infoBasicMosaic.id.toHex()).subscribe(
          response => {
            arrayMosaic['nameMosaic'] = response[0].name;
            this.mosaicsArray.push(arrayMosaic);
            if (!this.showInfoMosaic) { this.showInfoMosaic = true; }
          }
        );
      }
    );
  }
}
