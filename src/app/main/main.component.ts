import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';  
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import {DataItemsService} from '../services/list_service/data-items.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild(IonRouterOutlet, {static:false}) routerOutlet: IonRouterOutlet;

  public appPages = [
    {
      title: 'Dashboard',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Asset Management',
      url: '/list/n',
      icon: 'list'
    },
    {
      title: 'PO Management',
      url: '/list-po',
      icon: 'list'
    }
  ];
  constructor(public alertCtrl: AlertController,private router: Router,private platform: Platform, private listService: DataItemsService) {}

  ngOnInit() {
    this.listService.download()
    this.listService.view_result()
  }
  

  ionViewDidEnter(){
   
  }

  async showAlert() {  
    const alert = await this.alertCtrl.create({  
      header: 'Location/Building',  
      subHeader: 'Sequence',  
      message: 'USA -> Los Angeles -> California -> SpaceX -> Building Q3',  
      buttons: ['OK']  
    });  
    await alert.present();  
    const result = await alert.onDidDismiss();  
    console.log(result);  
  }

  async swithRole() {  
    const alert = await this.alertCtrl.create({
      header: "Testing",
      inputs :[
        {
          name : 'Radio 1',
          type: 'radio',
          label: 'Standard user',
          value: 'value1',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Admin',
          value: 'value2'
        },
      ],
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
          }
        }
      ]
    });
    await alert.present();
  }

  logOut(){
    
    if(window.confirm("Do you want to exit app")){
      navigator['app'].exitApp();
    }
   
  }
}
