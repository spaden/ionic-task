import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmcPmPageRoutingModule } from './amc-pm-routing.module';

import { AmcPmPage } from './amc-pm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmcPmPageRoutingModule
  ],
  declarations: [AmcPmPage]
})
export class AmcPmPageModule {}
