import {Component} from '@angular/core';
import {NavController, Platform, ToastController} from '@ionic/angular';
import {HomePage} from '../home/home.page';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

import {LoginServiceService} from '../services/login_service/login-service.service';
import {LoginClass} from '../classes/login_class/login-class';
import {LocalStorageService} from '../services/storage/local-storage.service';
import {DataItemsService} from '../services/list_service/data-items.service';

import * as jwt_decode from 'jwt-decode';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  userId: number;
  password: string;
  showSuper = false;
  superUserId: number;
  userLoginData: any;
  // server code
  private user = new LoginClass();
  constructor(public platform: Platform ,
              public router: Router,
              public toastCtrl: ToastController,
              public loginService: LoginServiceService,
              public localStorage: LocalStorageService,
              public listService: DataItemsService,
              public storage: Storage) {}
  checkBoxClicked() {
    if (this.showSuper) {
      this.showSuper = false;
    } else {
        this.userId = null;
        this.password = null;
        this.showSuper = true;
    }
  }
  login() {
   if (!this.showSuper) {
      if (!this.userId || !this.password) {
          this.displayToast('Fill all the details!');
      } else {
          this.user.userLogin(this.userId, this.password);
          this.loginService.postLoginData(this.user).subscribe((data: any) => {
              console.log(jwt_decode(data.token));
              if (data) {
                  this.userLoginData = jwt_decode(data.token);
                  this.localStorage.setObject('userLoginData', jwt_decode(data.token)).then(result => {
                      this.listService.set_userID();
                      this.listService.fetchData();
                      this.router.navigateByUrl('home');
                  });
              } else {
                  this.displayToast('Try Again!');
              }
          });
      }
    } else {
        if (!this.userId || !this.superUserId || !this.password) {
            this.displayToast('Fill all the details!');
        } else {
            this.user.superUserLogin(this.userId, this.superUserId, this.password);
            this.loginService.postLoginData(this.user).subscribe((data: any) => {
                console.log(jwt_decode(data.token));
                this.localStorage.setObject('userLoginData', jwt_decode(data.token)).then(result => {
                    this.listService.set_userID();
                    this.listService.fetchData();
                    this.router.navigateByUrl('home');
                });
            });
        }
    }
  }
  async displayToast(mess: string) {
    const toast = await this.toastCtrl.create({
      message: mess,
      duration: 2000});
    toast.present();
  }
}
