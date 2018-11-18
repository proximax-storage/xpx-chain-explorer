import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { MdbTablePaginationComponent, MdbTableService } from 'ng-uikit-pro-standard';
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
  elements = [];
  headElements = ['Block Height', 'Timestamp', 'Harvester/Forger', 'Difficulty', 'Fees', 'Export CSV'];


  options = {
    fieldSeparator: ',',
    quoteStrings: '`',
    decimalseparator: '.',
    showLabels: true,
    headers: [],
    showTitle: true,
    title: 'asfasf',
    useBom: false,
    removeNewLines: true,
    keys: ['approved', 'age', 'name']
  };
  data = [
    {
      name: `Test, 1`,
      age: 13,
      average: 8.2,
      approved: true,
      description: `using 'Content here, content here' `
    },
    {
      name: 'Test 2',
      age: 11,
      average: 8.2,
      approved: true,
      description: `using 'Content here, content here' `
    },
    {
      name: 'Test 3',
      age: 10,
      average: 8.2,
      approved: true,
      description: `using 'Content here, content here' `
    }
  ];


  constructor(
    private tableService: MdbTableService,
    private cdRef: ChangeDetectorRef
  ) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.tableService.setDataSource(this.blockInfo);
    this.elements = this.tableService.getDataSource();
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
  }

  onPreviousPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }
}
