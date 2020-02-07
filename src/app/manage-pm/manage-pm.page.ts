import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PmModalPage} from '../pm-modal/pm-modal.page';

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
    Po_no: 'Ud21345',
    Start: '22/01/1994',
    End: '23/09/2111',
    Service: '21/04/2312',
    Comments: 'ok',
    ExtraCost: '0',
    Status: 'done'
  },
    { Po_no: 'Ad21345',
      Start: '',
      End: '',
      Service: '',
      Comments: '',
      ExtraCost: '',
      Status: 'not done'}];
  allComplete: any[];
  allNotComplete: any[];
  constructor(public modalController: ModalController) { }
  getAmcData(): any[] {
    return this.allData.filter(all => all.Status === 'done');
  }
  getWarrantyData(): any[] {
    return this.allData.filter(all => all.Status === 'not done');
  }
  getData(value): any[] {
    return this.allData.filter(all => all.Po_no === value);
  }
  setData(value) {
    // let val = this.allData.filter(all => all.Po_no === value.Po_no).pop();
    // val = value;
    this.allData = this.allData.concat(value);
    console.log(this.allData);
  }
  loadDisplay() {
    this.allComplete = this.getAmcData();
    this.allNotComplete = this.getWarrantyData();
    this.showCompleted = true;
    this.showNotCompleted = true;
  }
  showCompletedOnly() {
    this.showCompleted = true;
    this.showNotCompleted = false;
  }
  showNotCompletedOnly() {
    this.showCompleted = false;
    this.showNotCompleted = true;
  }
  async presentModal(value: any) {
    const sendData = this.getData(value);
    const modal = await this.modalController.create({
      component: PmModalPage,
      componentProps: sendData
    });
    modal.onDidDismiss().then((data) => {
      if (data != null ) {
        this.setData(data.data);
        console.log(data.data);
      }
    });
    return await modal.present();
  }
  ngOnInit() {
    this.loadDisplay();
  }

}
