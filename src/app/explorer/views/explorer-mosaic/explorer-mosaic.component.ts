import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NodeService } from '../../../dashboard/services/node.service';
import { NemProvider } from '../../../shared/services/nem.provider';

@Component({
  selector: 'app-explorer-mosaic',
  templateUrl: './explorer-mosaic.component.html',
  styleUrls: ['./explorer-mosaic.component.scss']
})
export class ExplorerMosaicComponent implements OnInit {

  mosaicId = this.route.snapshot.paramMap.get('mosaicId');
  mosaicInfo = {};
  observables = [];
  showMosaicInfo = false;

  constructor(
    private route: ActivatedRoute,
    private nodeService: NodeService,
    private nemProvider: NemProvider
  ) { }

  ngOnInit() {
    this.observables['mosaicObs'] = this.nodeService.getNodeObservable().subscribe(next => {
      console.log('changeNodo', next);
      this.mosaicInfo = {};
      this.showMosaicInfo = false;
      this.getInfoMosaic();
    });
  }

  ngOnDestroy() {
    this.observables['mosaicObs'].unsubscribe();
  }

  getInfoMosaic() {
    const mosaicId = this.nemProvider.getMosaicId(this.mosaicId);
    this.nemProvider.mosaicHttp.getMosaic(mosaicId).subscribe(
      next => {
        console.log('mosaicId', mosaicId);
      }
    );
  }

}
