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
              private toastCtrl: ToastController) {}
  poNo = this.params.data.poNo;
  sno = this.params.data.sNo;
  start = this.params.data.start;
  end = this.params.data.end;
  extraCost = this.params.data.extraCost;
  comments = this.params.data.comments;
  service = this.params.data.service;
  calendar(name: string) {
      this.datepicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
          minDate: this.start,
          maxDate: this.end,
    }).then(
        date => {
          const newDate = date.getDate() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
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
           !this.service ) {
          this.displayToast('Fill all the details - ' + this.poNo);
      } else {
          const data = {
              SNo: this.sno,
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
