import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAllAmcPage } from './view-all-amc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ViewAllAmcPage],
  entryComponents: [ViewAllAmcPage]
})
export class ViewAllAmcPageModule {}
