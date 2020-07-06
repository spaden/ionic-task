import { Component } from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {timer} from 'rxjs';
import {Router} from '@angular/router';
import {Keyboard} from "@ionic-native/keyboard";



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private nav: NavController
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(() => {
          this.splashScreen.hide();
      }, 100);
    });
    window.addEventListener('keyboardDidShow', () => {
        document.activeElement.scrollIntoView(true);
    });
    this.platform.backButton.subscribe(async () => {
        if (this.router.isActive('/login', true) && this.router.url === '/login') {
            navigator['app'].exitApp();
        }
        if (this.router.isActive('/assets', true) && this.router.url === '/assets') {
            this.nav.pop();
        }
        if (this.router.isActive('/manage-po', true) && this.router.url === '/manage-po') {
            this.nav.pop();
        }
        if (this.router.isActive('/manage-amc', true) && this.router.url === '/manage-amc') {
            this.nav.pop();
        }
    });
  }
}

