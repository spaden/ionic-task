import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAllAmcPage } from './view-all-amc.page';
import {Ng2SearchPipeModule} from "ng2-search-filter";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Ng2SearchPipeModule,
    ],
  declarations: [ViewAllAmcPage],
  entryComponents: [ViewAllAmcPage]
})
export class ViewAllAmcPageModule {}
