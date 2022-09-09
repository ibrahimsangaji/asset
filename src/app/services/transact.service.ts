import { Injectable } from '@angular/core';
import { AssetIn, AssetOut, StockOpname, StockOpnameDetail } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as globalVar from '../global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactService {
  private url = globalVar.global_api;
  constructor(private httpClient: HttpClient) {
  }

  getAssetInCriteria(criteria: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "ad");
    return this.httpClient.post<any>(this.url + "/assetin/assetin_cr", criteria, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  getAssetOutCriteria(criteria: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "ad");
    return this.httpClient.post<any>(this.url + "/assetout/assetout_cr", criteria, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  getAssetOutDetailCriteria(criteria: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "ad");
    return this.httpClient.post<any>(this.url + "/assetout/assetoutdetail_cr", criteria, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  postAssetIn(obj: AssetIn): Observable<any> {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "ad");
    return this.httpClient.post<any>(this.url + '/assetin', obj, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  postAssetOut(obj: AssetOut): Observable<any> {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "ad");
    return this.httpClient.post<any>(this.url + "/assetout", obj, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  postApproveReject(GINo: string, Status: number): Observable<any> {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "ad");
    return this.httpClient.post<any>(this.url + "/assetout/approvereject/"+GINo+"/"+Status, {}, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  getDetailReturn(assetNumber:string): Observable<any> {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "ad");
    return this.httpClient.post<any>(this.url + "/assetout/detailreturn/"+assetNumber, {}, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  postAssetInReturn(obj: AssetIn): Observable<any> {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "ad");
    return this.httpClient.post<any>(this.url + '/assetin/return', obj, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  //--sto
  postSTO(obj: StockOpname): Observable<any> {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "ad");
    return this.httpClient.post<any>(this.url + '/sto', obj, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  getSTOCriteria(criteria): Observable<any> {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "ad");
    return this.httpClient.post<any>(this.url + '/sto/sto_cr', criteria, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  getAllSTO(): Observable<any> {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "ad");
    return this.httpClient.get<any>(this.url + '/sto/', { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  getAllSTODetail(criteria): Observable<any> {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "ad");
    return this.httpClient.post<any>(this.url + '/sto/detail/stodetail_cr', criteria, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }


  getCurrentPosition(criteria): Observable<any> {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "ad");
    return this.httpClient.post<any>(this.url + '/sto/current/current_cr', criteria, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  //----sto detail
  postSTODetail(obj: StockOpnameDetail): Observable<any> {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "ad");
    return this.httpClient.post<any>(this.url + '/sto/detail', obj, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  putSTO(obj: any): Observable<any> {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "ad");
    return this.httpClient.post<any>(this.url + '/sto/updatestatus', obj, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  getMutation(assetNumber:string) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "ad");
    return this.httpClient.post<any>(this.url + "/asset/mutation/"+assetNumber, {}, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }
}
