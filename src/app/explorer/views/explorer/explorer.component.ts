import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MosaicId, Transaction, Address, BlockInfo, Deadline } from 'proximax-nem2-sdk';
import { AppConfig } from '../../../config/app.config';
import { NemProvider } from '../../../shared/services/nem.provider';
import { NodeService } from '../../../dashboard/services/node.service';
import { SharedService } from '../../../shared';


@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  blockInfo: BlockInfo[];
  viewTransactions = false;
  subscribes = ['getNodeObservable'];
  optionTypeSearch = [
    {
      'value': 'address',
      'label': 'Address'
    }, {
      'value': 'publickey',
      'label': 'Public Key'
    }, {
      'value': 'hash',
      'label': 'Hash'
    }
  ];

  constructor(
    private nemProvider: NemProvider,
    private nodeService: NodeService,
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscribes['getNodeObservable'] = this.nodeService.getNodeObservable().subscribe(next => {
      this.blockInfo = [];
      this.viewTransactions = false;
      this.viewAllTransactions();
    });
  }

  ngOnDestroy() {
    this.subscribes['getNodeObservable'].unsubscribe();
  }

  viewAllTransactions() {
    this.nemProvider.blockchainHttp.getBlockchainHeight().subscribe(
      next => {
        this.nemProvider.setBlocksHeightLocal(next);
        const totalHeight =  next.lower.toString();
        const heightWS = next.lower.toString().slice(0, -2) + '01';
        const total = (25 >= Number(totalHeight)) ? Number(heightWS) : Number(heightWS) - 100;
        this.nemProvider.blockchainHttp.getBlocksByHeightWithLimit(total, 100).subscribe(
          blockInfo => {
            blockInfo.forEach(element => {
              element['date'] = new Date(element.timestamp.compact() + (Deadline.timestampNemesisBlock * 1000));
            });
            this.blockInfo = blockInfo;
            this.viewTransactions = true;
          },
          error => {
            this.viewTransactions = false;
            this.blockInfo = [];
            this.viewAllTransactions();
          }
        );
      }
    );
  }
}
