import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NodeService } from '../../../dashboard/services/node.service';
import { NemProvider } from '../../../shared/services/nem.provider';
import { SharedService } from '../../../shared/services/shared.service';
import { AppConfig } from '../../../config/app.config';


@Component({
  selector: 'app-explorer-namespace',
  templateUrl: './explorer-namespace.component.html',
  styleUrls: ['./explorer-namespace.component.scss']
})
export class ExplorerNamespaceComponent implements OnInit {

  namespaceId = this.route.snapshot.paramMap.get('namespaceId');
  namespaceInfo = {};
  observables = [];
  showNamespaceInfo = false;
  viewMosaics = false;
  mosaicsArray = [];
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
    private router: Router,
    private route: ActivatedRoute,
    private nodeService: NodeService,
    private nemProvider: NemProvider,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.observables['namespaceObs'] = this.nodeService.getNodeObservable().subscribe(next => {
      this.namespaceInfo = {};
      this.showNamespaceInfo = false;
      this.getInfoNamespace();
    });
  }

  ngOnDestroy() {
    this.observables['namespaceObs'].unsubscribe();
  }

  getInfoNamespace() {
    const nameSpaceId = this.nemProvider.getNameSpaceId(this.namespaceId);
    this.nemProvider.getNamespace(nameSpaceId).subscribe(
      next => {
        this.namespaceInfo = next;
        this.showNamespaceInfo = true;
        this.getMosaicsFromNamespace(nameSpaceId);
      }, error => {
        this.namespaceInfo = {};
        this.showNamespaceInfo = false;
        this.mosaicsArray = [];
        this.viewMosaics = false;
        this.router.navigate([`/${AppConfig.routes.explorer}`]);
        this.sharedService.showError('', `Resource not found`);
      }
    );
  }

  getMosaicsFromNamespace(nameSpaceId) {
    this.nemProvider.getMosaicsFromNamespace(nameSpaceId).subscribe(
      next => {
        this.mosaicsArray = next;
        if (this.mosaicsArray.length > 0) {
          this.mosaicsArray.forEach(element => {
            const id = this.nemProvider.getMosaicId([element.namespaceId.id.toHex(), element.mosaicId.id.toHex()]);
            this.nemProvider.getNameMosaicFromHex(element.mosaicId.id.toHex()).subscribe(
              response => {
                element['nameMosaic'] = response[0].name;
              }
            );
          });
        }
        this.viewMosaics = true;
      }, error => {
        this.mosaicsArray = [];
        this.viewMosaics = false;
      }
    );
  }
}
