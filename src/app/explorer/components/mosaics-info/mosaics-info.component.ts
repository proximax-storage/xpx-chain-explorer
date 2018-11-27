import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { MdbTableService, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { AppConfig } from '../../../config/app.config';

@Component({
  selector: 'app-mosaics-info',
  templateUrl: './mosaics-info.component.html',
  styleUrls: ['./mosaics-info.component.scss']
})
export class MosaicsInfoComponent implements OnInit, AfterViewInit {

  @Input() mosaicsArray = [];
  @Input() viewAmount = false;
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  searchText: string;
  itemIndex;
  itemIndexLast;
  previous: any;
  headElements = [];
  colspanNumber: number;
  tableService;
  // ********************88
  linkRoute = {
    explorerAccount: {
      'link': `/${AppConfig.routes.explorerAccount.split(':')[0]}`
    },
    explorerBlock: {
      'link': `/${AppConfig.routes.explorerBlock.split(':')[0]}`
    },
    explorerMosaic: {
      'link': `/${AppConfig.routes.explorerMosaic.split(':')[0]}`,
    }
  };

  constructor(
    // private tableService: MdbTableService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (!this.viewAmount) {
      this.colspanNumber = 6;
      this.headElements = ['Name', 'Divisibility', 'Levy Mutable', 'Supply Mutable', 'Transferable', 'View More'];
    } else {
      this.colspanNumber = 7;
      this.headElements = ['Name', 'Divisibility', 'Levy Mutable', 'Supply Mutable', 'Transferable', 'Quantity', 'View More'];
    }

    this.tableService = new MdbTableService();
    this.tableService.setDataSource(this.mosaicsArray);
    this.mosaicsArray = this.tableService.getDataSource();
    this.previous = this.tableService.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);
    this.itemIndex = this.mdbTablePagination.firstItemIndex;
    this.itemIndexLast = this.mdbTablePagination.lastItemIndex;

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  onNextPageClick(data: any) {
    this.itemIndex = data.first;
    this.itemIndexLast = data.last;
  }

  onPreviousPageClick(data: any) {
    this.itemIndex = data.first;
    this.itemIndexLast = data.last;
  }

}
