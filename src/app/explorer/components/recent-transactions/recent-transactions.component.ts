import { Component, OnInit, HostListener, ViewChild, ChangeDetectorRef, Input, AfterViewInit } from '@angular/core';
import { TransactionType } from 'nem2-sdk';
import { MdbTablePaginationComponent, MdbTableService } from 'ng-uikit-pro-standard';
import { AppConfig } from '../../../config/app.config';


@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.scss']
})
export class RecentTransactionsComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  searchText: string;
  firstItemIndex;
  lastItemIndex;
  previous: any;
  //
  dataSelected = {};
  nameTransaction = '';
  headElements = ['Timestamp', 'Amount', 'Fee',  'Sender', 'Recipient', 'View more'];
  typeTransaction = null;
  linkRoute = {
    explorerAccount: {
      'link': `/${AppConfig.routes.explorerAccount.split(':')[0]}`,
    }
  };
  arraTypeTransaction = {
    transfer: {
      id: TransactionType.TRANSFER,
      name: 'Transfer'
    },
    registerNameSpace: {
      id: TransactionType.REGISTER_NAMESPACE,
      name: 'Register namespace'
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
  };

  @Input() elements = [];
  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  constructor(
    private tableService: MdbTableService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(100);
    this.firstItemIndex = this.mdbTablePagination.firstItemIndex;
    this.lastItemIndex = this.mdbTablePagination.lastItemIndex;

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  onNextPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  onPreviousPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }


  viewInfoTransaction(item, transaction) {
    const type = Object.keys(this.arraTypeTransaction).find(element => this.arraTypeTransaction[element].id === item['type']);
    console.log(type);
    this.dataSelected = transaction;
    this.nameTransaction = this.arraTypeTransaction[type].name;
    this.typeTransaction = item['type'];
  }

}
