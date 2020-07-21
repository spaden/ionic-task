import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoPage } from './po.page';

const routes: Routes = [
  {
    path: '',
    component: PoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoPageRoutingModule {}
