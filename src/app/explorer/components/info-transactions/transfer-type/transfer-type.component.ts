import { Component, OnInit, Input } from '@angular/core';
import { NemProvider } from '../../../../shared/services/nem.provider';

@Component({
  selector: 'app-transfer-type',
  templateUrl: './transfer-type.component.html',
  styleUrls: ['./transfer-type.component.scss']
})
export class TransferTypeComponent implements OnInit {

  // @Input() infoMosaic = {};
  @Input() dataSelected;
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
    if (this.dataSelected['mosaics'].length > 0) {
      // if (Object.keyts) {

      // }
      // if (this.infoMosaic[]) {

      // }

      this.nemProvider.mosaicHttp.getMosaicsName([this.dataSelected['mosaics'][0].id]).subscribe(
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
