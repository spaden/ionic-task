import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AmcServiceService} from '../services/amc_service/amc-service.service';
import {AssetService} from '../services/asset_info_service/asset.service';
import {Observable} from 'rxjs';
import {Asset} from '../classes/asset_class/asset';

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
  data: Observable<Asset[]>;
  constructor(private route: ActivatedRoute,
              public assetService: AssetService,
              private service: AmcServiceService) {
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
      }
      if (result.warrantyData) {
        this.allWarranty = result.warrantyData;
        this.showWarranty = true;
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
  ngOnInit() {
    this.assetData = null;
    this.allAmc = null;
    this.allWarranty = null;
    this.loadDisplay();
  }

}
