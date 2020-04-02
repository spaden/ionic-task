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
  PoNo = this.params.data[0].Po_no;
  Status = this.params.data[0].Status;
  Start = this.params.data[0].Start;
  End = this.params.data[0].End;
  ExtraCost = this.params.data[0].ExtraCost;
  Comments = this.params.data[0].Comments;
  Service = this.params.data[0].Service;
  calendar(name: string) {
    this.datepicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then(
        date => {
          const newDate = date.getDate() + '/' + date.toLocaleString('default', { month: 'long' }) + '/' + date.getFullYear();
          if (name === 'start') {
            this.Start = newDate;
          } else if (name === 'end') {
            this.End = newDate;
          } else {
            this.Service = newDate;
          }
        } ,
        err => console.log(err)
    );
  }
  calendar1() {
    /*this.datepicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then(
        date => this.End = date.getDate() + '/' + date.toLocaleString('default', { month: 'long' }) + '/' + date.getFullYear(),
        err => console.log(err)
    );*/
    console.log('cal1');
  }
  calendar2() {
    /*this.datepicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then(
        date => this.Service = date.getDate() + '/' + date.toLocaleString('default', { month: 'long' }) + '/' + date.getFullYear(),
        err => console.log(err)
    );*/
    console.log('cal2');
  }
  submit() {
    if ( !this.PoNo || !this.Start || !this.End ||
        !this.Service || !this.ExtraCost || !this.Status ) {
      this.displayToast('Fill all the details!');
    } else {
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
