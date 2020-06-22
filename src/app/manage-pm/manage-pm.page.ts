import { Component, OnInit } from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {PmModalPage} from '../pm-modal/pm-modal.page';
import {ManagePm} from '../classes/pm_class/manage-pm';
import {ManagePmService} from '../services/pm_service/manage-pm.service';
import {Observable} from 'rxjs';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {File, FileEntry} from '@ionic-native/file/ngx';
import {ActivatedRoute} from '@angular/router';
import {AssetService} from '../services/asset_info_service/asset.service';
import {Asset} from '../classes/asset_class/asset';
import {Downloader, DownloadRequest, NotificationVisibility} from '@ionic-native/downloader/ngx';

@Component({
  selector: 'app-manage-pm',
  templateUrl: './manage-pm.page.html',
  styleUrls: ['./manage-pm.page.scss'],
})
export class ManagePmPage implements OnInit {

  public filter: string;
  showCompleted = true;
  showNotCompleted = true;
  data: Observable<ManagePm[]>;
  formData = new FormData();
  filename: any;
  fileData: any;
  fileBlob: Blob;
  result: any[];
  allComplete: any[];
  allNotComplete: any[];
  assetKey: any;
  editData: any;
  assetId: any;
  assData: Observable<Asset[]>;
  public get assetData(): Observable<Asset[]> {
    return this.assData;
  }
  public set assetData(value: Observable<Asset[]>) {
    this.assData = value;
  }
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
              public assetService: AssetService,
              private route: ActivatedRoute,
              private toastCtrl: ToastController,
              private downloader: Downloader) {
    this.assetKey = this.route.snapshot.queryParams.key;
    console.log(this.assetKey);
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
              this.filename = null;
              this.loadDisplay();
          } else {
              console.log(result);
          }
      });
  }
  download(sno) {
    const body = {
      id: sno,
    };
    console.log(body);
    this.managePmService.getFile(body);
    console.log(this.file);
    const request: DownloadRequest = {
      // @ts-ignore
      uri: this.file,
      title: 'MyDownload',
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
        dirType: 'Downloads',
        subPath: 'MyFile.apk'
      }
    };
    this.downloader.download(request)
        .then((location: string) => this.displayToast('File downloaded at:' + location))
        .catch((error: any) => console.error(error));
  }
  loadDisplay() {
    const id = {
      AssetId: this.assetKey
    };
    this.assetData = this.assetService.getAssetData(id);
    this.showCompleted = true;
    this.showNotCompleted = true;
    // server code
    const data = {
      key: this.assetKey,
    };
    this.allPmData = this.managePmService.getPmData(data);
    this.data.subscribe( dat => {
      console.log(dat);
      this.allComplete = dat.filter(all => all.status === false);
      console.log(this.allComplete);
      this.allNotComplete = dat.filter(all => all.status === true);
      console.log(this.allNotComplete);
    });
    console.log(this.allNotComplete);
  }
  // file upload
  uploadFile() {
    this.fileChooser.open().then( uri => {
      this.file.resolveLocalFilesystemUrl(uri).then((fileEntry: FileEntry) => {
        fileEntry.file(file => {
          this.readFile(file);
        });
      });
    }).catch(e => console.log(e));
  }
  readFile(file: any) {
    this.fileData = file;
    this.filename = file.name;
    const reader = new FileReader();
    reader.onloadend = () => {
      const fileBlb = new Blob([reader.result], {
        type: file.type
      });
      this.fileBlob = fileBlb;
      this.formData.append('file', this.fileBlob, file.name);
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
    if (!this.fileBlob || !this.fileData || !this.filename) {
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
      this.filename = null;
      this.fileBlob = null;
      this.fileData = null;
      this.assetData = null;
      this.data = null;
      this.allNotComplete = null;
      this.allComplete = null;
      this.allPmData = null;
      this.loadDisplay();
  }

}
