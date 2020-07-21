import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoPageRoutingModule } from './po-routing.module';

import { PoPage } from './po.page';
import {SuperTabsModule} from '@ionic-super-tabs/angular';
import {ManageAllPmPageModule} from '../manage-all-pm/manage-all-pm.module';
import {SchedulePmPageModule} from '../schedule-pm/schedule-pm.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PoPageRoutingModule,
        SuperTabsModule,
        SchedulePmPageModule,
        ManageAllPmPageModule
    ],
  declarations: [PoPage]
})
export class PoPageModule {}
