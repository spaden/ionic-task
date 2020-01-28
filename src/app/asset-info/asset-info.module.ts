import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { AssetInfoPage } from './asset-info.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
  declarations: [AssetInfoPage],
    entryComponents: [AssetInfoPage]
})
export class AssetInfoPageModule {}
