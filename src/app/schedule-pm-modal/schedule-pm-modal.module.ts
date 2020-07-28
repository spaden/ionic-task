import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulePmModalPageRoutingModule } from './schedule-pm-modal-routing.module';

import { SchedulePmModalPage } from './schedule-pm-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePmModalPageRoutingModule
  ],
  declarations: [SchedulePmModalPage]
})
export class SchedulePmModalPageModule {}
