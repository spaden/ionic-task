import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPoPage } from './list-po.page';

const routes: Routes = [
  {
    path: '',
    component: ListPoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPoPageRoutingModule {}
