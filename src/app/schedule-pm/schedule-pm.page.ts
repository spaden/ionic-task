import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {DataItemsService} from '../services/list_service/data-items.service';
import {ManagePmService} from '../services/manage_pm/manage-pm.service';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {Downloader} from '@ionic-native/downloader/ngx';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {SchedulePmModalPage} from '../schedule-pm-modal/schedule-pm-modal.page';

@Component({
  selector: 'app-schedule-pm',
  templateUrl: './schedule-pm.page.html',
  styleUrls: ['./schedule-pm.page.scss'],
})
export class SchedulePmPage implements OnInit, OnDestroy {

  public filter: string;
  showAMC = true;
  showWarranty = true;
  allAmc: any[];
  allWarranty: any[];
  data: any[];
  fileName = 'file.pdf';
  subscription: Subscription;
  constructor(private route: Router,
              private alertCtrl: AlertController,
              private listService: DataItemsService,
              private service: ManagePmService,
              private toastCtrl: ToastController,
              private downloader: Downloader,
              private modalController: ModalController,
              private transfer: FileTransfer,
              private file: File,
              private opener: FileOpener) {
    this.data = this.listService.schedulePmItems;
    this.allAmc = this.data.filter(value => value.amc === 1);
    this.allWarranty = this.data.filter(value => value.amc === 0);
    console.log(this.allAmc);
    console.log(this.allWarranty);
    this.subscription = this.listService.schedulePmItemsChange.subscribe((value) => {
      console.log(value);
      this.data = value;
      this.allAmc = this.data.filter(result => result.amc === 1);
      this.allWarranty = this.data.filter(result => result.amc === 0);
    });
  }
  showAMCOnly() {
    this.showAMC = true;
    this.showWarranty = false;
  }
  showWarrantyOnly() {
    this.showWarranty = true;
    this.showAMC = false;
  }
  async presentModal(sno, proc, exp, amcW) {
    const sendData = {
      sNo: sno,
      amc: amcW,
      start: proc,
      end: exp,
    };
    console.log(sendData);
    const modal = await this.modalController.create({
      component: SchedulePmModalPage,
      cssClass: 'modal-class',
      componentProps: sendData
    });
    modal.onDidDismiss().then((data) => {
      if (data != null ) {
        this.listService.fetchSchedulePmData();
      }
    });
    return await modal.present();
  }
  download(sno, url) {
    const body = {
      id: sno,
    };
    console.log(body);
    console.log(url.substr(url.lastIndexOf('\\') + 1));
    this.fileName = url.substr(url.lastIndexOf('\\') + 1);
    this.service.getAmcFile(body).subscribe(data => {
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
  async displayToast(mess: string) {
    const toast = await this.toastCtrl.create({
      message: mess,
      duration: 2000});
    toast.present();
  }
  ngOnInit() {
    this.data = this.listService.managePmItems;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
