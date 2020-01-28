import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAmcPageRoutingModule } from './view-amc-routing.module';

import { ViewAmcPage } from './view-amc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAmcPageRoutingModule
  ],
  declarations: [ViewAmcPage]
})
export class ViewAmcPageModule {}
