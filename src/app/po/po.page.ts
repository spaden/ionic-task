import { Component, OnInit } from '@angular/core';
import {SchedulePmPage} from '../schedule-pm/schedule-pm.page';
import {ManageAllPmPage} from '../manage-all-pm/manage-all-pm.page';
import {NavController, Platform} from '@ionic/angular';

@Component({
  selector: 'app-po',
  templateUrl: './po.page.html',
  styleUrls: ['./po.page.scss'],
})
export class PoPage implements OnInit {
  schedulePM = SchedulePmPage;
  managePM = ManageAllPmPage;
  constructor(public platform: Platform,
    private nav: NavController) {
    this.platform.backButton.subscribeWithPriority(0, () => {

      this.nav.pop();

    });
   }

  ngOnInit() {
  }

}
