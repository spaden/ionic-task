import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {DataItemsService} from '../services/list_service/data-items.service';
import {IonRouterOutlet, Platform} from '@ionic/angular';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.css']
})
export class ListPage implements OnInit {
  items: any[] = [];
  orginal: any[] = [];
  term: any;
    showTitle = true;

  clicked = 1;


  @ViewChild(IonRouterOutlet, {static: false}) routerOutlet: IonRouterOutlet;
  constructor(private route: Router,
              private rt: ActivatedRoute,
              private list: DataItemsService,
              public platform: Platform) {

    this.items = this.list.items;
    this.orginal = this.list.items;

    this.platform.backButton.subscribeWithPriority(0, () => {

      this.route.navigateByUrl('/home');

    });


  }

  ngOnInit() {
    this.list.view_result();
    // this.list.fetchData();
    this.items = this.list.items;
  }

  showAssetInfo(assetId: string) {
    console.log(assetId);
    this.route.navigate(['/assets'], {queryParams: {id: assetId}});
  }



  srchBtn() {
    this.items = this.orginal;
    this.showTitle = !this.showTitle;
  }




  qrBtn() {
   this.route.navigateByUrl('scan');
  }



}
