import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LocalStorageService} from '../storage/local-storage.service';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataItemsService {
  items: any = [];
  itemsChange: Subject<any[]> = new Subject<any[]>();
  amcItems: any = [];
  amcItemsChange: Subject<any[]> = new Subject<any[]>();
  constructor(private http: HttpClient, public localStorage: LocalStorageService) { }

  userData: any;
  userRoles: any;
  userLocations: any;
  userLoc: any;
  location: any;
  userId: any;
  gotData = false;
  sendData: any;
  userName: any;
  role: any;
  img: any;


  fetchData() {
      this.localStorage.getObject('userLoginData').then(data => {
        console.log(data);
        if (data != null) {
          this.sendData = {
            location: data._location
          };
          this.userLoc = this.sendData.location;
          this.http.post('http://localhost:8080/lists', this.sendData).subscribe({
            next: response => {
              this.items = response;
              this.itemsChange.next(this.items);
            },
            error: error => window.alert('Assets Error - Unauthorized Access')
          });
          this.http.post('http://localhost:8080/getAmcAssetList', this.sendData).subscribe({
            next: response => {
              this.amcItems = response;
              this.amcItemsChange.next(this.amcItems);
            },
            error: error => window.alert('AMC Assets Error - Unauthorized Access')
          });
        }
      });

      this.view_result();
  }

  fetchAmcData() {
    this.sendData = {
      location: this.userLoc
    };
    this.http.post('http://localhost:8080/getAmcAssetList', this.sendData).subscribe({
      next: response => {
        this.amcItems = response;
        this.amcItemsChange.next(this.amcItems);
      },
      error: error => window.alert('AMC Assets Error - Unauthorized Access')
    });
    console.log(this.userLoc);
  }
  switchData(data: any) {
    if (data != null) {
      this.sendData = {
        location: data.locid
      };
      this.userLoc = this.sendData.location;
      this.getUserLocation();
      this.http.post('http://localhost:8080/lists', this.sendData).subscribe({
        next: response => {
          this.items = response;
          this.itemsChange.next(this.items);
        },
        error: error => window.alert('Assets Error - Unauthorized Access')
      });
      this.http.post('http://localhost:8080/getAmcAssetList', this.sendData).subscribe({
        next: response => {
          this.amcItems = response;
          this.amcItemsChange.next(this.amcItems);
        },
        error: error => window.alert('AMC Assets Error - Unauthorized Access')
      });
      console.log(data.locid);
    }
  }



  view_result() {
    console.log(this.items);
  }


  set_userID() {
    this.localStorage.getObject('userLoginData').then(result => {
      if (result != null) {
        console.log(result);
        this.userId = result._id;
        this.userName = result._name;
        this.userLoc = result._location;
        this.getUserImage();
        this.getUserInfo();
        this.getUserRoles();
        if (this.userLoc === '0') {
          this.location = 'Home';
          const locationData = ['Home'];
          this.userLocations = locationData;
        } else {
          this.getUserLocation();
        }
      }
    }).catch(err => {
      console.log(err);
    });
    return this.userId;
  }

  getUserImage() {
    const body = {
      id: this.userId
    };
    console.log(body);
    this.http.post('http://localhost:8080/data/user/profileimage', body, {observe: 'response',
      responseType: 'blob'}).subscribe(data => {
      console.log(data);
      this.createImageFromBlob(data.body);
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.img = reader.result;
    });
    reader.readAsDataURL(image);
  }

  getUserInfo() {
    const headers =  {'Content-Type': 'application/json'};
    const body = {
      id: this.userId
    };
    console.log(body);
    this.http.post('http://localhost:8080/data/user/profile/access', JSON.stringify(body), { headers }).subscribe(data => {
         this.userData = data;
         this.img = this.userData.url;
         this.localStorage.setObject('userData', this.userData);
         this.gotData = true;
    });

  }

  getUserRoles() {
    const headers =  {'Content-Type': 'application/json'};
    const body = {
      adminid: this.userId
    };
    this.http.post('http://localhost:8080/data/profile/roles', JSON.stringify(body), { headers }).subscribe(data => {
         console.log(data);
         this.userRoles = data;
         this.role = this.userRoles[0].admintype;
         this.localStorage.setObject('userRole', this.userRoles);
    });
  }

  getUserLocation() {
    const headers =  {'Content-Type': 'application/json'};
    const body = {
      locid: this.userLoc
    };
    console.log(body);
    this.http.post('http://localhost:8080/accessHierarchy', JSON.stringify(body), { headers }).subscribe(data => {
        this.userLocations = data;
        this.location = this.userLocations[0];
    });
  }
}
