import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagePmPageRoutingModule } from './manage-pm-routing.module';

import { ManagePmPage } from './manage-pm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagePmPageRoutingModule
  ],
  declarations: [ManagePmPage]
})
export class ManagePmPageModule {}
