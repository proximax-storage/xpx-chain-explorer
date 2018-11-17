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
  itHasMosaic = false;
  mosaicsArray = [];
  headElements = ['ID', 'Name', 'Divisibility', 'Levy Mutable', 'Supply Mutable', 'Transferable', 'View More'];
  linkRoute = {
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
    this.nemProvider.getNamespaceFromHex(this.namespaceId).subscribe(
      next => {
        this.namespaceInfo = next;
        this.showNamespaceInfo = true;
        this.nemProvider.getNamespacesName(this.namespaceId).subscribe(
          name => {
            this.namespaceInfo['namespaceName'] = name[0].name;
          }
        );

        this.nemProvider.getMosaicsFromNamespace(this.namespaceId).subscribe(
          mosaicInfo => {
            this.mosaicsArray = mosaicInfo;
            this.itHasMosaic = true;
            mosaicInfo.forEach(element => {
              this.nemProvider.getNameMosaicFromHex(element.mosaicId.id.toHex()).subscribe(
                name => {
                  element['nameMosaic'] = name[0].name;
                }
              );
            });
          }
        );
      }, error => {
        this.namespaceInfo = {};
        this.showNamespaceInfo = false;
        this.mosaicsArray = [];
        this.itHasMosaic = false;
        this.router.navigate([`/${AppConfig.routes.explorer}`]);
        this.sharedService.showError('', `Resource not found`);
      }
    );
  }
}
