import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmcPmPage } from './amc-pm.page';

const routes: Routes = [
  {
    path: '',
    component: AmcPmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmcPmPageRoutingModule {}
