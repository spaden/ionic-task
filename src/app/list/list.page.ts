import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {DataItemsService} from '../services/list_service/data-items.service'
import {IonRouterOutlet, Platform} from '@ionic/angular';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.css']
})
export class ListPage implements OnInit {
  items: any[] = []
  orginal: any[] =[]
  
  /*rotateImg = 0
  lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  
  images = [
    'bandit',
  
  ]*/
  clicked=1


  @ViewChild(IonRouterOutlet, {static: false}) routerOutlet: IonRouterOutlet;
  constructor(private route: Router,
              private rt: ActivatedRoute,
              private list: DataItemsService,
              public platform: Platform) {
    
    this.items = this.list.items
    this.orginal = this.list.items
    
    this.platform.backButton.subscribeWithPriority(0, () => {
      
      this.route.navigateByUrl('/home');

    });


    this.rt.params.subscribe(params => {
      console.log(params['q']) 
      if (params['q'] !="n"){

        (<HTMLInputElement>document.getElementById("srchId2")).value = params['q']

        this.items = this.orginal
        this.items = this.items.filter(function(e){
          if(e.imgHeight == params['q']){
            //console.log("found")
            return true
          }
          
        })
        if(this.items.length == 0){
          alert("No Assets found")
              //this.items = this.orginal
        }
        //

      }
    });

    //Redundant code
    /*for (let i = 0; i < 1000; i++) {
      this.items.push({
        name: i + ' - ' + this.images[this.rotateImg],
        imgHeight: Math.floor(Math.random() * 50 + 150),
      })
    }*/


    
    //console.log("Service")
    //this.list.view_result()
    //console.log(this.items);

  }

  ngOnInit() {
  
  }

  showAssetInfo() {
    this.route.navigateByUrl('assets');
  }
 
 
 
  srchBtn(){
    this.items = this.orginal

    console.log(this.clicked)
    
    if(this.clicked == 1){
      this.clicked = 2
      document.getElementById("srchId2").style.display="block"
      document.getElementById("title2").style.display= "none"
      console.log("entered 1")
    }
    else if (this.clicked ==2){
      console.log("entered 2")
      document.getElementById("title2").style.display= "block"
      document.getElementById("srchId2").style.display="none"
      var srchVal = (<HTMLInputElement>document.getElementById("srchId2")).value
      
      if(srchVal !== ""){
        this.items = this.items.filter(function(e){
          if(e.imgHeight == srchVal){
            //console.log("found")
            return true
          }
        })

        if(this.items.length == 0){
          alert("No Assets found")
          //this.items = this.orginal
        }
       

      }
       
      
 
      console.log(this.items)
      
      this.clicked = 1
    }
 
  }
 
 
  
 
  qrBtn(){
   this.route.navigateByUrl('scan');
  }


  
}
