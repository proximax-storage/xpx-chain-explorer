import { Component, OnInit, Input } from '@angular/core';
import { NemProvider } from '../../../../shared/services/nem.provider';

@Component({
  selector: 'app-type-mosaic-supply-change',
  templateUrl: './type-mosaic-supply-change.component.html',
  styleUrls: ['./type-mosaic-supply-change.component.scss']
})
export class TypeMosaicSupplyChangeComponent implements OnInit {

  @Input() accountInfo = {};
  @Input() dataSelected = {};
  @Input() nameTransaction = '';

  constructor(
    private nemProvider: NemProvider
  ) { }

  ngOnInit() {
    this.nemProvider.mosaicHttp.getMosaicsName([this.dataSelected['mosaicId'].id]).subscribe(
      name => {
        this.accountInfo['nameMosaic'] = name[0].name;
      }
    );
  }

}
