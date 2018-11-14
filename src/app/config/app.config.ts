import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken('app.config');
export const AppConfig: Config = {
  routes: {
    home: 'home',
    login: 'login',
    explorer: 'explorer-transaction',
    explorerAccount: 'explorer-transaction/account/:account',
    explorerBlock: 'explorer-transaction/block/:block',
    addNode: 'add-node',
    selectNode: 'select-node',
    notFound: 'not-found'
  }
};

export const NameRoute = {
  [AppConfig.routes.home]: 'Home',
  [AppConfig.routes.login]: 'Login',
  [AppConfig.routes.explorer]: 'Explorer transaction',
  [AppConfig.routes.explorerBlock]: 'Explorer transaction - Block',
  [AppConfig.routes.explorerAccount]: 'Explorer transaction - Account',
  [AppConfig.routes.addNode]: 'Add node',
  [AppConfig.routes.selectNode]: 'Select node',
  [AppConfig.routes.notFound]: '404 not found'
};

export interface Config {
  routes: {
    home: string;
    login: string;
    explorer: string;
    explorerBlock: string;
    explorerAccount: string;
    notFound: string;
    addNode: string;
    selectNode: string;
  };
}
