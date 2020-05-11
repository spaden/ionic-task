import {Component} from '@angular/core';
import {NavController, Platform, ToastController} from '@ionic/angular';
import {HomePage} from '../home/home.page';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

import {LoginServiceService} from '../services/login_service/login-service.service';
import {LoginClass} from '../classes/login_class/login-class';
import {LocalStorageService} from '../services/storage/local-storage.service';


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
  // server code
  private user = new LoginClass();
  constructor(public platform: Platform ,
              public router: Router,
              public toastCtrl: ToastController,
              public loginService: LoginServiceService,
              public localStorage: LocalStorageService) {}
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
      /*if (!this.userId || !this.password) {
          this.displayToast('Fill all the details!');
      } else if (this.userId === 1234 && this.password === '1234') {
        this.router.navigateByUrl('home');
      } else {
        this.displayToast('Details Not Matched! Try Again');
      }*/
      // server code
      if (!this.userId || !this.password) {
          this.displayToast('Fill all the details!');
      } else {
          this.user.userLogin(this.userId, this.password);
          /*this.loginService.postUserData(this.user).subscribe((data: boolean) => {
              console.log(data);
              if (data) {
                  this.router.navigateByUrl('home');
              } else {
                  this.displayToast('Details Not Matched! Try Again');
              }
          });*/
          this.loginService.postLoginData(this.user).subscribe((data: any) => {
              console.log(data);
              if (data) {
                  if (data.firstLogin) {
                      this.localStorage.set('id', data.id);
                      this.router.navigateByUrl('home');
                  } else {
                      this.localStorage.set('id', data.id);
                      this.localStorage.set('role', data.role);
                      this.localStorage.set('location', data.location);
                      this.router.navigateByUrl('home');
                  }
              } else {
                  this.displayToast('Try Again!');
              }
          });
      }
    } else {
        /*if (!this.userId || !this.superUserId || !this.superUserPassword ) {
            this.displayToast('Fill all the details!');
        } else if (this.userId === 345 && this.superUserId === 345 && this.superUserPassword === '345') {
            this.router.navigateByUrl('home');
        } else {
            this.displayToast('Details Not Matched! Try Again');
        }*/
        // server code
        if (!this.userId || !this.superUserId || !this.password) {
            this.displayToast('Fill all the details!');
        } else {
            this.user.superUserLogin(this.userId, this.superUserId, this.password);
            /*this.loginService.postSuperUserData(this.user).subscribe((data: boolean) => {
                console.log(data);
                if (data) {
                    this.router.navigateByUrl('home');
                } else {
                    this.displayToast('Details Not Matched! Try Again');
                }
            });*/
            this.loginService.postLoginData(this.user).subscribe((data: any) => {
                this.localStorage.set('id', data.id);
                this.localStorage.set('role', data.role);
                this.localStorage.set('location', data.location);
                this.router.navigateByUrl('home');
                this.router.navigateByUrl('home');
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
