import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockInfo } from 'proximax-nem2-sdk';
import { NemProvider } from '../../../shared/services/nem.provider';
import { AppConfig } from '../../../config/app.config';
import { NodeService } from '../../../dashboard/services/node.service';

@Component({
  selector: 'app-explorer-block',
  templateUrl: './explorer-block.component.html',
  styleUrls: ['./explorer-block.component.scss']
})
export class ExplorerBlockComponent implements OnInit {

  showRecentTransaction = false;
  blockParam = this.route.snapshot.paramMap.get('block');
  observables = ['numberBlock', 'getNodeObservable'];
  showInfo = false;
  blockInfo = {};
  blockTransactions = [];
  linkRoute = {
    explorerAccount: {
      'link': `/${AppConfig.routes.explorerAccount.split(':')[0]}`
    }
  };


  constructor(
    private nodeService: NodeService,
    private nemProvider: NemProvider,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.observables['getNodeObservable'] = this.nodeService.getNodeObservable().subscribe(next => {
      this.blockInfo = {};
      this.showInfo = false;
      this.showRecentTransaction = false;
      this.getBlockByHeight();
    });
  }

  ngOnDestroy() {
    this.observables['getNodeObservable'].unsubscribe();
  }


  getBlockByHeight() {
    this.nemProvider.blockchainHttp.getBlockByHeight(Number(this.blockParam)).subscribe(
      next => {
        const d = new Date(next.timestamp.compact());
        next['date'] = d;
        this.blockInfo = next;
        this.showInfo = true;
        this.nemProvider.blockchainHttp.getBlockTransactions(Number(this.blockParam)).subscribe(
          blockTransactions => {
            this.showRecentTransaction = true;
            this.blockTransactions = blockTransactions;
          }
        );
      },
      error => {
        this.showInfo = false;
      }
    );
  }
}
