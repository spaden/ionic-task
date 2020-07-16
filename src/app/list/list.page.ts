import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {DataItemsService} from '../services/list_service/data-items.service';
import {IonRouterOutlet, Platform, MenuController} from '@ionic/angular';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.css']
})
export class ListPage implements OnInit, OnDestroy {
  items: any[] = [];
  orginal: any[] = [];
  term: any;
  showTitle = true;
  subscription: Subscription;

  clicked = 1;


  @ViewChild(IonRouterOutlet, {static: false}) routerOutlet: IonRouterOutlet;
  constructor(private route: Router,
              private rt: ActivatedRoute,
              private list: DataItemsService,
              public platform: Platform,
              private menu: MenuController) {

    this.items = this.list.items;
    this.orginal = this.list.items;
    this.subscription = this.list.itemsChange.subscribe((value) => {
        console.log(value);
        this.items = value;
        this.orginal = value;
    });

    this.platform.backButton.subscribeWithPriority(0, () => {

      this.route.navigateByUrl('/home');

    });


  }

  ngOnInit() {
    this.list.view_result();
    // this.list.fetchData();
    this.items = this.list.items;
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  showAssetInfo(itemKey: string) {
    console.log(itemKey);
    this.route.navigate(['/assets'], {queryParams: {key: itemKey}});
  }



  srchBtn() {
    this.items = this.orginal;
    this.showTitle = !this.showTitle;
  }




  qrBtn() {
   this.route.navigateByUrl('scan');
  }



}
