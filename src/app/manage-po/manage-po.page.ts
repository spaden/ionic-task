import { Component, OnInit } from '@angular/core';
import {ViewAmcPage} from '../view-amc/view-amc.page';
import {ManagePmPage} from '../manage-pm/manage-pm.page';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-po',
  templateUrl: './manage-po.page.html',
  styleUrls: ['./manage-po.page.scss'],
})
export class ManagePoPage implements OnInit {

  viewAmc = ViewAmcPage;
  managePm = ManagePmPage;
  constructor(private route: Router) { }
  ngOnInit() {
  }
  showScanner() {
    this.route.navigateByUrl('scan');
  }
}
