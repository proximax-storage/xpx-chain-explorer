import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Address, NetworkType } from 'nem2-sdk';
import { SharedService } from '../../../shared';
import { NemProvider } from '../../../shared/services/nem.provider';
import { NodeService } from '../../../dashboard/services/node.service';
import { AppConfig } from '../../../config/app.config';

@Component({
  selector: 'app-search-by-filter',
  templateUrl: './search-by-filter.component.html',
  styleUrls: ['./search-by-filter.component.scss']
})
export class SearchByFilterComponent implements OnInit {

  optionsSelect = [];
  elements = [];
  typeSearch = '';
  paramSearch = '';
  blockInput = false;
  linkRoute = {
    explorerAccount: {
      'link': `/${AppConfig.routes.explorerAccount.split(':')[0]}`
    },
    explorerBlock: {
      'link': `/${AppConfig.routes.explorerBlock.split(':')[0]}`
    },
    hash: {
      'link': `/${AppConfig.routes.explorerHash.split(':')[0]}`
    }
  };

  constructor(
    private sharedService: SharedService,
    private nemProvider: NemProvider,
    private nodeService: NodeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.optionsSelect = [
      {
        'value': 'address',
        'label': 'Address'
      }, {
        'value': 'publickey',
        'label': 'Public Key'
      }, {
        'value': 'hash',
        'label': 'Hash'
      }, {
        'value': 'block',
        'label': 'Block'
      }
    ];
  }

  searchData() {
    console.log(this.typeSearch);
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
      } else if (this.typeSearch === 'block') {
        tp = 'a block';
      }
      this.sharedService.showError('', `Please, add ${tp}`);
      return;
    }

    if (this.typeSearch === 'address') {
      this.router.navigate([this.linkRoute.explorerAccount.link, this.paramSearch]);
    } else if (this.typeSearch === 'block') {
      this.router.navigate([this.linkRoute.explorerBlock.link, this.paramSearch]);
    } else if (this.typeSearch === 'publickey') {
      const publicAccount = this.nemProvider.createPublicAccount(this.paramSearch, NetworkType.MIJIN_TEST);
      this.router.navigate([this.linkRoute.explorerAccount.link, publicAccount.address['address']]);
    } else if (this.typeSearch === 'hash') {
      this.router.navigate([this.linkRoute.hash.link, this.paramSearch]);
    }
  }

}
