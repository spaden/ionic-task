import {Component, OnInit, ViewChild} from '@angular/core';
import {ViewAmcPage} from '../view-amc/view-amc.page';
import {ManagePmPage} from '../manage-pm/manage-pm.page';
import {AssetInfoPage} from '../asset-info/asset-info.page';
import {Router} from '@angular/router';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.page.html',
  styleUrls: ['./assets.page.scss'],
})
export class AssetsPage implements OnInit {
  viewAmc = ViewAmcPage;
  assets = AssetInfoPage;
  managePm = ManagePmPage;
  constructor(private route: Router) { }
  ngOnInit() {
  }
  showScanner() {
    this.route.navigateByUrl('scan');
  }
}
