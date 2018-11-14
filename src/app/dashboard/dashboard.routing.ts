import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppConfig } from '../config/app.config';
import { SelectNodeComponent } from './views/select-node/select-node.component';

const routes: Routes = [
  {
    path: `${AppConfig.routes.selectNode}`,
    component: SelectNodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
