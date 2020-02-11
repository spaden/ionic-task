import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-pm-modal',
  templateUrl: './pm-modal.page.html',
  styleUrls: ['./pm-modal.page.scss'],
})
export class PmModalPage implements OnInit {
  constructor(public viewCtrl: ModalController, private params: NavParams) { }
  PoNo = this.params.data[0].Po_no;
  Status = this.params.data[0].Status;
  Start = this.params.data[0].Start;
  End = this.params.data[0].End;
  ExtraCost = this.params.data[0].ExtraCost;
  Comments = this.params.data[0].Comments;
  Service = this.params.data[0].Service;
  submit() {
    const data = {
      PoNo: this.PoNo,
      Status: this.Status,
      Start: this.Start,
      End: this.End,
      ExtraCost: this.ExtraCost,
      Comments: this.Comments,
      Service: this.Service
    }
    this.viewCtrl.dismiss(data);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  ngOnInit() {
    // console.log(this.params.data);
  }

}
