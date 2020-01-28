import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAmcPage } from './view-amc.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAmcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAmcPageRoutingModule {}
