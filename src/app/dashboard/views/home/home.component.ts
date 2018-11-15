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
        console.log('ALTURA DEL BLOQUE =====> ', next); // next.lower
        this.nemProvider.blockchainHttp.getBlocksByHeightWithLimit(63901, 100).subscribe(
          blockInfo => {
            // const data  = [];
            // blockInfo.forEach(element => {
            //   const d = element;
            //   d['typeName'] = 'cualquiera';
            //   data.push(d);
            // });
            this.blockInfo = blockInfo;
            console.log(this.blockInfo);
          }
        );
      }
    );
  }


  searchData() {
    this.elements = [];
    if (this.typeSearch === '') {
      this.sharedService.showError('', 'Please, select a type search');
      return;
    } else if (this.paramSearch === '') {
      let tp = '';
      if (this.typeSearch === 'address') {
        tp = 'a address';
      } else if (this.typeSearch === 'hash') {
        tp = 'a hash';
      } else if (this.typeSearch === 'publickey') {
        tp = 'a publickey';
      }
      this.sharedService.showError('', `Please, add ${tp}`);
      return;
    }

    if (this.typeSearch === 'address') {
      // from address
      this.blockInput = true;
      this.nemProvider.getAccountInfo(Address.createFromRawAddress(this.paramSearch)).pipe(first()).subscribe(
        accountInfo => {
          console.log(accountInfo);
          this.nemProvider.getAllTransactionsFromAccount(accountInfo.publicAccount).subscribe(
            resp => {
              console.log('with address info ', resp);
              this.buildTransaction(resp);
            },
            error => {
              this.blockInput = false;
              console.log(error);
            }
          );
        }
      );
    } else if (this.typeSearch === 'publickey') {
      // From publickey
      this.blockInput = true;
      const publicAccount = this.nemProvider.createPublicAccount(this.paramSearch, '');
      this.nemProvider.getAllTransactionsFromAccount(publicAccount, this.nodeService.getNodeSelected()).subscribe(
        resp => {
          console.log('with publickey info', resp);
          this.buildTransaction(resp);
        },
        error => {
          this.blockInput = false;
          console.log(error);
        }
      );
    } else {
      // From hash
      this.blockInput = true;
      this.nemProvider.getTransactionInformation(this.paramSearch, this.nodeService.getNodeSelected()).subscribe(
        resp => {
          console.log('with hash info', resp);
          this.buildTransaction([resp]);
        },
        error => {
          this.blockInput = false;
          console.log(error);
        }
      );
    }
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
