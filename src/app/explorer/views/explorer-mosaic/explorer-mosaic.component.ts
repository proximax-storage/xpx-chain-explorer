import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NodeService } from '../../../dashboard/services/node.service';
import { NemProvider } from '../../../shared/services/nem.provider';
import { UInt64, MosaicId, Id } from 'nem2-sdk';

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
    console.log('******************* getInfoMosaic ************************');
    const idFromHex = Id.fromHex(this.mosaicId);
    const mosaicId = new MosaicId([idFromHex.lower, idFromHex.higher]);
    this.nemProvider.mosaicHttp.getMosaic(mosaicId).subscribe(
      next => {
        console.log('getMosaic', next);
        this.mosaicInfo = next;
        this.nemProvider.mosaicHttp.getMosaicsName([mosaicId]).subscribe(
          name => {
            this.mosaicInfo['nameMosaic'] = name[0].name;
          }
        );

        this.nemProvider.namespaceHttp.getNamespacesName([next.namespaceId]).subscribe(
          name => {
            this.mosaicInfo['namespaceName'] = name[0].name;
          }
        );
      }
    );
  }
}
