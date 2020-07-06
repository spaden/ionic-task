import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageAmcService {
  file: any;
  constructor(private httpService: HttpClient) { }

  getAmcData(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = 'http://192.168.43.170:8080/getAmcAssetList';
    return this.httpService.get<any>(url, {headers});
  }
  getVendorData(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = 'http://192.168.43.170:8080/getVendorList';
    return this.httpService.get<any>(url, {headers});
  }
  getAmcPoData(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = 'http://192.168.43.170:8080/getAmcPoList';
    return this.httpService.get<any>(url, {headers});
  }
  getLocation(data): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = 'http://192.168.43.170:8080/getAllLocation';
    return this.httpService.post<any>(url, data, {headers});
  }
  createAmc(data): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = 'http://192.168.43.170:8080/createAllAMC';
    return this.httpService.post<any>(url, data, {headers});
  }
  updateAmc(data): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = 'http://192.168.43.170:8080/updateAllAmc';
    return this.httpService.post<any>(url, data, {headers});
  }
  getFile(data): any {
    const url = 'http://192.168.43.170:8080/getAmcFile';
    return this.httpService.post(url, data, {observe: 'response',
      responseType: 'blob'}).subscribe(result => {
      console.log(result);
      this.createImageFromBlob(result.body);
    });
  }
  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.file = reader.result;
    });
    reader.readAsDataURL(image);
  }
}
