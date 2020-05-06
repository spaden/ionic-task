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
import {DataItemsService} from './services/list_service/data-items.service'
import {DatePicker} from '@ionic-native/date-picker/ngx';
import {File} from '@ionic-native/file/ngx';
import {FileChooser} from '@ionic-native/file-chooser/ngx';

@NgModule({
  declarations: [AppComponent, MainComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({scrollPadding: false, scrollAssist: false}),
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
    FileChooser,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DataItemsService,
      DatePicker
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
