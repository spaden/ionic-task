import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LocalStorageService} from '../storage/local-storage.service'

@Injectable({
  providedIn: 'root'
})
export class DataItemsService {
  
  items: any = []

  constructor(private http: HttpClient, public localStorage: LocalStorageService) { }
  
  userData: object
  userRoles: any

  download(){
    

    var rotateImg = 0
    var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    var images = [
        'bandit',

    ]
      
    for (let i = 0; i < 1000; i++) {
      this.items.push({
          name: i + ' - ' + images[rotateImg],
          imgHeight: Math.floor(Math.random() * 50 + 150),
      })
    } 


      /*this.http.get('http://localhost:8080/lists').subscribe((response) => {
        console.log(response);
        this.items = response
      })*/
  }

  view_result() {
    console.log(this.items)
  }
  
  getUserInfo(){
    const headers =  {'Content-Type': 'application/json'};
    var body = {
      id:106414
    }
    this.http.post('http://localhost:8080/data/user/profile/access', JSON.stringify(body), { headers }).subscribe(data => {
         console.log(data)
         this.userData = data
         this.localStorage.setObject('userData', this.userData);
    })

  }

  getUserRoles(){
    const headers =  {'Content-Type': 'application/json'};
    var body = {
      adminid:106414
    }
    this.http.post('http://localhost:8080/data/profile/roles', JSON.stringify(body), { headers }).subscribe(data => {
         console.log(data)
         this.userRoles = data
    })
  }



}
