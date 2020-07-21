import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-schedule-pm',
  templateUrl: './schedule-pm.page.html',
  styleUrls: ['./schedule-pm.page.scss'],
})
export class SchedulePmPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  send() {
    this.route.navigateByUrl('/amc-pm');
  }
}
