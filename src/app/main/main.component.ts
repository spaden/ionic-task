import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import {DataItemsService} from '../services/list_service/data-items.service';
import { MenuController } from '@ionic/angular';
import {LocalStorageService} from '../services/storage/local-storage.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild(IonRouterOutlet, {static: false}) routerOutlet: IonRouterOutlet;
  role: any;
  public appPages = [
    {
      title: 'Dashboard',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Asset Management',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'PO Management',
      url: '/list-po',
      icon: 'list'
    },
    {
      title: 'Edit Profile',
      url: '/edit-profile',
      icon: 'list'
    },
    {
      title: 'Scanner',
      url: '/scan',
      icon: 'qr-scanner'
    }
  ];
  constructor(public alertCtrl: AlertController,
              private router: Router,
              public listService: DataItemsService,
              public menuCtrl: MenuController,
              public localStorage: LocalStorageService ) {}

  ngOnInit() {

    // this.listService.getUserRoles()

    // this.listService.set_userID()
  }


  ionViewDidEnter() {
    console.log(this.localStorage.get('id'));
  }

  async showAlert() {
    let loc;
    console.log(this.listService.userLocations);
    const len = this.listService.userLocations.length;
    // tslint:disable-next-line:prefer-for-of
    for (let i = len - 1; i >= 0; i--) {
      if (i === len - 1 && i === 0) {
        loc = this.listService.userLocations[i];
      } else if (i === len - 1) {
        loc = this.listService.userLocations[i] + ' -> ';
      } else if (i === 0) {
        loc += this.listService.userLocations[i];
      } else {
        loc += this.listService.userLocations[i] + ' -> ';
      }
    }
    const alert = await this.alertCtrl.create({
      header: 'Location Hierarchy',
      subHeader: 'Sequence',
      message: loc,
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  async swithRole() {
    const ar = [];
    this.listService.userRoles.forEach(item => {
      let str = item.locname;
      str += '\n';
      str += '(' + item.admintype + ')';
      const obj = {
        name: item.locname,
        type: 'radio',
        label: str,
        value: item,
        checked: false,
      };
      if (this.listService.location === item.locname) {
        obj.checked = true;
      }
      ar.push(obj);
    });
    console.log('switch roles');
    console.log(ar);

    const alert = await this.alertCtrl.create({
      header: 'User Role',
      inputs : ar,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', data);
            this.listService.switchData(data);
          }
        }
      ]
    });
    await alert.present();
  }

  logOut() {
    this.menuCtrl.close();

    if (window.confirm('Do you want to exit app')) {
      this.router.navigateByUrl('');

    }

  }
}
