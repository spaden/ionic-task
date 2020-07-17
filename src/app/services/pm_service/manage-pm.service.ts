import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ManagePm} from '../../classes/pm_class/manage-pm';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagePmService {
  constructor(private httpService: HttpClient) { }
  file: any;
  getPmData(data): Observable<ManagePm[]> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = environment.url + '/getPmData';
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
