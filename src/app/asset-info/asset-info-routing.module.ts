import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetInfoPage } from './asset-info.page';

const routes: Routes = [
  {
    path: '',
    component: AssetInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetInfoPageRoutingModule {}
