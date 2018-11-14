import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AppConfig } from './config/app.config';

const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: `/${AppConfig.routes.explorer}`,
    pathMatch: 'full'
  }, {
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }, {
    path: '',
    loadChildren: './explorer/explorer.module#ExplorerModule'
  }, {
    path: '**',
    redirectTo: `/${AppConfig.routes.explorer}`,
  }
];
@NgModule({
  imports: [RouterModule.forRoot(AppRoutes, {
    enableTracing: false,
    useHash: true,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
