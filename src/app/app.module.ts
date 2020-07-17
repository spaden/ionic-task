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
import {DataItemsService} from './services/list_service/data-items.service';
import {LocalStorageService} from './services/storage/local-storage.service';
import {DatePicker} from '@ionic-native/date-picker/ngx';
import { IonicStorageModule } from '@ionic/storage';
import {File} from '@ionic-native/file/ngx';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {Downloader} from '@ionic-native/downloader/ngx';
import {AmcModalPageModule} from './amc-modal/amc-modal.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AllAmcModalPageModule} from './all-amc-modal/all-amc-modal.module';
import {FilePath} from '@ionic-native/file-path/ngx';

@NgModule({
  declarations: [AppComponent, MainComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({scrollPadding: false, scrollAssist: false}),
    AppRoutingModule,
    SuperTabsModule.forRoot(),
    PmModalPageModule,
    AmcModalPageModule,
    AllAmcModalPageModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    QRScanner,
    Downloader,
    StatusBar,
    SplashScreen,
    FileChooser,
    File,
    FilePath,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DataItemsService, LocalStorageService,
    DatePicker
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
