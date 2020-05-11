import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {IonInput, ModalController, NavParams, ToastController} from '@ionic/angular';
import {DatePicker} from '@ionic-native/date-picker/ngx';

@Component({
  selector: 'app-pm-modal',
  templateUrl: './pm-modal.page.html',
  styleUrls: ['./pm-modal.page.scss'],
})
export class PmModalPage implements OnInit {
  constructor(public viewCtrl: ModalController,
              private params: NavParams,
              private datepicker: DatePicker,
              private toastCtrl: ToastController) { }
  poNo = this.params.data[0].poNo;
  status = this.params.data[0].status;
  start = this.params.data[0].start;
  end = this.params.data[0].end;
  extraCost = this.params.data[0].extraCost;
  comments = this.params.data[0].comments;
  service = this.params.data[0].service;
  calendar(name: string) {
    this.datepicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then(
        date => {
          const newDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
          if (name === 'start') {
            this.start = newDate;
          } else if (name === 'end') {
            this.end = newDate;
          } else {
            this.service = newDate;
          }
        } ,
        err => console.log(err)
    );
  }
  submit() {
      if ( !this.poNo || !this.start || !this.end ||
           !this.service || !this.extraCost || !this.status ) {
          this.displayToast('Fill all the details - ' + this.poNo);
      } else {
          const data = {
              poNo: this.poNo,
              status: this.status,
              start: this.start,
              end: this.end,
              extraCost: this.extraCost,
              comments: this.comments,
              service: this.service
          };
          this.viewCtrl.dismiss(data);
      }
  }
  async displayToast(mess: string) {
    const toast = await this.toastCtrl.create({
      message: mess,
      duration: 2000});
    toast.present();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  ngOnInit() {
    // console.log(this.params.data);
  }

}
