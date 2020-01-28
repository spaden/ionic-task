import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAmcPage } from './view-amc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [ViewAmcPage],
  entryComponents: [ViewAmcPage]
})
export class ViewAmcPageModule {}
