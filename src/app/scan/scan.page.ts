import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform } from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  scanSub: any;
  qrText: string;


  constructor(public platform: Platform, public qrScanner: QRScanner, private route: Router) {


    this.platform.backButton.subscribeWithPriority(0, () => {
      this.scanSub.unsubscribe();
      document.getElementsByTagName('body')[0].style.opacity = '1';

      this.route.navigateByUrl('home');

    });

   }




  ngOnInit() {
    this.startScanning();
  }



  startScanning() {

    this.qrScanner.prepare().
      then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.qrScanner.show();
          this.scanSub = document.getElementsByTagName('body')[0].style.opacity = '0.3';
          // tslint:disable-next-line:no-debugger
          debugger;
          this.scanSub = this.qrScanner.scan()
            .subscribe((textFound: string) => {
              document.getElementsByTagName('body')[0].style.opacity = '1';
              this.qrScanner.hide();
              this.scanSub.unsubscribe();

              this.qrText = textFound;
              this.route.navigate(['/assets'], {queryParams: {key: this.qrText}});
            }, (err) => {
              alert(JSON.stringify(err));
            });

        } else if (status.denied) {
        } else {

        }
      })
      .catch((e: any) => console.log('Error is', e));
  }


  ionViewWillLeave() {
    this.qrScanner.hide();
    this.qrScanner.destroy();
  }
}
