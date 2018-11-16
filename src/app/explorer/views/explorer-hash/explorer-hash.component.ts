import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { NodeService } from '../../../dashboard/services/node.service';
import { NemProvider } from '../../../shared/services/nem.provider';

@Component({
  selector: 'app-explorer-hash',
  templateUrl: './explorer-hash.component.html',
  styleUrls: ['./explorer-hash.component.scss']
})
export class ExplorerHashComponent implements OnInit {

  transactionInfo = {};
  hash = this.route.snapshot.paramMap.get('hash');
  observables = [];
  showTransactionInfo = false;

  constructor(
    private route: ActivatedRoute,
    private nodeService: NodeService,
    private nemProvider: NemProvider
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
    this.nemProvider. getTransactionInformation(this.hash).subscribe(
      resp => {
        this.transactionInfo = resp;
        this.showTransactionInfo = true;
        console.log('with hash info', resp);
      },
      error => {
        this.showTransactionInfo = false;
        this.transactionInfo = {};
        console.log('error', error);
      }
    );
  }

}
