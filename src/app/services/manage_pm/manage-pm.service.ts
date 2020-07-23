import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {ManagePm} from '../../classes/pm_class/manage-pm';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ManagePmService {
  constructor(private httpService: HttpClient) { }
  file: any;
  getAmcData(data): Observable<ManagePm[]> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = environment.url + '/fetchPm/Amc';
    return this.httpService.post<ManagePm[]>(url, data, {headers}).pipe(
        catchError(this.errorHandler)
    );
  }
  getWarrantyData(data): Observable<ManagePm[]> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = environment.url + '/fetchPm/Warranty';
    return this.httpService.post<ManagePm[]>(url, data, {headers}).pipe(
        catchError(this.errorHandler)
    );
  }
  postPmData(data): Observable<ManagePm[]> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = environment.url + '/updatePmData';
    return this.httpService.post<ManagePm[]>(url, data, {headers}).pipe(
        catchError(this.errorHandler)
    );
  }
  getFile(data): any {
    const url = environment.url + '/getPmFile';
    return this.httpService.post(url, data, {observe: 'response',
      responseType: 'blob'});
  }
  errorHandler(error) {
    let errorMessage = '';
    if ( error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage : ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
