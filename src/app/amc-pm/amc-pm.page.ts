import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ManagePm} from '../classes/pm_class/manage-pm';
import {Asset} from '../classes/asset_class/asset';
import {ModalController, ToastController} from '@ionic/angular';
import {ManagePmService} from '../services/manage_pm/manage-pm.service';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {File, FileEntry} from '@ionic-native/file/ngx';
import {ActivatedRoute} from '@angular/router';
import {Downloader} from '@ionic-native/downloader/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {PmModalPage} from '../pm-modal/pm-modal.page';

@Component({
  selector: 'app-amc-pm',
  templateUrl: './amc-pm.page.html',
  styleUrls: ['./amc-pm.page.scss'],
})
export class AmcPmPage implements OnInit {

  public filter: string;
  showCompleted = true;
  showNotCompleted = true;
  data: Observable<ManagePm[]>;
  formData = new FormData();
  fileData: any;
  fileBlob: Blob;
  result: any[];
  allComplete: any[];
  allNotComplete: any[];
  key: any;
  editData: any;
  amc: any;
  po: any;
  fileName = 'file.pdf';
  public get allPmData(): Observable<ManagePm[]> {
    return this.data;
  }
  public set allPmData(value: Observable<ManagePm[]>) {
    this.data = value;
  }
  constructor(public modalController: ModalController,
              public managePmService: ManagePmService,
              private fileChooser: FileChooser,
              private file: File,
              private route: ActivatedRoute,
              private toastCtrl: ToastController,
              private downloader: Downloader,
              private path: FilePath,
              private transfer: FileTransfer,
              private opener: FileOpener) {
    this.key = this.route.snapshot.queryParams.key;
    this.po = this.route.snapshot.queryParams.PO;
    this.amc = this.route.snapshot.queryParams.amc;
  }
  getData(event): any {
    console.log(event.target);
    console.log(event.target.value);
    console.log(event.target.poNo);
    console.log(event.target.startDate);
    return event.target.value;
  }
  setData(value) {
    this.editData = {
      SNo: value.SNo,
      start: value.start,
      end: value.end,
      service: value.service,
      extra: value.extraCost,
      comment: value.comments,
      status: 1,
    };
    console.log(this.editData);
    this.formData.append('data', JSON.stringify(this.editData));
    // server code
    this.managePmService.postPmData(this.formData).subscribe( result => {
      if (result) {
        this.displayToast('Data Sent');
        this.formData = new FormData();
        this.fileData = null;
        this.fileBlob = null;
        this.fileName = null;
        this.loadDisplay();
      } else {
        console.log(result);
      }
    });
  }
  download(sno, url) {
    const body = {
      id: sno,
    };
    console.log(body);
    console.log(url.substr(url.lastIndexOf('\\') + 1));
    this.fileName = url.substr(url.lastIndexOf('\\') + 1);
    this.managePmService.getFile(body).subscribe(data => {
      this.downloadFromBlob(data.body);
    });
  }
  downloadFromBlob(image) {
    console.log(image.type);
    const fileTransfer: FileTransferObject = this.transfer.create();
    const reader = new FileReader();
    reader.onloadend = (evt => {
      console.log(reader.result);
      fileTransfer.download(reader.result.toString(), this.file.externalRootDirectory + this.fileName).then((entry) => {
        this.opener.open(entry.toURL(), image.type)
            .then(() => this.displayToast('download complete: ' + entry.toURL()))
            .catch(e => console.log('Error ' + e));
      }, err => {
        console.log('download error: ' + err);
      });
    });
    reader.readAsDataURL(image);
  }
  loadDisplay() {
      // server code
      const data = {
          key: this.key,
      };
      console.log(this.amc);
      if (this.amc === '1') {
          this.showCompleted = true;
          this.showNotCompleted = true;
          this.allPmData = this.managePmService.getAmcData(data);
          console.log(this.allPmData);
          if (this.allPmData != null) {
              console.log(this.data);
              this.data.subscribe( dat => {
                  console.log(dat);
                  this.allComplete = dat.filter(all => all.status === false);
                  console.log(this.allComplete);
                  this.allNotComplete = dat.filter(all => all.status === true);
                  console.log(this.allNotComplete);
              });
              console.log(this.allNotComplete);
          }
      } else {
          this.showCompleted = true;
          this.showNotCompleted = true;
          this.allPmData = this.managePmService.getWarrantyData(data);
          this.data.subscribe( dat => {
              console.log(dat);
              this.allComplete = dat.filter(all => all.status === false);
              console.log(this.allComplete);
              this.allNotComplete = dat.filter(all => all.status === true);
              console.log(this.allNotComplete);
          });
          console.log(this.allNotComplete);
      }
  }
  // file upload
  uploadFile() {
    this.fileChooser.open().then( uri => {
      this.path.resolveNativePath(uri).then(filePath => {
        this.fileName = filePath.substr(filePath.lastIndexOf('/') + 1);
      });
      this.file.resolveLocalFilesystemUrl(uri).then((fileEntry: FileEntry) => {
        fileEntry.file(file => {
          this.readFile(file);
        });
      });
    }).catch(e => console.log(e));
  }
  readFile(file: any) {
    this.fileData = file;
    const reader = new FileReader();
    reader.onloadend = () => {
      const fileBlb = new Blob([reader.result], {
        type: file.type
      });
      this.fileBlob = fileBlb;
      if (this.formData.has('file')) {
        this.formData.delete('file');
        this.formData.append('file', this.fileBlob, this.fileName);
      } else {
        this.formData.append('file', this.fileBlob, this.fileName);
      }
      this.displayToast('file uploaded successfully');
    };
    reader.readAsArrayBuffer(file);
  }
  async displayToast(mess: string) {
    const toast = await this.toastCtrl.create({
      message: mess,
      duration: 2000});
    toast.present();
  }
  showCompletedOnly() {
    this.showCompleted = true;
    this.showNotCompleted = false;
  }
  showNotCompletedOnly() {
    this.showCompleted = false;
    this.showNotCompleted = true;
  }
  async presentModal(sno, po, extra, comment, startDate, endDate, serviceDate, stat) {
    if (!this.fileBlob || !this.fileData || !this.fileName) {
      window.alert('Upload file first');
    } else {
      const sendData = {
        sNo: sno,
        poNo: po,
        extraCost: extra,
        comments: comment,
        start: startDate,
        end: endDate,
        service: serviceDate,
        status: stat,
      };
      console.log(sendData);
      const modal = await this.modalController.create({
        component: PmModalPage,
        componentProps: sendData
      });
      modal.onDidDismiss().then((data) => {
        if (data != null ) {
          this.setData(data.data);
        }
      });
      return await modal.present();
    }
  }
  ngOnInit() {
    this.editData = null;
    this.fileName = null;
    this.fileBlob = null;
    this.fileData = null;
    this.data = null;
    this.allNotComplete = null;
    this.allComplete = null;
    this.allPmData = null;
    if (this.key) {
        this.loadDisplay();
    }
  }

}
