import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppConfig } from '../config/app.config';
import { ExplorerComponent } from './views/explorer/explorer.component';
import { ExplorerDetailComponent } from './views/explorer-detail/explorer-detail.component';
import { ExplorerBlockComponent } from './views/explorer-block/explorer-block.component';

const routes: Routes = [
  {
    path: `${AppConfig.routes.explorer}`,
    component: ExplorerComponent
  }, {
    path: `${AppConfig.routes.explorerAccount}`,
    component: ExplorerDetailComponent
  }, {
    path: `${AppConfig.routes.explorerBlock}`,
    component: ExplorerBlockComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorerRoutingModule { }
