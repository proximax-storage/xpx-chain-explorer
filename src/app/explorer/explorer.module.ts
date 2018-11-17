import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { ExplorerRoutingModule } from './explorer-routing.module';
import { ExplorerComponent } from './views/explorer/explorer.component';
import { ExplorerAccountComponent } from './views/explorer-account/explorer-account.component';
import { TransferTypeComponent } from './components/info-transactions/transfer-type/transfer-type.component';
import { ExplorerBlockComponent } from './views/explorer-block/explorer-block.component';
import {
  TypeMosaicSupplyChangeComponent
} from './components/info-transactions/type-mosaic-supply-change/type-mosaic-supply-change.component';
import { MosaicDefinitionComponent } from './components/info-transactions/mosaic-definition/mosaic-definition.component';
import { RegisterNamespaceComponent } from './components/info-transactions/register-namespace/register-namespace.component';
import { ModifyMultisigAccountComponent } from './components/info-transactions/modify-multisig-account/modify-multisig-account.component';
import { RecentTransactionsComponent } from './components/recent-transactions/recent-transactions.component';
import { SearchByFilterComponent } from './components/search-by-filter/search-by-filter.component';
import { ExplorerHashComponent } from './views/explorer-hash/explorer-hash.component';
import { ExplorerMosaicComponent } from './views/explorer-mosaic/explorer-mosaic.component';
import { ExplorerNamespaceComponent } from './views/explorer-namespace/explorer-namespace.component';
import { AllTransactionsComponent } from './components/all-transactions/all-transactions.component';

@NgModule({
  imports: [
    CoreModule,
    ExplorerRoutingModule
  ],
  declarations: [
    ExplorerComponent,
    ExplorerAccountComponent,
    TransferTypeComponent,
    TypeMosaicSupplyChangeComponent,
    MosaicDefinitionComponent,
    RegisterNamespaceComponent,
    ModifyMultisigAccountComponent,
    ExplorerBlockComponent,
    RecentTransactionsComponent,
    SearchByFilterComponent,
    ExplorerHashComponent,
    ExplorerMosaicComponent,
    ExplorerNamespaceComponent,
    AllTransactionsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ExplorerModule { }
