import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng-uikit-pro-standard';
import { BlockUIModule } from 'ng-block-ui';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
// Routing
import { AppRoutingModule } from './app.routing.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    BrowserModule,
    BlockUIModule.forRoot(),
    ToastModule.forRoot({
      maxOpened: 1,
      newestOnTop: false,
      preventDuplicates: true,
      autoDismiss: true,
      progressBar: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
