import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LocalStorageService} from '../storage/local-storage.service';
import {Subject} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataItemsService {
  items: any = [];
  itemsChange: Subject<any[]> = new Subject<any[]>();
  amcItems: any = [];
  amcItemsChange: Subject<any[]> = new Subject<any[]>();
  viewAmcItems: any = [];
  viewAmcItemsChange: Subject<any[]> = new Subject<any[]>();
  managePmItems: any = [];
  managePmItemsChange: Subject<any[]> = new Subject<any[]>();
  schedulePmItems: any = [];
  schedulePmItemsChange: Subject<any[]> = new Subject<any[]>();
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
          if (this.userLoc === '00') {
            this.sendData = {
              location: '0'
            };
            this.http.post(environment.url + '/lists', this.sendData).subscribe({
              next: response => {
                this.items = response;
                this.itemsChange.next(this.items);
              },
            });
            this.http.post(environment.url + '/getAmcAssetList', this.sendData).subscribe({
              next: response => {
                this.amcItems = response;
                this.amcItemsChange.next(this.amcItems);
              },
            });
            this.http.post(environment.url + '/viewAllAMC', this.sendData).subscribe({
              next: result => {
                // @ts-ignore
                this.viewAmcItems = result.data;
                this.viewAmcItemsChange.next(this.viewAmcItems);
              }
            });
            this.http.post(environment.url + '/fetchAll/Amc-Warranty', this.sendData).subscribe({
              next: result => {
                console.log(result);
                // @ts-ignore
                this.managePmItems = result.data;
                this.managePmItemsChange.next(this.managePmItems);
              }
            });
            this.http.post(environment.url + '/fetchAll/schedulePm', this.sendData).subscribe({
              next: result => {
                console.log(result);
                // @ts-ignore
                this.schedulePmItems = result.data;
                this.schedulePmItemsChange.next(this.schedulePmItems);
              }
            });
          } else {
            this.http.post(environment.url + '/lists', this.sendData).subscribe({
              next: response => {
                this.items = response;
                this.itemsChange.next(this.items);
              },
            });
            this.http.post(environment.url + '/getAmcAssetList', this.sendData).subscribe({
              next: response => {
                this.amcItems = response;
                this.amcItemsChange.next(this.amcItems);
              },
            });
            this.http.post(environment.url + '/viewAllAMC', this.sendData).subscribe({
              next: result => {
                console.log(result);
                // @ts-ignore
                this.viewAmcItems = result.data;
                this.viewAmcItemsChange.next(this.viewAmcItems);
              }
            });
            this.http.post(environment.url + '/fetchAll/Amc-Warranty', this.sendData).subscribe({
              next: result => {
                console.log(result);
                // @ts-ignore
                this.managePmItems = result.data;
                this.managePmItemsChange.next(this.managePmItems);
              }
            });
            this.http.post(environment.url + '/fetchAll/schedulePm', this.sendData).subscribe({
              next: result => {
                console.log(result);
                // @ts-ignore
                this.schedulePmItems = result.data;
                this.schedulePmItemsChange.next(this.schedulePmItems);
              }
            });
          }
        }
      });

      this.view_result();
  }

  fetchAmcData() {
    if (this.userLoc === '00') {
      this.sendData = {
        location: '0'
      };
      this.http.post(environment.url + '/getAmcAssetList', this.sendData).subscribe({
        next: response => {
          this.amcItems = response;
          this.amcItemsChange.next(this.amcItems);
        },
      });
      this.http.post(environment.url + '/viewAllAMC', this.sendData).subscribe({
        next: result => {
          // @ts-ignore
          this.viewAmcItems = result.data;
          this.viewAmcItemsChange.next(this.viewAmcItems);
        }
      });
    } else {
      this.sendData = {
        location: this.userLoc
      };
      this.http.post(environment.url + '/getAmcAssetList', this.sendData).subscribe({
        next: response => {
          this.amcItems = response;
          this.amcItemsChange.next(this.amcItems);
        },
      });
      this.http.post(environment.url + '/viewAllAMC', this.sendData).subscribe({
        next: result => {
          console.log(result);
          // @ts-ignore
          this.viewAmcItems = result.data;
          this.viewAmcItemsChange.next(this.viewAmcItems);
        }
      });
    }
    console.log(this.userLoc);
  }
  fetchSchedulePmData() {
    if (this.userLoc === '00') {
      this.sendData = {
        location: '0'
      };
      this.http.post(environment.url + '/fetchAll/schedulePm', this.sendData).subscribe({
        next: result => {
          console.log(result);
          // @ts-ignore
          this.schedulePmItems = result.data;
          this.schedulePmItemsChange.next(this.schedulePmItems);
        }
      });
    } else {
      this.sendData = {
        location: this.userLoc
      };
      this.http.post(environment.url + '/fetchAll/schedulePm', this.sendData).subscribe({
        next: result => {
          console.log(result);
          // @ts-ignore
          this.schedulePmItems = result.data;
          this.schedulePmItemsChange.next(this.schedulePmItems);
        }
      });
    }
    console.log(this.userLoc);
  }
  fetchManagePmData() {
    if (this.userLoc === '00') {
      this.sendData = {
        location: '0'
      };
      this.http.post(environment.url + '/fetchAll/Amc-Warranty', this.sendData).subscribe({
        next: result => {
          console.log(result);
          // @ts-ignore
          this.managePmItems = result.data;
          this.managePmItemsChange.next(this.managePmItems);
        }
      });
    } else {
      this.sendData = {
        location: this.userLoc
      };
      this.http.post(environment.url + '/fetchAll/Amc-Warranty', this.sendData).subscribe({
        next: result => {
          console.log(result);
          // @ts-ignore
          this.managePmItems = result.data;
          this.managePmItemsChange.next(this.managePmItems);
        }
      });
    }
    console.log(this.userLoc);
  }
  switchData(data: any) {
    if (data != null) {
      this.sendData = {
        location: data.locid
      };
      this.userLoc = this.sendData.location;
      this.getUserLocation();
      if (this.userLoc === '00') {
        this.sendData = {
          location: '0'
        };
        this.http.post(environment.url + '/lists', this.sendData).subscribe({
          next: response => {
            this.items = response;
            this.itemsChange.next(this.items);
          },
        });
        this.http.post(environment.url + '/getAmcAssetList', this.sendData).subscribe({
          next: response => {
            this.amcItems = response;
            this.amcItemsChange.next(this.amcItems);
          },
        });
        this.http.post(environment.url + '/viewAllAMC', this.sendData).subscribe({
          next: result => {
            // @ts-ignore
            this.viewAmcItems = result.data;
            this.viewAmcItemsChange.next(this.viewAmcItems);
          }
        });
        this.http.post(environment.url + '/fetchAll/Amc-Warranty', this.sendData).subscribe({
          next: result => {
            console.log(result);
            // @ts-ignore
            this.managePmItems = result.data;
            this.managePmItemsChange.next(this.managePmItems);
          }
        });
        this.http.post(environment.url + '/fetchAll/schedulePm', this.sendData).subscribe({
          next: result => {
            console.log(result);
            // @ts-ignore
            this.schedulePmItems = result.data;
            this.schedulePmItemsChange.next(this.schedulePmItems);
          }
        });
      } else {
        this.http.post(environment.url + '/lists', this.sendData).subscribe({
          next: response => {
            this.items = response;
            this.itemsChange.next(this.items);
          },
        });
        this.http.post(environment.url + '/getAmcAssetList', this.sendData).subscribe({
          next: response => {
            this.amcItems = response;
            this.amcItemsChange.next(this.amcItems);
          },
        });
        this.http.post(environment.url + '/viewAllAMC', this.sendData).subscribe({
          next: result => {
            console.log(result);
            // @ts-ignore
            this.viewAmcItems = result.data;
            this.viewAmcItemsChange.next(this.viewAmcItems);
          }
        });
        this.http.post(environment.url + '/fetchAll/Amc-Warranty', this.sendData).subscribe({
          next: result => {
            console.log(result);
            // @ts-ignore
            this.managePmItems = result.data;
            this.managePmItemsChange.next(this.managePmItems);
          }
        });
        this.http.post(environment.url + '/fetchAll/schedulePm', this.sendData).subscribe({
          next: result => {
            console.log(result);
            // @ts-ignore
            this.schedulePmItems = result.data;
            this.schedulePmItemsChange.next(this.schedulePmItems);
          }
        });
      }
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
    this.http.post(environment.url + '/data/user/profileimage', body, {
      responseType: 'blob'}).subscribe(data => {
      console.log(data);
      this.createImageFromBlob(data);
    });

  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.onloadend = (evt => {
      console.log('Read as data URL');
      console.log(reader.result);
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
    this.http.post(environment.url + '/data/user/profile/access', JSON.stringify(body), { headers }).subscribe(data => {
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
    this.http.post(environment.url + '/data/profile/roles', JSON.stringify(body), { headers }).subscribe(data => {
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
    this.http.post(environment.url + '/accessHierarchy', JSON.stringify(body), { headers }).subscribe(data => {
        this.userLocations = data;
        this.location = this.userLocations[0];
    });
  }
}
