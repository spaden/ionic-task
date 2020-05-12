import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import {DataItemsService} from '../services/list_service/data-items.service'
import { MenuController } from '@ionic/angular';
import {LocalStorageService} from '../services/storage/local-storage.service'


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
  constructor(public alertCtrl: AlertController,private router: Router,private platform: Platform, public listService: DataItemsService,public menuCtrl: MenuController,public localStorage:LocalStorageService ) {}

  ngOnInit() {
   
    //this.listService.download()
    //this.listService.view_result()
    //this.listService.getUserRoles()
  
    this.listService.set_userID()
   
   
  }
  

  ionViewDidEnter(){
    console.log(this.localStorage.get('id'))
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
    var ar = []
    var check = false
    this.listService.userRoles.forEach(item => {
      var obj={}
      obj['name'] = item._rolename
      obj['type']='radio'
      obj['label']= item._rolename
      obj['value'] = item
      if(check == false) {
        obj['checked']=true
        check = true
      }

      ar.push(obj)
    })
    console.log("switch roles")
    console.log(ar) 

    const alert = await this.alertCtrl.create({
      header: "Testing",
      inputs :ar,
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
    this.menuCtrl.close();

    if(window.confirm("Do you want to exit app")){
      this.router.navigateByUrl('');

    }
   
  }
}
