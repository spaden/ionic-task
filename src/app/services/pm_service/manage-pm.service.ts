import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ManagePm} from '../../classes/pm_class/manage-pm';

@Injectable({
  providedIn: 'root'
})
export class ManagePmService {
  constructor(private httpService: HttpClient) { }

  getPmData(): Observable<ManagePm[]> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = 'http://localhost:8080/getPmData';
    return this.httpService.get<ManagePm[]>(url, {headers}).pipe(
        catchError(this.errorHandler)
    );
  }
  postPmData(data): Observable<ManagePm[]> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = 'http://localhost:8080/addPmData';
    return this.httpService.post<ManagePm[]>(url, data, {headers}).pipe(
        catchError(this.errorHandler)
    );
  }
  /*uploadFile(formData) {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = 'http://192.168.43.170:8080/uploadFile';
    return this.httpService.post(url, formData, {headers}).pipe(
        catchError(this.errorHandler)
    );
  }*/

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
