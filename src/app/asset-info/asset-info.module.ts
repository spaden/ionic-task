import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetInfoPageRoutingModule } from './asset-info-routing.module';

import { AssetInfoPage } from './asset-info.page';
import {QRCodeModule} from "angularx-qrcode";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AssetInfoPageRoutingModule,
        QRCodeModule
    ],
  declarations: [AssetInfoPage]
})
export class AssetInfoPageModule {}
