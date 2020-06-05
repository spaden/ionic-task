import { Component, OnInit } from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {PmModalPage} from '../pm-modal/pm-modal.page';
import {ManagePm} from '../classes/pm_class/manage-pm';
import {ManagePmService} from '../services/pm_service/manage-pm.service';
import {Observable} from 'rxjs';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {File, FileEntry} from '@ionic-native/file/ngx';
@Component({
  selector: 'app-manage-pm',
  templateUrl: './manage-pm.page.html',
  styleUrls: ['./manage-pm.page.scss'],
})
export class ManagePmPage implements OnInit {

  public filter: string;
  showCompleted = true;
  showNotCompleted = true;
  allData = [{
    poNo: 'Ud21345',
    start: '22/01/2018',
    end: '23/09/2021',
    service: '21/08/2019',
    comments: 'ok',
    extraCost: '0',
    status: 'done'
  },
    { poNo: 'Ad21345',
      start: '',
      end: '',
      service: '',
      comments: '',
      extraCost: '',
      status: 'not done'}];
  // data: Observable<ManagePm[]>;
  result: any[];
  allComplete: any[];
  allNotComplete: any[];
  // server code
  /*public get allPmData(): Observable<ManagePm[]> {
    return this.data;
  }
  public set allPmData(value: Observable<ManagePm[]>) {
    this.data = value;
  }*/
  constructor(public modalController: ModalController,
              public managePmService: ManagePmService,
              // private fileChooser: FileChooser,
              // private file: File,
              private toastCtrl: ToastController) { }
  /*getCompleteData(): any[] {
    return this.allData.filter(all => all.Status === 'done');
  }
  getInCompleteData(): any[] {
    return this.allData.filter(all => all.Status === 'not done');
  }*/
  getData(value): any[] {
    return this.allData.filter(all => all.poNo === value);
    // server code
    // return this.allNotComplete.filter(all => all.poNo === value);
  }
  // server code
  /*setData(value) {
    // let val = this.allData.filter(all => all.Po_no === value.Po_no).pop();
    // val = value;
    this.allData = this.allData.concat(value);
    console.log(this.allData);
  }*/
  loadDisplay() {
    // this.allComplete = this.getCompleteData();
    // this.allNotComplete = this.getInCompleteData();
    this.showCompleted = true;
    this.showNotCompleted = true;
    // server code
    /*this.allPmData = this.managePmService.getPmData();
    this.data.subscribe( dat => {
      this.allComplete = dat.filter(all => all.status === 'done');
      console.log(this.allComplete);
      this.allNotComplete = dat.filter(all => all.status === 'not done');
      console.log(this.allNotComplete);
    });
    console.log(this.allNotComplete);*/
  }
  // file upload
  /*uploadFile() {
    this.fileChooser.open().then( uri => {
      this.file.resolveLocalFilesystemUrl(uri).then((fileEntry: FileEntry) => {
        fileEntry.file(file => {
          this.readFile(file);
        });
      });
    }).catch(e => console.log(e));
  }
  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const fileBlob = new Blob([reader.result], {
        type: file.type
      });
      const formData = new FormData();
      formData.append('name', 'hello');
      formData.append('file', fileBlob, file.name);
      const data = {
        fileResult: file
      };
      this.managePmService.uploadFile(data).subscribe(dataResult => {
        if (dataResult) {
          this.displayToast('uploaded successfully');
        } else {
          this.displayToast('try again');
        }
      });
    };
    reader.readAsArrayBuffer(file);
  }*/
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
  async presentModal(value: string) {
    const sendData = this.getData(value);
    console.log(sendData);
    const modal = await this.modalController.create({
      component: PmModalPage,
      componentProps: sendData
    });
    modal.onDidDismiss().then((data) => {
      if (data != null ) {
        // this.setData(data.data);
        // server code
        this.managePmService.postPmData(data.data).subscribe( result => {
          if (result) {
            this.loadDisplay();
          } else {
            console.log(result);
          }
        });
        console.log(data.data);
      }
    });
    return await modal.present();
  }
  ngOnInit() {
    this.loadDisplay();
  }

}
