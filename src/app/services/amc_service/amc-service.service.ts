import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmcServiceService {
  file: any;
  constructor(private httpService: HttpClient) { }

  getAmcData(data): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        const url = environment.url + '/amc-warranty';
        return this.httpService.post<any>(url, data, {headers});
    }
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
    const url = environment.url + '/getLocation';
    return this.httpService.post<any>(url, data, {headers});
  }
  createAmc(data): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        const url = environment.url + '/createAMC';
        return this.httpService.post<any>(url, data, {headers});
  }
  updateAmc(data): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = environment.url + '/updateAmc';
    return this.httpService.post<any>(url, data, {headers});
  }
  getFile(data): Observable<any> {
    const url = environment.url + '/getAmcFile';
    return this.httpService.post(url, data, {observe: 'response',
      responseType: 'blob'});
  }
}
