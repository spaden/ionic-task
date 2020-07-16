import {Component, OnDestroy, OnInit} from '@angular/core';
import {ManageAmcService} from '../services/manage-amc/manage-amc.service';
import {ModalController} from '@ionic/angular';
import {AllAmcModalPage} from '../all-amc-modal/all-amc-modal.page';
import {DataItemsService} from '../services/list_service/data-items.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-create-amc',
  templateUrl: './create-amc.page.html',
  styleUrls: ['./create-amc.page.scss'],
})
export class CreateAmcPage implements OnInit, OnDestroy {

  assetList = [];
  asset = [];
  selectList = [];
  subscription: Subscription;
  data: any;
  filter: any;
  val: any;
  constructor(private service: ManageAmcService,
              public modalController: ModalController,
              private list: DataItemsService) {
      this.data = this.list.amcItems;
      this.subscription = this.list.amcItemsChange.subscribe((value) => {
          console.log(value);
          this.data = value;
          this.loadDisplay();
      });
  }

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
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.data.length; i++) {
          const val = {
              Id: this.data[i].Id,
              Key: this.data[i].itemKey,
              Checked: false,
              Cost: null,
          };
          this.assetList.push(val);
      }
      this.asset = this.assetList;
  }
  ngOnInit() {
      this.data = this.list.amcItems;
      this.loadDisplay();
  }
  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
  onSearch(event) {
     this.val = event.target.value;
     this.assetList = this.asset.filter((dat) => dat.Id.includes(this.val));
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
                    this.list.fetchAmcData();
                    this.loadDisplay();
                }
            });
            return await modal.present();
        }
    }
}
