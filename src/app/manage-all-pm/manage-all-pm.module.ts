import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ManageAllPmPage } from './manage-all-pm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [ManageAllPmPage],
  entryComponents: [ManageAllPmPage]
})
export class ManageAllPmPageModule {}
