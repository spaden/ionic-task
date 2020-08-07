import {Component, OnDestroy, OnInit} from '@angular/core';
import {ManageAmcService} from '../services/manage-amc/manage-amc.service';
import {Downloader, DownloadRequest, NotificationVisibility} from '@ionic-native/downloader/ngx';
import {ToastController} from '@ionic/angular';
import {DataItemsService} from '../services/list_service/data-items.service';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {Subscription} from "rxjs";
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-view-all-amc',
  templateUrl: './view-all-amc.page.html',
  styleUrls: ['./view-all-amc.page.scss'],
})
export class ViewAllAmcPage implements OnInit, OnDestroy {

  filter: any;
  amc: any;
  asset: any;
  show: any;
  fileName = 'file.pdf';
  subscription: Subscription;
  constructor(private service: ManageAmcService,
              private toastCtrl: ToastController,
              private downloader: Downloader,
              private listService: DataItemsService,
              private transfer: FileTransfer,
              private file: File,
              private opener: FileOpener,
              private localNotifications: LocalNotifications) {
      this.amc = this.listService.viewAmcItems;
      this.show = new Array(this.amc.length).fill(false);
      this.subscription = this.listService.viewAmcItemsChange.subscribe((value) => {
          console.log(value);
          this.amc = value;
          this.show = new Array(this.amc.length).fill(false);
      });
  }

  ngOnInit() {
      this.amc = this.listService.viewAmcItems;
      this.show = new Array(this.amc.length).fill(false);
  }
  ngOnDestroy() {
        this.subscription.unsubscribe();
    }

  download(sno, url) {
      const body = {
          id: sno,
      };
      console.log(body);
      console.log(url.substr(url.lastIndexOf('\\') + 1));
      this.fileName = url.substr(url.lastIndexOf('\\') + 1);
      this.service.getFile(body).subscribe(data => {
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
                  .then(() => this.localNotifications.schedule({
                    title: 'File Downloaded',
                    text: entry.toURL(),
                    foreground: true
                  }))
                  .catch(e => console.log('Error ' + e));
              }, err => {
                console.log('download error: ' + err);
          });
      });
      reader.readAsDataURL(image);
  }
  fetch(po, i) {
      if (!this.show[i]) {
          this.show.fill(false);
          this.service.getAssetAmc({po}).subscribe(data => {
              console.log(data);
              this.asset = data.data;
              this.show[i] = true;
          });
      } else {
          this.show[i] = false;
      }
  }

  async displayToast(mess: string) {
        const toast = await this.toastCtrl.create({
            message: mess,
            duration: 2000});
        toast.present();
    }
}
