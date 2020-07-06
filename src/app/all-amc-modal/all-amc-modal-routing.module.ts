import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllAmcModalPage } from './all-amc-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AllAmcModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllAmcModalPageRoutingModule {}
