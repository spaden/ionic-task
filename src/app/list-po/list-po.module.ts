import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPoPageRoutingModule } from './list-po-routing.module';

import { ListPoPage } from './list-po.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPoPageRoutingModule
  ],
  declarations: [ListPoPage]
})
export class ListPoPageModule {}
