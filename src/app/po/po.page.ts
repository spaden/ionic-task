import { Component, OnInit } from '@angular/core';
import {SchedulePmPage} from '../schedule-pm/schedule-pm.page';
import {ManageAllPmPage} from '../manage-all-pm/manage-all-pm.page';

@Component({
  selector: 'app-po',
  templateUrl: './po.page.html',
  styleUrls: ['./po.page.scss'],
})
export class PoPage implements OnInit {
  schedulePM = SchedulePmPage;
  managePM = ManageAllPmPage;
  constructor() { }

  ngOnInit() {
  }

}
