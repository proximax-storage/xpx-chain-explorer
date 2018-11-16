import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { MdbTablePaginationComponent, MdbTableService } from 'ng-uikit-pro-standard';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MosaicId, Transaction, Address, TransactionType, BlockInfo, Deadline } from 'nem2-sdk';
import { AppConfig } from '../../../config/app.config';
import { NemProvider } from '../../../shared/services/nem.provider';
import { NodeService } from '../../../dashboard/services/node.service';
import { SharedService } from '../../../shared';


@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit, AfterViewInit {

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
  blockInfo: BlockInfo[];
  subscribes = ['getNodeObservable'];
  headElements = ['Block Height', 'Timestamp', 'Harvester', 'Difficulty', 'Fees'];
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
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.subscribes['getNodeObservable'] = this.nodeService.getNodeObservable().subscribe(next => {
      this.blockInfo = [];
      this.elements = [];
      this.viewAllTransactions();
    });
  }

  ngOnDestroy() {
    this.subscribes['getNodeObservable'].unsubscribe();
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

  viewAllTransactions() {
    console.log('ingresa..');
    this.nemProvider.blockchainHttp.getBlockchainHeight().subscribe(
      next => {
        console.log('ALTURA DEL BLOQUE =====> ', next); // next.lower
        this.nemProvider.setBlocksHeightLocal(next);
        const totalHeight =  next.lower.toString();
        const heightWS = next.lower.toString().slice(0, -2) + '01';
        console.log(heightWS);
        const total = (25 >= Number(totalHeight)) ? Number(heightWS) : Number(heightWS) - 100;
        console.log(total);
        this.nemProvider.blockchainHttp.getBlocksByHeightWithLimit(total, 100).subscribe(
          blockInfo => {
            console.log('BlockInfo', blockInfo);
            blockInfo.forEach(element => {
              element['date'] = new Date(element.timestamp.compact() + (Deadline.timestampNemesisBlock * 1000));
            });
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
