import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';  

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
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
      title: 'AMC',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'PMC',
      url: '/list',
      icon: 'list'
    }
  ];
  constructor(public alertCtrl: AlertController) { }

  ngOnInit() {}

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
}
