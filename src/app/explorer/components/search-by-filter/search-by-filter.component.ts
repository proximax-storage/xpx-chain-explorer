import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { PlatformLocation } from '@angular/common';
import { Address, NetworkType } from 'proximax-nem2-sdk';
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

  host = `${(this.platformLocation as any).location.origin}#`;
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
    },
    namespace: {
      'link': `/${AppConfig.routes.explorerNamespace.split(':')[0]}`
    },
    mosaic: {
      'link': `/${AppConfig.routes.explorerMosaic.split(':')[0]}`
    }
  };

  constructor(
    private sharedService: SharedService,
    private nemProvider: NemProvider,
    private nodeService: NodeService,
    private router: Router,
    private platformLocation: PlatformLocation
  ) {
  }

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
        'label': 'Hash transaction'
      }, {
        'value': 'block',
        'label': 'Block'
      }, {
        'value': 'mosaic',
        'label': 'Mosaic Id'
      }, {
        'value': 'namespace',
        'label': 'Namespace Id'
      }
    ];
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
      } else if (this.typeSearch === 'mosaic') {
        tp = 'a mosaic';
      } else if (this.typeSearch === 'namespace') {
        tp = 'a namespace';
      }
      this.sharedService.showError('', `Please, add ${tp}`);
      return;
    }

    if (this.typeSearch === 'address') {
      window.open(`${this.host}${this.linkRoute.explorerAccount.link}${this.paramSearch}`, '_blank');
      // this.router.navigate([this.linkRoute.explorerAccount.link, this.paramSearch]);
    } else if (this.typeSearch === 'block') {
      window.open(`${this.host}${this.linkRoute.explorerBlock.link}${this.paramSearch}`, '_blank');
      // this.router.navigate([this.linkRoute.explorerBlock.link, this.paramSearch]);
    } else if (this.typeSearch === 'publickey') {
      const publicAccount = this.nemProvider.createPublicAccount(this.paramSearch, NetworkType.TEST_NET);
      window.open(`${this.host}${this.linkRoute.explorerAccount.link}${this.paramSearch}`, '_blank');
      // this.router.navigate([this.linkRoute.explorerAccount.link, publicAccount.address['address']]);
    } else if (this.typeSearch === 'hash') {
      window.open(`${this.host}${this.linkRoute.hash.link}${this.paramSearch}`, '_blank');
      // this.router.navigate([this.linkRoute.hash.link, this.paramSearch]);
    } else if (this.typeSearch === 'mosaic') {
      window.open(`${this.host}${this.linkRoute.mosaic.link}${this.paramSearch}`, '_blank');
      // this.router.navigate([this.linkRoute.mosaic.link, this.paramSearch]);
    } else if (this.typeSearch === 'namespace') {
      window.open(`${this.host}${this.linkRoute.namespace.link}${this.paramSearch}`, '_blank');
      // this.router.navigate([this.linkRoute.namespace.link, this.paramSearch]);
    }
  }

}
