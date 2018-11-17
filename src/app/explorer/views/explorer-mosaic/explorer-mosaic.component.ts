import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NodeService } from '../../../dashboard/services/node.service';
import { NemProvider } from '../../../shared/services/nem.provider';
import { SharedService } from '../../../shared/services/shared.service';
import { AppConfig } from '../../../config/app.config';

@Component({
  selector: 'app-explorer-mosaic',
  templateUrl: './explorer-mosaic.component.html',
  styleUrls: ['./explorer-mosaic.component.scss']
})
export class ExplorerMosaicComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  mosaicId = this.route.snapshot.paramMap.get('mosaicId');
  mosaicInfo = {};
  observables = [];
  showMosaicInfo = false;

  constructor(
    private route: ActivatedRoute,
    private nodeService: NodeService,
    private nemProvider: NemProvider,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.observables['mosaicObs'] = this.nodeService.getNodeObservable().subscribe(next => {
      this.mosaicInfo = {};
      this.showMosaicInfo = false;
      this.getInfoMosaic();
    });
  }

  ngOnDestroy() {
    this.observables['mosaicObs'].unsubscribe();
  }

  getInfoMosaic() {
    this.blockUI.start('Loading...');
    this.nemProvider.getMosaicFromHex(this.mosaicId).subscribe(
      next => {
        this.blockUI.stop();
        this.mosaicInfo = next;
        this.showMosaicInfo = true;
        this.nemProvider.getNameMosaicFromHex(this.mosaicId).subscribe(
          name => {
            this.mosaicInfo['nameMosaic'] = name[0].name;
          }
        );

        this.nemProvider.getNamespacesName(next.namespaceId.toHex()).subscribe(
          name => {
            this.mosaicInfo['namespaceName'] = name[0].name;
          }
        );
      }, error => {
        this.router.navigate([`/${AppConfig.routes.explorer}`]);
        this.sharedService.showError('', `Resource not found`);
        this.blockUI.stop();
      }
    );
  }
}
