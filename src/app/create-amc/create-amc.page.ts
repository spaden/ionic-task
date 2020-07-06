import { Component, OnInit } from '@angular/core';
import {ManageAmcService} from '../services/manage-amc/manage-amc.service';
import {ModalController} from '@ionic/angular';
import {AllAmcModalPage} from '../all-amc-modal/all-amc-modal.page';

@Component({
  selector: 'app-create-amc',
  templateUrl: './create-amc.page.html',
  styleUrls: ['./create-amc.page.scss'],
})
export class CreateAmcPage implements OnInit {

  assetList = [];
  selectList = [];
  filter: any;
  constructor(private service: ManageAmcService,
              public modalController: ModalController) { }

  addItem(entry, event) {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.selectList = this.selectList.filter(data => data.Id !== entry.Id);
      console.log(this.selectList);
    } else {
      // @ts-ignore
      /*this.assetList.find(data => {
        if (data.Id === entry.Id) {
          data.Checked = true;
        }
      });*/
      this.selectList.push(entry);
      console.log(this.selectList);
    }
  }
  loadDisplay() {
      this.assetList = [];
      this.selectList = [];
      this.service.getAmcData().subscribe(data => {
          console.log(data);
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < data.length; i++) {
              const val = {
                  Id: data[i].Id,
                  Key: data[i].itemKey,
                  Checked: false,
                  Cost: null,
              };
              this.assetList.push(val);
          }
          console.log(this.assetList);
      });
  }
  ngOnInit() {
      this.loadDisplay();
  }
  async presentModal() {
        if (this.selectList.length === 0) {
            window.alert('Select Asset first');
        } else {
            const sendData = {
                selectData: this.selectList
            };
            console.log(sendData);
            const modal = await this.modalController.create({
                component: AllAmcModalPage,
                componentProps: sendData
            });
            modal.onDidDismiss().then((data) => {
                if (data) {
                    this.loadDisplay();
                }
            });
            return await modal.present();
        }
    }
}
