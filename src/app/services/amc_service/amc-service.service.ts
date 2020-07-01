import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmcServiceService {

  constructor(private httpService: HttpClient) { }

  getAmcData(data): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = 'http://localhost:8080/amc-warranty';
    return this.httpService.post<any>(url, data, {headers});
  }
  getVendorData(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = 'http://localhost:8080/getVendorList';
    return this.httpService.get<any>(url, {headers});
  }
  getAmcPoData(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = 'http://localhost:8080/getAmcPoList';
    return this.httpService.get<any>(url, {headers});
  }
  getLocation(data): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = 'http://localhost:8080/getLocation';
    return this.httpService.post<any>(url, data, {headers});
  }
  createAmc(data): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        const url = 'http://localhost:8080/createAMC';
        return this.httpService.post<any>(url, data, {headers});
  }
  createAamc(data): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = 'http://localhost:8080/create/amc';
    return this.httpService.post<any>(url, data, {headers});
  }
}
