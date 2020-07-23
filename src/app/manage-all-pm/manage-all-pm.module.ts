import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ManageAllPmPage } from './manage-all-pm.page';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Ng2SearchPipeModule
    ],
  declarations: [ManageAllPmPage],
  entryComponents: [ManageAllPmPage]
})
export class ManageAllPmPageModule {}
