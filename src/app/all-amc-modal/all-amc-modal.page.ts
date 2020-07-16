import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {File, FileEntry} from '@ionic-native/file/ngx';
import {ModalController, NavParams, ToastController} from '@ionic/angular';
import {DatePicker} from '@ionic-native/date-picker/ngx';
import * as moment from 'moment';
import {map, startWith} from 'rxjs/operators';
import {ManageAmcService} from '../services/manage-amc/manage-amc.service';

@Component({
  selector: 'app-all-amc-modal',
  templateUrl: './all-amc-modal.page.html',
  styleUrls: ['./all-amc-modal.page.scss'],
})
export class AllAmcModalPage implements OnInit {
  poNo = new FormControl();
  vendor: any;
  vend = new FormControl();
  url = false;
  cost = 0;
  totalCost: any;
  procDate: any;
  expDate: any;
  vendorData: any;
  fileblob: any;
  data: any;
  name: any;
  amcPoData = [];
  disableProc = false;
  disableCost = false;
  filterData: Observable<any>;
  filterVendorData: Observable<any>;
  showTotalCost = false;
  location: any;
  proc: any;
  formData = new FormData();
  next = false;
  ddata: any;
  constructor(private fileChooser: FileChooser,
              private file: File,
              public viewCtrl: ModalController,
              private params: NavParams,
              private datepicker: DatePicker,
              private toastCtrl: ToastController,
              private service: ManageAmcService) { }
  selectedData = this.params.data.selectData;
  change() {
    console.log(this.ddata);
    console.log(this.vend.value);
    if ( !this.poNo || !this.procDate || !this.expDate) {
      this.displayToast('Fill all the details');
    } else if (!this.url) {
      this.displayToast('Upload the file');
    } else {
      this.next = true;
    }
  }
  back() {
    this.next = false;
  }
  calendarProc() {
    this.datepicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
    }).then(
        date => {
          this.proc = date;
          const newDate = date.getDate() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
          this.procDate = newDate;
        } ,
        err => console.log(err)
    );
  }
  calendarExp() {
    this.datepicker.show({
      date: new Date(),
      mode: 'date',
      minDate: (new Date(moment(this.proc).add(1, 'days').toISOString())).valueOf(),
      androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
    }).then(
        date => {
          const newDate = date.getDate() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
          this.expDate = newDate;
        } ,
        err => console.log(err)
    );
  }
  selectVendorEvent(item: any) {
    this.ddata = item.Vid;
  }
  selectEvent(item: any) {
    console.log(item);
    this.disableProc = true;
    this.totalCost = item.cost;
    this.proc = item.ProcDate;
    this.procDate = moment(item.ProcDate).format('DD/MM/YYYY');
    this.expDate = moment(item.ExpDate).format('DD/MM/YYYY');
    this.url = item.url;
    this.vendor = this.vendorData.find(data => data.Vid === item.VId);
    this.name = this.vendor.Name;
    console.log(this.name);
    this.showTotalCost = true;
  }
  upload() {
    this.fileChooser.open().then( uri => {
      this.file.resolveLocalFilesystemUrl(uri).then((fileEntry: FileEntry) => {
        fileEntry.file(file => {
          this.url = true;
          this.readFile(file);
        });
      });
    }).catch(e => console.log(e));
  }
  readFile(file: any) {
    // this.url = file;
    const reader = new FileReader();
    reader.onloadend = () => {
      const fileBlb = new Blob([reader.result], {
        type: file.type
      });
      this.fileblob = fileBlb;
      this.formData.append('file', this.fileblob, file.name);
      this.displayToast('Uploaded file');
    };
    reader.readAsArrayBuffer(file);
  }
  submit() {
    console.log(this.selectedData);
    for (const vals of this.selectedData) {
      this.cost += vals.Cost;
    }
    if (this.disableProc) {
      this.data = {
        vendor: this.vendor.Vid,
        poNo: this.poNo.value,
        totalCost: (this.totalCost + this.cost),
        expDate: this.expDate,
        procDate: this.procDate,
        asset: this.selectedData,
        location: this.location,
      };
      console.log(this.data);
      this.service.updateAmc(this.data).subscribe(result => {
        if (result) {
          this.service.insertLocation(this.data).subscribe(resultData => {
            if (resultData) {
              this.displayToast('Data sent');
              this.viewCtrl.dismiss(true);
            }
          });
        }
      });
    } else {
      this.data = {
        vendor: this.ddata,
        poNo: this.poNo.value,
        totalCost: this.cost,
        expDate: this.expDate,
        procDate: this.procDate,
        location: this.location,
        asset: this.selectedData,
      };
      console.log(this.data);
      this.formData.append('data', JSON.stringify(this.data));
      this.service.createAmc(this.formData).subscribe(result => {
        if (result) {
          this.service.insertLocation(this.data).subscribe(resultData => {
            if (resultData) {
              this.displayToast('Data sent');
              this.viewCtrl.dismiss(true);
            }
          });
        }
      });
    }
  }
  async displayToast(mess: string) {
    const toast = await this.toastCtrl.create({
      message: mess,
      duration: 2000});
    toast.present();
  }
  dismiss() {
    this.viewCtrl.dismiss(true);
  }
  ngOnInit() {
    const d = {
      data: this.selectedData,
    };
    this.service.getLocation(d).subscribe(data => {
      console.log(data);
      this.location = data;
    });
    this.service.getVendorData().subscribe(data => {
      this.vendorData = data;
    });
    this.service.getAmcPoData().subscribe(data => {
      this.amcPoData = data;
      console.log(this.amcPoData);
    });
    this.filterData = this.poNo.valueChanges
        .pipe(
            startWith(''),
            map(value => value.length >= 3 ? this._filter(value) : [])
        );
    this.filterVendorData = this.vend.valueChanges
        .pipe(
            startWith(''),
            map(value => value.length >= 3 ? this._filterVendor(value) : [])
        );
  }
  private _filter(value: string): string[] {
    const filterValue = value;

    return this.amcPoData.filter(option => option.po.includes(filterValue));
  }
  private _filterVendor(value: string): string[] {
    const filterValue = value;

    return this.vendorData.filter(option => option.Name.includes(filterValue));
  }
}
