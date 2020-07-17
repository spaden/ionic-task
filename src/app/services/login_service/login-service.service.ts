import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  constructor(private httpService: HttpClient) { }
  /*postUserData(data): Observable<boolean> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    console.log(data);
    const url = environment.url + '/verifyUserLogin';
    return this.httpService.post<boolean>(url, data, {headers}).pipe(
        catchError(this.errorHandler)
    );
  }*/
  /*postSuperUserData(data): Observable<boolean> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    console.log(data);
    const url = environment.url + '/verifySuperUserLogin';
    return this.httpService.post<boolean>(url, data, {headers}).pipe(
        catchError(this.errorHandler)
    );
  }*/
  postLoginData(data): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    console.log(data);
    const url = environment.url + '/data/checklogin';
    return this.httpService.post<any>(url, data, {headers}).pipe(
        catchError(this.errorHandler)
    );
  }
  errorHandler(error) {
    let errorMessage = '';
    if ( error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage : ${error.message}`;
    }
    window.alert('Error Code: ' + error.status + '\nLogin Unsuccessfull');
    return throwError(errorMessage);
  }
}
