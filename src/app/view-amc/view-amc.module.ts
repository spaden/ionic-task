import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAmcPage } from './view-amc.page';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Ng2SearchPipeModule
    ],
  declarations: [ViewAmcPage],
  entryComponents: [ViewAmcPage]
})
export class ViewAmcPageModule {}
