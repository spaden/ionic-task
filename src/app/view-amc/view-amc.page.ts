import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AmcServiceService} from '../services/amc_service/amc-service.service';
import {AssetService} from '../services/asset_info_service/asset.service';
import {Observable} from 'rxjs';
import {Asset} from '../classes/asset_class/asset';
import * as moment from 'moment';
import {ModalController} from '@ionic/angular';
import {AmcModalPage} from '../amc-modal/amc-modal.page';

@Component({
  selector: 'app-view-amc',
  templateUrl: './view-amc.page.html',
  styleUrls: ['./view-amc.page.scss'],
})
export class ViewAmcPage implements OnInit {
  public filter: string;
  showAMC = true;
  showWarranty = true;
  allAmc: any[];
  allWarranty: any[];
  assetKey: any;
  assetId: any;
  disableAmc = true;
  data: Observable<Asset[]>;
  constructor(private route: ActivatedRoute,
              public assetService: AssetService,
              private service: AmcServiceService,
              public modalController: ModalController) {
    this.assetKey = this.route.snapshot.queryParams.key;
    console.log(this.assetKey);
  }
  public get assetData(): Observable<Asset[]> {
    return this.data;
  }
  public set assetData(value: Observable<Asset[]>) {
    this.data = value;
  }
  loadDisplay() {
    const id = {
      AssetId: this.assetKey
    };
    this.assetData = this.assetService.getAssetData(id);
    const data = {
      key: this.assetKey,
    };
    this.service.getAmcData(data).subscribe(result => {
      console.log(result);
      console.log(result.amcData);
      if (result.amcData) {
        this.allAmc = result.amcData;
        this.showAMC = true;
        const length = this.allAmc.length;
        const today = new Date();
        const end = new Date(this.allAmc[length - 1].endDate);
        if (end < today) {
          window.alert('AMC has expired');
          this.disableAmc = false;
        }
      }
      if (result.warrantyData) {
        this.allWarranty = result.warrantyData;
        this.showWarranty = true;
        const length = this.allWarranty.length;
        const today = new Date();
        const end = new Date(this.allWarranty[length - 1].endDate);
        if (end < today) {
          window.alert('Warranty has expired');
          this.disableAmc = false;
        }
      }
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
  async presentModal() {
    const sendData = {
      key: this.assetKey
    };
    console.log(sendData);
    const modal = await this.modalController.create({
      component: AmcModalPage,
      componentProps: sendData
    });
    modal.onDidDismiss().then((data) => {
      if (data) {
        this.loadDisplay();
      }
    });
    return await modal.present();
  }
  ngOnInit() {
    this.assetData = null;
    this.allAmc = null;
    this.allWarranty = null;
    this.loadDisplay();
  }

}
