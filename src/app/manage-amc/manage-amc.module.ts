import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageAmcPageRoutingModule } from './manage-amc-routing.module';

import { ManageAmcPage } from './manage-amc.page';
import {SuperTabsModule} from '@ionic-super-tabs/angular';
import {CreateAmcPageModule} from '../create-amc/create-amc.module';
import {ViewAllAmcPageModule} from '../view-all-amc/view-all-amc.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreateAmcPageModule,
        ViewAllAmcPageModule,
        ManageAmcPageRoutingModule,
        SuperTabsModule
    ],
  declarations: [ManageAmcPage]
})
export class ManageAmcPageModule {}
