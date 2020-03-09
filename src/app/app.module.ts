import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {MainComponent} from './main/main.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {SuperTabsModule} from '@ionic-super-tabs/angular';
import {PmModalPageModule} from './pm-modal/pm-modal.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {HttpClientModule} from '@angular/common/http';
import {DataItemsService} from './additional_services/list_service/data-items.service'
@NgModule({
  declarations: [AppComponent, MainComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SuperTabsModule.forRoot(),
    PmModalPageModule,
    Ng2SearchPipeModule,
    HttpClientModule
  ],
  providers: [
    QRScanner,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DataItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
