import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPoPageRoutingModule } from './list-po-routing.module';

import { ListPoPage } from './list-po.page';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListPoPageRoutingModule,
        Ng2SearchPipeModule,
        IonicModule
    ],
  declarations: [ListPoPage]
})
export class ListPoPageModule {}
