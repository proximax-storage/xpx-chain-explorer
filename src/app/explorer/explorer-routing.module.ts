import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppConfig } from '../config/app.config';
import { ExplorerComponent } from './views/explorer/explorer.component';
import { ExplorerAccountComponent } from './views/explorer-account/explorer-account.component';
import { ExplorerBlockComponent } from './views/explorer-block/explorer-block.component';
import { ExplorerHashComponent } from './views/explorer-hash/explorer-hash.component';
import { ExplorerMosaicComponent } from './views/explorer-mosaic/explorer-mosaic.component';
import { ExplorerNamespaceComponent } from './views/explorer-namespace/explorer-namespace.component';

const routes: Routes = [
  {
    path: `${AppConfig.routes.explorer}`,
    component: ExplorerComponent
  }, {
    path: `${AppConfig.routes.explorerAccount}`,
    component: ExplorerAccountComponent
  }, {
    path: `${AppConfig.routes.explorerBlock}`,
    component: ExplorerBlockComponent
  }, {
    path: `${AppConfig.routes.explorerHash}`,
    component: ExplorerHashComponent
  }, {
    path: `${AppConfig.routes.explorerMosaic}`,
    component: ExplorerMosaicComponent
  }, {
    path: `${AppConfig.routes.explorerNamespace}`,
    component: ExplorerNamespaceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorerRoutingModule { }
