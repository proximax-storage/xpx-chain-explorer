import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NodeService } from '../../../dashboard/services/node.service';
import { NemProvider } from '../../../shared/services/nem.provider';

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

  constructor(
    private route: ActivatedRoute,
    private nodeService: NodeService,
    private nemProvider: NemProvider
  ) { }

  ngOnInit() {
    this.observables['namespaceObs'] = this.nodeService.getNodeObservable().subscribe(next => {
      console.log('changeNodo', next);
      this.namespaceInfo = {};
      this.showNamespaceInfo = false;
      this.getInfoNamespace();
    });
  }

  ngOnDestroy() {
    this.observables['namespaceObs'].unsubscribe();
  }

  getInfoNamespace() {
    const namespaceId = this.nemProvider.getNamespaceId(this.namespaceId);
    this.nemProvider.namespaceHttp.getNamespace(namespaceId).subscribe(
      next => {
        console.log('namespaceId', namespaceId);
      }
    );
  }
}
