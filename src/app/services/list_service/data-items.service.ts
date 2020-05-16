import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LocalStorageService} from '../storage/local-storage.service'

@Injectable({
  providedIn: 'root'
})
export class DataItemsService {
  items: any = []

  constructor(private http: HttpClient, public localStorage: LocalStorageService) { }
  
  userData: object = {
    email: "tcs@object.com"
  }
  userRoles: any
  userId: any
  gotData: Boolean = false
  sendData: any
    

   
  fetchData() {
     /*var rotateImg = 0
    var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    var images = [
        'bandit',

    ]
      
    for (let i = 0; i < 1000; i++) {
      this.items.push({
          name: i + ' - ' + images[rotateImg],
          imgHeight: Math.floor(Math.random() * 50 + 150),
      })
    } */

      this.localStorage.getObject('userLoginData').then(data => {
        if (data != null) {
          this.sendData = {
            role: data.role,
            location: data.location
          };
          this.http.post('http://localhost:8080/lists', this.sendData).subscribe({
            next: response => this.items = response,
            error: error => window.alert('Assets Error - Unauthorized Access')
          });
        }
      });

      this.view_result();
  }

  switchData() {
    this.localStorage.getObject('userRole').then(data => {
      if (data != null) {
        this.sendData = {
          role: data[0]._roleid,
          location: data[0]._locid
        };
        this.http.post('http://localhost:8080/lists', this.sendData).subscribe({
            next: response => this.items = response,
            error: error => window.alert('Assets Error - Unauthorized Access')
        });
        console.log(data[0]._locid);
      }
    });
    console.log(this.sendData);
  }



  view_result() {
    console.log(this.items);
  }


  set_userID(){
    this.localStorage.get("id").then(result=> {
      if(result!=null){
        this.userId = result
        this.getUserInfo()
        this.getUserRoles()

      }/*else {
        alert("login error")

      }*/

    }).catch(err=> {
      console.log(err)
    })
    console.log(this.userId)
  }

  getUserInfo(){
    const headers =  {'Content-Type': 'application/json'};
    var body = {
      id:this.userId
    }
    console.log(body)
    this.http.post('http://localhost:8080/data/user/profile/access', JSON.stringify(body), { headers }).subscribe(data => {
         console.log(data)
         this.userData = data
         this.localStorage.setObject('userData', this.userData);
         this.gotData = true
    })

  }

  getUserRoles(){
    const headers =  {'Content-Type': 'application/json'};
    var body = {
      adminid:this.userId
    }
    this.http.post('http://localhost:8080/data/profile/roles', JSON.stringify(body), { headers }).subscribe(data => {
         console.log(data)
         this.userRoles = data
         this.localStorage.setObject('userRole', this.userRoles);
    })
  }


}
