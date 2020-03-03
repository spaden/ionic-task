import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagePoPage } from './manage-po.page';

const routes: Routes = [
  {
    path: '',
    component: ManagePoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagePoPageRoutingModule {}
