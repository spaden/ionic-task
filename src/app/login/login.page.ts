import {Component} from '@angular/core';
import {NavController, Platform, ToastController} from '@ionic/angular';
import {HomePage} from '../home/home.page';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

import {LoginServiceService} from '../services/login_service/login-service.service';
import {LoginClass} from '../classes/login_class/login-class';


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
  superUserPassword: string;
  // private user = new LoginClass();
  constructor(public platform: Platform ,
              public router: Router,
              public toastCtrl: ToastController,
              public loginService: LoginServiceService) {}
  checkBoxClicked() {
    if (this.showSuper) {
      this.showSuper = false;
    } else {
      this.userId = null;
      this.showSuper = true;
    }
  }
  login() {
    if (!this.showSuper) {
      if (!this.userId || !this.password) {
          this.displayToast('Fill all the details!');
      } else if (this.userId === 1234 && this.password === '1234') {
        this.router.navigateByUrl('home');
      } else {
        this.displayToast('Details Not Matched! Try Again');
      }
      /*this.user.userId = this.userId;
      this.user.password = this.password;
      this.loginService.postData(this.user).subscribe((data: boolean) => {
        console.log(data);
        if (data) {
          this.router.navigateByUrl('home');
        } else {
          this.displayToast();
        }
      });*/
    } else {
        if (!this.userId || !this.superUserId || !this.superUserPassword ) {
            this.displayToast('Fill all the details!');
        } else if (this.userId === 345 && this.superUserId === 345 && this.superUserPassword === '345') {
            this.router.navigateByUrl('home');
        } else {
            this.displayToast('Details Not Matched! Try Again');
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
