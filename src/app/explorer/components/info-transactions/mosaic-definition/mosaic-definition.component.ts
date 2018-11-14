import { Component, OnInit, Input } from '@angular/core';
import { NemProvider } from '../../../../shared/services/nem.provider';

@Component({
  selector: 'app-mosaic-definition',
  templateUrl: './mosaic-definition.component.html',
  styleUrls: ['./mosaic-definition.component.scss']
})
export class MosaicDefinitionComponent implements OnInit {

  @Input() dataSelected = {};
  @Input() nameTransaction = '';

  constructor(
    private nemProvider: NemProvider
  ) { }

  ngOnInit() {
    this.getNameMosaic();
  }

  /**
   * Get Name Mosaic
   *
   * @param {any} resp
   * @memberof TransferTypeComponent
   */
  getNameMosaic() {
    if (this.dataSelected['mosaics'] !== undefined && this.dataSelected['mosaics'].length > 0) {
      this.nemProvider.mosaicHttp.getMosaicsName([this.dataSelected['mosaics'][0].id]).subscribe(
        name => {
          if (name.length > 0) {
            this.dataSelected['nameMosaic'] = name[0].name;
            return;
          }

          this.dataSelected['nameMosaic'] = '';
        }
      );
    } else if (this.dataSelected['mosaicId'] !== undefined) {
      this.nemProvider.mosaicHttp.getMosaicsName([this.dataSelected['mosaicId'].id]).subscribe(
        name => {
          if (name.length > 0) {
            this.dataSelected['nameMosaic'] = name[0].name;
            return;
          }

          this.dataSelected['nameMosaic'] = '';
        }
      );
    }
  }

}
