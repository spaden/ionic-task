import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'scan',
    loadChildren: () => import('./scan/scan.module').then( m => m.ScanPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'assets',
    loadChildren: () => import('./assets/assets.module').then( m => m.AssetsPageModule)
  },
  {
    path: 'manage-po',
    loadChildren: () => import('./manage-po/manage-po.module').then( m => m.ManagePoPageModule)
  },
  {
    path: 'manage-amc',
    loadChildren: () => import('./manage-amc/manage-amc.module').then( m => m.ManageAmcPageModule)
  },
  {
    path: 'amc-pm',
    loadChildren: () => import('./amc-pm/amc-pm.module').then( m => m.AmcPmPageModule)
  },
  {
    path: 'po',
    loadChildren: () => import('./po/po.module').then( m => m.PoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
