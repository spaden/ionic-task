import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmcPmPageRoutingModule } from './amc-pm-routing.module';

import { AmcPmPage } from './amc-pm.page';
import {Ng2SearchPipeModule} from "ng2-search-filter";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmcPmPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [AmcPmPage],
})
export class AmcPmPageModule {}
