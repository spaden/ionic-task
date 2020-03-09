import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataItemsService {
  
  items: any = []

  constructor(private http: HttpClient) { }
  
  
  download(){
      this.http.get('http://localhost:8080/lists').subscribe((response) => {
        console.log(response);
        this.items = response
      })
  }

  view_result() {
    console.log(this.items)
  }
  
  


}
