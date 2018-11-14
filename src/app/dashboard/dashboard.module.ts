import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeComponent } from './views/home/home.component';
import { CoreModule } from '../core/core.module';
import { DashboardRoutingModule } from './dashboard.routing';
import { SelectNodeComponent } from './views/select-node/select-node.component';

@NgModule({
  imports: [
    DashboardRoutingModule,
    CoreModule
  ],
  declarations: [
    HomeComponent,
    SelectNodeComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DashboardModule { }
