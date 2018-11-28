import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MdbTableService } from 'ng-uikit-pro-standard';
import { AppConfig } from '../../../config/app.config';

@Component({
  selector: 'app-mosaics-info',
  templateUrl: './mosaics-info.component.html',
  styleUrls: ['./mosaics-info.component.scss']
})
export class MosaicsInfoComponent implements OnInit {

  @Input() mosaicsArray = [];
  @Input() viewAmount = false;
  searchText: string;
  headElements = [];
  // ********************
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
  ) { }

  ngOnInit() {
    if (!this.viewAmount) {
      this.headElements = ['Name', 'Divisibility', 'Levy Mutable', 'Supply Mutable', 'Transferable', 'View More'];
    } else {
      this.headElements = ['Name', 'Divisibility', 'Levy Mutable', 'Supply Mutable', 'Transferable', 'Quantity', 'View More'];
    }
  }
}
