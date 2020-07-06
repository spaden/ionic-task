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

@Component({
  selector: 'app-amc-modal',
  templateUrl: './amc-modal.page.html',
  styleUrls: ['./amc-modal.page.scss'],
})
export class AmcModalPage implements OnInit {
  poNo = new FormControl();
  vendor: any;
  url: any;
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
  showTotalCost = false;
  location: any;
  proc: any;
  formData = new FormData();
  constructor(private fileChooser: FileChooser,
              private file: File,
              public viewCtrl: ModalController,
              private params: NavParams,
              private datepicker: DatePicker,
              private toastCtrl: ToastController,
              private service: AmcServiceService) { }
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
  addCost() {
    if (this.showTotalCost) {
      this.totalCost += this.cost;
      this.disableCost = true;
    }
  }
  upload() {
    this.fileChooser.open().then( uri => {
      this.file.resolveLocalFilesystemUrl(uri).then((fileEntry: FileEntry) => {
        fileEntry.file(file => {
          this.readFile(file);
        });
      });
    }).catch(e => console.log(e));
  }
  readFile(file: any) {
      this.url = file;
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
    if ( !this.poNo || !this.procDate || !this.expDate ||
        !this.cost || !this.vendor ) {
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
                this.displayToast('Data sent');
                this.viewCtrl.dismiss(true);
            }
        });
    } else {
      this.data = {
          vendor: this.vendor,
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
          this.displayToast('Data sent');
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
            map(value => this._filter(value))
        );
  }
  private _filter(value: string): string[] {
    const filterValue = value;

    return this.amcPoData.filter(option => option.po.includes(filterValue));
  }

}
