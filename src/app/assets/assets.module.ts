import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetsPageRoutingModule } from './assets-routing.module';

import { AssetsPage } from './assets.page';
import {SuperTabsModule} from '@ionic-super-tabs/angular';
import {ViewAmcPageModule} from '../view-amc/view-amc.module';
import {ManagePmPageModule} from '../manage-pm/manage-pm.module';
import {AssetInfoPageModule} from '../asset-info/asset-info.module';
import {TooltipModule} from "ng2-tooltip-directive";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AssetsPageRoutingModule,
        SuperTabsModule,
        ViewAmcPageModule,
        ManagePmPageModule,
        AssetInfoPageModule,
        TooltipModule
    ],
  declarations: [AssetsPage]
})
export class AssetsPageModule {}
