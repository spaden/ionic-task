import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-pm',
  templateUrl: './manage-pm.page.html',
  styleUrls: ['./manage-pm.page.scss'],
})
export class ManagePmPage implements OnInit {

  showCompleted = true;
  showNotCompleted = true;
  showEditable = true;
  constructor() { }
  showCompletedOnly() {
    this.showCompleted = true;
    this.showNotCompleted = false;
    this.showEditable = false;
  }
  showNotCompletedOnly() {
    this.showCompleted = false;
    this.showNotCompleted = true;
    this.showEditable = false;
  }
  showEditableOnly() {
    this.showCompleted = false;
    this.showNotCompleted = false;
    this.showEditable = true;
  }
  ngOnInit() {
  }

}
