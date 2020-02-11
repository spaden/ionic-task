import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-po',
  templateUrl: './list-po.page.html',
  styleUrls: ['./list-po.page.scss'],
})
export class ListPoPage implements OnInit {

  items: any[] = []
  orginal: any[] =[]
  rotateImg = 0
  lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  clicked=1
  images = [
    'bandit',

  ]

  constructor(private route: Router) {
    for (let i = 0; i < 1000; i++) {
      this.items.push({
        name: i + ' - ' + this.images[this.rotateImg],
        imgHeight: Math.floor(Math.random() * 50 + 150),
      })
    }
    this.orginal = this.items
    //console.log(this.items);
  }

  ngOnInit() {

  }

  showPOInfo() {
    this.route.navigateByUrl('manage-po');
  }



  srchBtn(){
    this.items = this.orginal
    //console.log(this.clicked)
    if(this.clicked == 1){
      this.clicked = 2
      document.getElementById("srchId").style.display="block"
    }
    else if (this.clicked ==2){
      document.getElementById("srchId").style.display="none"
      var srchVal = (<HTMLInputElement>document.getElementById("srchId")).value
      this.items = this.items.filter(function(e){
        if(e.imgHeight == srchVal){
          //console.log("found")
          return true
        }
      })

      console.log(this.items)

      this.clicked = 1
    }

  }




  qrBtn(){
    this.route.navigateByUrl('scan');
  }

}
