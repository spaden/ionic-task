import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Asset} from '../../classes/asset_class/asset';
import {AssetVariable} from '../../classes/asset_class/asset-variable';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private httpService: HttpClient) { }

  getAssetData(data): Observable<Asset[]> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = 'http://192.168.43.170:8080/getAsset';
    return this.httpService.post<Asset[]>(url, data, {headers}).pipe(
        catchError(this.errorHandler)
    );
  }
  // Variable Data
  getAssetVarData(data): Observable<AssetVariable[]> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const url = 'http://192.168.43.170:8080/getVarAsset';
    return this.httpService.post<AssetVariable[]>(url, data, {headers}).pipe(
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
