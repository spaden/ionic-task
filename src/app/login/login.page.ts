import { Component, OnInit } from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {HomePage} from '../home/home.page';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginClass} from './login-class';
import {LoginServiceService} from './login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  userId: string;
  password: string;
  showSuper = false;
  superUserId: string;
  superUserPassword: string;
  // private user = new LoginClass();
  constructor(public router: Router, public toastCtrl: ToastController, public loginService: LoginServiceService) {}
  checkBoxClicked() {
    if (this.showSuper) {
      this.showSuper = false;
    } else {
      this.showSuper = true;
    }
  }
  login() {
    if (!this.showSuper) {
      if (this.userId === '1234' && this.password === '1234') {
        this.router.navigateByUrl('home');
      } else {
        this.displayToast();
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
      if (this.userId === '345' && this.superUserId === '345' && this.superUserPassword === '345') {
        this.router.navigateByUrl('../home/home.page');
      } else {
        this.displayToast();
      }
    }
  }
  async displayToast() {
    const toast = await this.toastCtrl.create({
      message: 'Details Not Matched! Try Again',
      duration: 2000});
    toast.present();
  }
}
