import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PmModalPageRoutingModule } from './pm-modal-routing.module';

import { PmModalPage } from './pm-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PmModalPageRoutingModule
  ],
  declarations: [PmModalPage]
})
export class PmModalPageModule {}
