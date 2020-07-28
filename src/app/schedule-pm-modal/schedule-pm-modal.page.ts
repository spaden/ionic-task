import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams, ToastController} from '@ionic/angular';
import {DatePicker} from '@ionic-native/date-picker/ngx';
import * as moment from 'moment';
import {ManagePmService} from '../services/manage_pm/manage-pm.service';
import {forEach} from "@angular-devkit/schematics";

@Component({
  selector: 'app-schedule-pm-modal',
  templateUrl: './schedule-pm-modal.page.html',
  styleUrls: ['./schedule-pm-modal.page.scss'],
})
export class SchedulePmModalPage implements OnInit {

  basis: any;
  services: any;
  arr: any;
  serviceDate: any;
  startDate: any;
  endDate: any;
  frequency: any;
  constructor(private params: NavParams,
              private viewCtrl: ModalController,
              private datepicker: DatePicker,
              private toastCtrl: ToastController,
              private service: ManagePmService) { }
  sno = this.params.data.sNo;
  amc = this.params.data.amcW;
  start = this.params.data.start;
  end = this.params.data.end;
  duration: any;
  ngOnInit() {
  }
  calendar(name, i: any) {
    console.log(i);
    if (name === 'service') {
        if (i === 0) {
            this.datepicker.show({
                date: new Date(),
                mode: 'date',
                // @ts-ignore
                minDate: (new Date(moment(this.start).add(1, 'days').toISOString())).valueOf(),
                // @ts-ignore
                maxDate: (new Date(moment(this.end).subtract(1, 'days').toISOString())).valueOf(),
                androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
            }).then(
                date => {
                    const newDate = date;
                    this.serviceDate[i] = newDate;
                } ,
                err => console.log(err)
            );
        } else {
            this.datepicker.show({
                date: new Date(),
                mode: 'date',
                // @ts-ignore
                minDate: (new Date(moment(this.serviceDate[i - 1]).add(1, 'days').toISOString())).valueOf(),
                // @ts-ignore
                maxDate: (new Date(moment(this.end).subtract(1, 'days').toISOString())).valueOf(),
                androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
            }).then(
                date => {
                    const newDate = date;
                    this.serviceDate[i] = newDate;
                } ,
                err => console.log(err)
            );
        }
    } else {
        if (i === 0) {
            this.datepicker.show({
                date: new Date(),
                mode: 'date',
                // @ts-ignore
                minDate: (new Date(moment(this.start).add(1, 'days').toISOString())).valueOf(),
                // @ts-ignore
                maxDate: (new Date(moment(this.end).subtract(1, 'days').toISOString())).valueOf(),
                androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
            }).then(
                date => {
                    const newDate = date;
                    this.startDate[i] = newDate;
                } ,
                err => console.log(err)
            );
        } else {
            this.datepicker.show({
                date: new Date(),
                mode: 'date',
                // @ts-ignore
                minDate: (new Date(moment(this.endDate[i - 1]).add(1, 'days').toISOString())).valueOf(),
                // @ts-ignore
                maxDate: (new Date(moment(this.end).subtract(1, 'days').toISOString())).valueOf(),
                androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
            }).then(
                date => {
                    const newDate = date;
                    this.startDate[i] = newDate;
                } ,
                err => console.log(err)
            );
        }
    }
  }
  calendarEnd(i: any) {
        if (this.startDate[i] != null) {
            console.log(i);
            this.datepicker.show({
                date: new Date(),
                mode: 'date',
                // @ts-ignore
                minDate: (new Date(moment(this.startDate[i]).add(1, 'days').toISOString())).valueOf(),
                // @ts-ignore
                maxDate: (new Date(moment(this.startDate[i]).add(16, 'days').toISOString())).valueOf(),
                androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
            }).then(
                date => {
                    const newDate = date;
                    this.endDate[i] = newDate;
                } ,
                err => console.log(err)
            );
        } else {
            this.displayToast('Fill start date first');
        }
    }
  setPreference(event: any) {
      console.log(event.target.value);
      this.basis = event.target.value;
      // @ts-ignore
      const str = new Date(moment(this.start));
      // @ts-ignore
      const end = new Date(moment(this.end));
      this.duration = (end.getTime() - str.getTime()) / (1000 * 3600 * 24);
      console.log(this.duration);
      this.services = null;
      this.serviceDate = new Array(0);
      this.startDate = new Array(0);
      this.endDate = new Array(0);
  }
  setFrequency(event: any) {
      console.log(event.target.value);
      this.frequency = event.target.value;
  }
  formArray() {
    this.arr = new Array(this.services);
    this.serviceDate = new Array(this.services);
    this.endDate = new Array(this.services);
    this.startDate = new Array(this.services);
  }
  submit() {
    if (this.basis === 'date') {
        const data = {
            sno: this.sno,
            start: this.serviceDate,
            end: this.serviceDate,
            status: 0,
            length: this.services,
        };
        let notAll = false;
        for (let i = 0; i < this.services; i++) {
            if (!this.serviceDate[i]) {
                notAll = true;
            }
        }
        if (notAll === true) {
            this.displayToast('Fill all details');
        } else {
            console.log(data);
            if (this.amc === 1) {
                this.service.postAmcPmData(data).subscribe(result => {
                    this.displayToast('Data sent');
                    this.viewCtrl.dismiss(true);
                });
            } else {
                this.service.postWarrantyPmData(data).subscribe(result => {
                    this.displayToast('Data sent');
                    this.viewCtrl.dismiss(true);
                });
            }
        }
    } else {
        const data = {
            sno: this.sno,
            start: this.startDate,
            end: this.endDate,
            status: 0,
            length: this.services,
        };
        let notAll = false;
        for (let i = 0; i < this.services; i++) {
            if (!this.startDate[i]) {
                notAll = true;
            }
        }
        if (notAll) {
            this.displayToast('Fill all details');
        } else {
            for (let i = 0; i < this.services; i++) {
                if (!this.endDate[i]) {
                    notAll = true;
                }
            }
            if (notAll) {
                this.displayToast('Fill all details');
            } else {
                console.log(data);
                if (this.amc === 1) {
                    this.service.postAmcPmData(data).subscribe(result => {
                        this.displayToast('Data sent');
                        this.viewCtrl.dismiss(true);
                    });
                } else {
                    this.service.postWarrantyPmData(data).subscribe(result => {
                        this.displayToast('Data sent');
                        this.viewCtrl.dismiss(true);
                    });
                }
            }
        }
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
}
