import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AssetService} from '../services/asset_info_service/asset.service';
import {Observable} from 'rxjs';
import {Asset} from '../classes/asset_class/asset';
import {AssetVariable} from '../classes/asset_class/asset-variable';
import {LocalStorageService} from '../services/storage/local-storage.service';

@Component({
  selector: 'app-asset-info',
  templateUrl: './asset-info.page.html',
  styleUrls: ['./asset-info.page.scss'],
})
export class AssetInfoPage implements OnInit {
  private assetId: string;
  public data: Observable<Asset[]>;
  public varData: Observable<AssetVariable[]>;
  constructor(private route: ActivatedRoute,
              private assetService: AssetService) {
    this.assetId = this.route.snapshot.queryParams.key;
    console.log(this.assetId);
  }
  public get assetData(): Observable<Asset[]> {
    return this.data;
  }
  public set assetData(value: Observable<Asset[]>) {
    this.data = value;
  }
  public get assetVarData(): Observable<AssetVariable[]> {
    return this.varData;
  }
  public set assetVarData(value: Observable<AssetVariable[]>) {
    this.varData = value;
  }
  loadDisplay() {
    const id = {
      AssetId: this.assetId
    };
    this.assetData = this.assetService.getAssetData(id);
    this.assetVarData = this.assetService.getAssetVarData(id);
  }

  ngOnInit() {
    this.assetVarData = null;
    this.assetData = null;
    this.data = null;
    this.varData = null;
    this.loadDisplay();
  }

}
