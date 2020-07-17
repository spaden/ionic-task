import { Component, OnInit } from '@angular/core';
import {ManageAmcService} from '../services/manage-amc/manage-amc.service';
import {Downloader, DownloadRequest, NotificationVisibility} from '@ionic-native/downloader/ngx';
import {ToastController} from '@ionic/angular';
import {DataItemsService} from '../services/list_service/data-items.service';

@Component({
  selector: 'app-view-all-amc',
  templateUrl: './view-all-amc.page.html',
  styleUrls: ['./view-all-amc.page.scss'],
})
export class ViewAllAmcPage implements OnInit {

  filter: any;
  amc: any;
  asset: any;
  show: any;
  constructor(private service: ManageAmcService,
              private toastCtrl: ToastController,
              private downloader: Downloader,
              private listService: DataItemsService) {}

  ngOnInit() {
      console.log(this.listService.userLoc);
      if (this.listService.userLoc  === '00') {
          this.service.viewAmc({location: '0%'}).subscribe(data => {
              this.amc = data.data;
              this.show = new Array(this.amc.length).fill(false);
              console.log(data);
          });
      } else {
          this.service.viewAmc({location: this.listService.userLoc + '%'}).subscribe(data => {
              this.amc = data.data;
              this.show = new Array(this.amc.length).fill(false);
              console.log(data);
          });
      }
  }

  download(sno) {
        const body = {
            id: sno,
        };
        console.log(body);
        this.service.getFile(body);
        console.log(this.service.file);
        const request: DownloadRequest = {
            // @ts-ignore
            uri: this.service.file,
            title: 'MyDownload',
            description: '',
            mimeType: '',
            visibleInDownloadsUi: true,
            notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
            destinationInExternalFilesDir: {
                dirType: 'C:\\uploads',
                subPath: 'content'
            }
        };
        this.downloader.download(request)
            .then((location: string) => this.displayToast('File downloaded at:' + location))
            .catch((error: any) => console.error(error));
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
