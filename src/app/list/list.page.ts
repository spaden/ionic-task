import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {DataItemsService} from '../additional_services/list_service/data-items.service'

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.css']
})
export class ListPage implements OnInit {
  items: any[] = []
  orginal: any[] =[]
  
  rotateImg = 0
  lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  clicked=1
  images = [
    'bandit',
  
  ]
 
  constructor(private route: Router,private rt: ActivatedRoute, private list: DataItemsService) {
     this.items = this.list.items
     this.orginal = this.list.items

    this.rt.params.subscribe(params => {
      console.log(params['q']) 
      if (params['q'] !="n"){
        this.items = this.items.filter(function(e){
          if(e.imgHeight == params['q']){
            //console.log("found")
            return true
          }
        })

        if(this.items.length == 0){
          alert("No Assets found")
          this.items = this.orginal

        }

      }
    });

    /*for (let i = 0; i < 1000; i++) {
      this.items.push({
        name: i + ' - ' + this.images[this.rotateImg],
        imgHeight: Math.floor(Math.random() * 50 + 150),
      })
    }
    this.orginal = this.items;
    //console.log("Service")
    //this.list.view_result()
    //console.log(this.items);
    */
  }

  ngOnInit() {
  
  }

  showAssetInfo() {
    this.route.navigateByUrl('assets');
  }
 
 
 
  srchBtn(){
    this.items = this.orginal
    //console.log(this.clicked)
    if(this.clicked == 1){
      this.clicked = 2
      document.getElementById("srchId").style.display="block"
      document.getElementById("title").style.display= "none"
    }
    else if (this.clicked ==2){
      document.getElementById("title").style.display= "block"
      document.getElementById("srchId").style.display="none"
      var srchVal = (<HTMLInputElement>document.getElementById("srchId")).value
      
      if(srchVal !== ""){
        this.items = this.items.filter(function(e){
          if(e.imgHeight == srchVal){
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
 
 
  
 
  qrBtn(){
   this.route.navigateByUrl('scan');
  }

  
}
