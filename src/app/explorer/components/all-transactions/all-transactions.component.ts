import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { MdbTablePaginationComponent, MdbTableService } from 'ng-uikit-pro-standard';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MosaicId, Transaction, Address, TransactionType, BlockInfo, Deadline } from 'proximax-nem2-sdk';
import { AppConfig } from '../../../config/app.config';
import { NemProvider } from '../../../shared/services/nem.provider';
import { NodeService } from '../../../dashboard/services/node.service';
import { SharedService } from '../../../shared';


@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss']
})
export class AllTransactionsComponent implements OnInit, AfterViewInit {

  @Input() blockInfo = [];
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @Output() getMoreTransaction = new EventEmitter();

  linkRoute = {
    explorerAccount: {
      'link': `/${AppConfig.routes.explorerAccount.split(':')[0]}`
    },
    explorerBlock: {
      'link': `/${AppConfig.routes.explorerBlock.split(':')[0]}`
    }
  };
  firstItemIndex;
  lastItemIndex;
  previous: any;
  searchText: string;
  headElements = ['Block Height', 'Timestamp', 'Harvester/Forger', 'Number of Transactions', 'Difficulty', 'Fees', 'Export CSV'];
  options = {
    showLabels: true,
    showTitle: false,
    useBom: true,
    noDownload: false,
    headers: ['Block Height', 'Address', 'Harvester/Forger', 'Difficulty', 'Signature', 'Fees', 'Hash', 'Network type', 'Date']
  };

  constructor(
    private tableService: MdbTableService,
    private cdRef: ChangeDetectorRef
  ) {

  }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {

    this.tableService.setDataSource(this.blockInfo);
    this.blockInfo = this.tableService.getDataSource();
    this.previous = this.tableService.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);
    this.firstItemIndex = this.mdbTablePagination.firstItemIndex;
    this.lastItemIndex = this.mdbTablePagination.lastItemIndex;

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  onNextPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
    if (this.mdbTablePagination.lastVisibleItemIndex === this.mdbTablePagination.allItemsLength) {
      this.getMoreTransaction.emit(this.blockInfo);
    }
  }

  onPreviousPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  exportCSV(blockH) {
    console.log('blockH', blockH);
    const data = [];
    if (blockH.toString() === '00') {
      blockH = 'all';
      this.blockInfo.forEach(element => {
        data.push(
          {
            'blockH': element.height.lower,
            'address': element.signer.address.pretty(),
            'harvester': element.signer.publicKey,
            'difficulty': element.difficulty.compact(),
            'signature': element.signature,
            'fees': element.totalFee.compact(),
            'hash': element.hash,
            'networkType': element.networkType,
            'date': element.date
          }
        );
      });
    } else {
      const array = this.blockInfo.find(element => element.height.lower === blockH);
      data.push({
        'blockH': array.height.lower,
        'address': array.signer.address.pretty(),
        'harvester': array.signer.publicKey,
        'difficulty': array.difficulty.compact(),
        'signature': array.signature,
        'fees': array.totalFee.compact(),
        'hash': array.hash,
        'networkType': array.networkType,
        'date': array.date
      });
    }
    const csv = new Angular5Csv(data, `Info block ${blockH}`, this.options);
  }
}
