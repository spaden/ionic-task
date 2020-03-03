import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagePoPageRoutingModule } from './manage-po-routing.module';

import { ManagePoPage } from './manage-po.page';
import {SuperTabsModule} from '@ionic-super-tabs/angular';
import {ViewAmcPageModule} from '../view-amc/view-amc.module';
import {ManagePmPageModule} from '../manage-pm/manage-pm.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagePoPageRoutingModule,
    SuperTabsModule,
    ViewAmcPageModule,
    ManagePmPageModule
  ],
  declarations: [ManagePoPage]
})
export class ManagePoPageModule {}
