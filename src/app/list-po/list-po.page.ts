import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, IonRouterOutlet, Platform} from '@ionic/angular';

@Component({
  selector: 'app-list-po',
  templateUrl: './list-po.page.html',
  styleUrls: ['./list-po.page.scss'],
})
export class ListPoPage implements OnInit {

  showTitle = true;
  items: any[] = [];
  orginal: any[] = [];
  rotateImg = 0;
  lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  clicked = 1;
  images = [
    'bandit',

  ]
    @ViewChild(IonRouterOutlet, {static: false}) routerOutlet: IonRouterOutlet;
    constructor(private router: Router, private rt: ActivatedRoute, public alertCtrl: AlertController, private platform: Platform) {
        this.platform.backButton.subscribeWithPriority(0, () => {
            if (this.routerOutlet && this.routerOutlet.canGoBack()) {
                this.routerOutlet.pop();
            } else if (this.router.url === '/list-po') {

                if (window.confirm('Do you want to exit app')) {
                    navigator['app'].exitApp();
                }


            }
        });
        this.rt.params.subscribe(params => {
            // console.log(params['q'])
            if (params['q'] !="n"){
                this.items = this.items.filter(function(e){
                    if(e.imgHeight == params['q']){
                        //console.log("found")
                        return true
                    }
                })
                this.items = this.orginal
            }
        });

        for (let i = 0; i < 1000; i++) {
            this.items.push({
                name: i + ' - ' + this.images[this.rotateImg],
                imgHeight: Math.floor(Math.random() * 50 + 150),
            });
        }
        this.orginal = this.items;
        // console.log(this.items);
    }

  ngOnInit() {

  }

  showPOInfo() {
    this.router.navigateByUrl('manage-po');
  }



    srchBtn(){
        this.items = this.orginal
        //console.log(this.clicked)
        if(this.clicked == 1){
            this.clicked = 2
            document.getElementById("srchId").style.display="block"
            this.showTitle = false;
        }
        else if (this.clicked ==2){
            document.getElementById("srchId").style.display= "none"
            this.showTitle = true;
            var srchVal = (<HTMLInputElement>document.getElementById("srchId")).value

            if(srchVal !== ""){
                this.items = this.items.filter(function(e){
                    if(e.name == srchVal){
                        //console.log("found")
                        return true
                    }
                })

                if(this.items.length == 0){
                    alert("No Assets found")
                    this.items = this.orginal
                }


            }



            console.log(this.items)

            this.clicked = 1
        }

    }




  qrBtn() {
    this.router.navigateByUrl('scan');
  }

}
