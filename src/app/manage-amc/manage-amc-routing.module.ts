import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageAmcPage } from './manage-amc.page';

const routes: Routes = [
  {
    path: '',
    component: ManageAmcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageAmcPageRoutingModule {}
