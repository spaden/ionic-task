import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageAmcService {
  file: any;
  constructor(private httpService: HttpClient) { }

  getVendorData(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = environment.url + '/getVendorList';
    return this.httpService.get<any>(url, {headers});
  }
  getAmcPoData(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = environment.url + '/getAmcPoList';
    return this.httpService.get<any>(url, {headers});
  }
  getLocation(data): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = environment.url + '/getAllLocation';
    return this.httpService.post<any>(url, data, {headers});
  }
  createAmc(data): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = environment.url + '/createAllAMC';
    return this.httpService.post<any>(url, data, {headers});
  }
  updateAmc(data): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = environment.url + '/updateAllAmc';
    return this.httpService.post<any>(url, data, {headers});
  }
  getAssetAmc(data): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = environment.url + '/fetchAssetList/Amc';
    return this.httpService.post<any>(url, data, {headers});
  }
  getFile(data): any {
    const url = environment.url + '/getAmcFile';
    return this.httpService.post(url, data, {observe: 'response',
      responseType: 'blob'});
  }
  insertLocation(data): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        const url = environment.url + '/insertLocation';
        return this.httpService.post<any>(url, data, {headers});
    }
}
