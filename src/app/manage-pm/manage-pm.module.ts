import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagePmPage } from './manage-pm.page';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {TooltipModule} from "ng2-tooltip-directive";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Ng2SearchPipeModule,
        TooltipModule
    ],
  declarations: [ManagePmPage],
  entryComponents: [ManagePmPage]
})
export class ManagePmPageModule {}
