import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NodeService } from '../../../dashboard/services/node.service';
import { NemProvider } from '../../../shared/services/nem.provider';
import { AppConfig } from '../../../config/app.config';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-explorer-hash',
  templateUrl: './explorer-hash.component.html',
  styleUrls: ['./explorer-hash.component.scss']
})
export class ExplorerHashComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  showInfoMosaic = false;
  transactionInfo = {};
  hash = this.route.snapshot.paramMap.get('hash');
  observables = [];
  showTransactionInfo = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private nodeService: NodeService,
    private nemProvider: NemProvider,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.observables['transactionByHash'] = this.nodeService.getNodeObservable().subscribe(next => {
      this.getTransactions();
    });
  }

  ngOnDestroy() {
    this.observables['transactionByHash'].unsubscribe();
  }

  getTransactions() {
    this.blockUI.start('Loading...');
    this.nemProvider.getTransactionInformation(this.hash).subscribe(
      resp => {
        this.transactionInfo = resp;
        this.showTransactionInfo = true;
        if (Object.keys(this.transactionInfo).length > 0) {
          if (resp['mosaics'] !== undefined && resp['mosaics'].length > 0) {
            this.nemProvider.getMosaicNameFromHex(resp['mosaics'][0].id.toHex()).subscribe(
              name => {
                this.transactionInfo['mosaics'][0]['nameMosaic'] = name[0].name;
                this.showInfoMosaic = true;
                this.blockUI.stop();
              }, error => this.blockUI.stop()
            );
          } else {
            this.blockUI.stop();
          }
        } else {
          this.blockUI.stop();
        }
      },
      error => {
        this.showInfoMosaic = false;
        this.showTransactionInfo = false;
        this.transactionInfo = {};
        this.sharedService.showError('', `Resource not found`);
        this.blockUI.stop();
        this.router.navigate([`/${AppConfig.routes.explorer}`]);
      }
    );
  }

}
