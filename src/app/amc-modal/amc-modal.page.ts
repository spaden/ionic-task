import { Component, OnInit } from '@angular/core';
import {File, FileEntry} from '@ionic-native/file/ngx';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {ModalController, NavParams, ToastController} from '@ionic/angular';
import {DatePicker} from '@ionic-native/date-picker/ngx';
import {AmcServiceService} from '../services/amc_service/amc-service.service';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {FilePath} from '@ionic-native/file-path/ngx';

@Component({
  selector: 'app-amc-modal',
  templateUrl: './amc-modal.page.html',
  styleUrls: ['./amc-modal.page.scss'],
})
export class AmcModalPage implements OnInit {
  poNo = new FormControl();
  vend = new FormControl();
  vendor: any;
  url = false;
  cost: any;
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
  ddata: any;
  fileName: any;
  constructor(private fileChooser: FileChooser,
              private file: File,
              public viewCtrl: ModalController,
              private params: NavParams,
              private datepicker: DatePicker,
              private toastCtrl: ToastController,
              private service: AmcServiceService,
              private path: FilePath) { }
  key = this.params.data.key;
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
  selectVendorEvent(item: any) {
      this.ddata = item.Vid;
  }
  addCost() {
    if (this.showTotalCost) {
      this.totalCost += this.cost;
      this.disableCost = true;
    }
  }
  upload() {
      this.fileChooser.open().then( uri => {
          this.path.resolveNativePath(uri).then(filePath => {
              this.fileName = filePath.substr(filePath.lastIndexOf('/') + 1);
              this.formData.append('file', uri, this.fileName);
          });
          this.file.resolveLocalFilesystemUrl(uri).then((fileEntry: FileEntry) => {
              fileEntry.file(file => {
                  this.url = true;
                  this.readFile(file);
              });
          });
      }).catch(e => console.log(e));
  }
  readFile(file: any) {
      const reader = new FileReader();
      reader.onloadend = () => {
          const fileBlb = new Blob([reader.result], {
              type: file.type
          });
          this.fileblob = fileBlb;
          if (this.formData.has('file')) {
              this.formData.delete('file');
              this.formData.append('file', this.fileblob, this.fileName);
          } else {
              this.formData.append('file', this.fileblob, this.fileName);
          }
          this.displayToast('Uploaded file');
      };
      reader.readAsArrayBuffer(file);
  }
  submit() {
    if ( !this.poNo || !this.procDate || !this.expDate ||
        !this.cost) {
        this.displayToast('Fill all the details');
    } else if (!this.url) {
        this.displayToast('Upload the file');
    } else if (this.disableProc) {
        this.data = {
            vendor: this.vendor.Vid,
            poNo: this.poNo.value,
            cost: this.cost,
            totalCost: this.totalCost,
            expDate: this.expDate,
            showTotalCost: this.showTotalCost,
            procDate: this.procDate,
            key: this.key,
            location: this.location,
        };
        console.log(this.data);
        this.service.updateAmc(this.data).subscribe(result => {
            if (result) {
                this.displayToast('AMC Created Successfully!');
                this.viewCtrl.dismiss(true);
            }
        });
    } else {
      this.data = {
          vendor: this.ddata,
          poNo: this.poNo.value,
          cost: this.cost,
          totalCost: this.totalCost,
          expDate: this.expDate,
          showTotalCost: this.showTotalCost,
          procDate: this.procDate,
          key: this.key,
          location: this.location,
      };
      console.log(this.data);
      this.formData.append('data', JSON.stringify(this.data));
      this.service.createAmc(this.formData).subscribe(result => {
        if (result) {
          this.displayToast('AMC Created Successfully!');
          this.viewCtrl.dismiss(true);
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
    this.viewCtrl.dismiss();
  }
  ngOnInit() {
      const d = {
          key: this.key,
      };
      this.service.getLocation(d).subscribe(data => {
          console.log(data);
          this.location = data[0].location;
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
              map(value => value.length >= 1 ? this._filterVendor(value) : [])
          );
  }
  private _filter(value: string): string[] {
    const filterValue = value;

    return this.amcPoData.filter(option => option.po.includes(filterValue));
  }
  private _filterVendor(value: string): string[] {
      const filterValue = value.toLowerCase();
      const result = this.vendorData.filter(option => option.Name.toLowerCase().includes(filterValue));
      if (result.length === 0) {
          this.displayToast('No vendor exists in list');
          return null;
      } else {
          return result;
      }
  }
}
