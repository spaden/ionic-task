import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {LoginClass} from '../../classes/login_class/login-class';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  constructor(private httpService: HttpClient) { }
  postData(data): Observable<boolean> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    console.log(data);
    const url = 'http://port/verifyLogin';
    return this.httpService.post<boolean>(url, data, {headers}).pipe(
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
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
