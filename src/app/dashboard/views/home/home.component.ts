import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { MdbTablePaginationComponent, MdbTableService } from 'ng-uikit-pro-standard';
import { MosaicId, Transaction, Address, TransactionType, BlockInfo } from 'proximax-nem2-sdk';
import { AppConfig } from '../../../config/app.config';
import { NemProvider } from '../../../shared/services/nem.provider';
import { NodeService } from '../../services/node.service';
import { SharedService } from '../../../shared';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  objectkeys = Object.keys;
  blockInput: boolean;
  showFilter = false;
  firstItemIndex;
  lastItemIndex;
  typeNode = '';
  typeSearch = '';
  paramSearch = '';
  previous: any;
  searchText: string;
  elements = [];
  transactionType: TransactionType;
  dataSelected: Transaction;
  blockInfo = [];
  headElements = ['Block Height', 'Timestamp', 'Harvester', 'Amount', 'Fees'];
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
    private tableService: MdbTableService,
    private cdRef: ChangeDetectorRef,
    private nemProvider: NemProvider,
    private nodeService: NodeService,
    private sharedService: SharedService
  ) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.viewAllTransactions();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
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

  viewAllTransactions() {
    this.nemProvider.blockchainHttp.getBlockchainHeight().subscribe(
      next => {
        this.nemProvider.blockchainHttp.getBlocksByHeightWithLimit(63901, 100).subscribe(
          blockInfo => {
            this.blockInfo = blockInfo;
          }
        );
      }
    );
  }


  buildTransaction(param) {
    this.blockInput = false;
    param.forEach(element => {
      if (element.type === TransactionType.TRANSFER) {
        const date = `${element.deadline.value.monthValue()}/${element.deadline.value.dayOfMonth()}/${element.deadline.value.year()}`;
        this.elements.push({
          address: element.signer.address['address'],
          amount: element['mosaics'][0].amount.compact(),
          message: element['message'],
          transactionInfo: element.transactionInfo,
          fee: element.fee.compact(),
          mosaic: this.nemProvider.mosaic,
          date: date,
          recipient: element['recipient'],
          signer: element.signer
        });
      }
    });
  }
}
