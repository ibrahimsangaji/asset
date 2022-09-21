import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as globalVar from '../global';
import { Asset } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private url = globalVar.global_api;  // URL to web api
  constructor(private httpClient: HttpClient) {
  }

  //asset
  getAllAsset() {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");//_headers.append('x-access-token', token.token);
    return this.httpClient.get<any>(this.url + '/asset', { headers: headers }).pipe(
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

  getAssetCriteria(criteria: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "ad");
    return this.httpClient.post<any>(this.url + "/asset/asset_cr", criteria, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  getReport(month:number, year:number, code:any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "ad");
    return this.httpClient.post<any>(this.url + "/asset/report"+"/"+month+"/"+year+"/"+code, {}, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  putAsset(asset:Asset) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "ad");
    return this.httpClient.put<any>(this.url + "/asset/", asset, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  postAsset(asset: Asset) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', token.token);
    return this.httpClient.post<any>(this.url + "/asset", asset, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  //type
  getAllType() {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");//_headers.append('x-access-token', token.token);
    return this.httpClient.get<any>(this.url + '/type', { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  getTypeCriteria(criteria: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', token.token);
    return this.httpClient.post<any>(this.url + "/type/type_cr", criteria, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  postType(type: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");
    return this.httpClient.post<any>(this.url + "/type", type, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  putType(type: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");
    return this.httpClient.put<any>(this.url + "/type", type, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }
  //brand
  getAllBrand() {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");//_headers.append('x-access-token', token.token);
    return this.httpClient.get<any>(this.url + '/brand', { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  getBrandCriteria(criteria: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', token.token);
    return this.httpClient.post<any>(this.url + "/brand/brand_cr", criteria, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  postBrand(brand: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");
    return this.httpClient.post<any>(this.url + "/brand", brand, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  putBrand(brand: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");
    return this.httpClient.put<any>(this.url + "/brand", brand, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  //software
  getAllSoftware() {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");//_headers.append('x-access-token', token.token);
    return this.httpClient.get<any>(this.url + '/sw', { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  getSoftwareCriteria(criteria: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', token.token);
    return this.httpClient.post<any>(this.url + "/sw/sw_cr", criteria, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  postSoftware(sws: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");
    return this.httpClient.post<any>(this.url + "/sw", sws, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  putSoftware(sws: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");
    return this.httpClient.put<any>(this.url + "/sw", sws, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  //rack
  getAllRack() {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");//_headers.append('x-access-token', token.token);
    return this.httpClient.get<any>(this.url + '/rack', { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  getRackCriteria(criteria: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', token.token);
    return this.httpClient.post<any>(this.url + "/rack/rack_cr", criteria, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  postRack(rack: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");
    return this.httpClient.post<any>(this.url + "/rack", rack, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }
  putRack(rack: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");
    return this.httpClient.put<any>(this.url + "/rack", rack, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }
  //functions
  getAllFunctions() {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");//_headers.append('x-access-token', token.token);
    return this.httpClient.get<any>(this.url + '/functions', { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  getFunctionsCriteria(criteria: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");
    return this.httpClient.post<any>(this.url + "/functions/functions_cr", criteria, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  postFunctions(functions: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");
    return this.httpClient.post<any>(this.url + "/functions", functions, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  putFunctions(functions: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");
    return this.httpClient.put<any>(this.url + "/functions", functions, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  //ibrahim 13-07-2022 keperluan untuk update seluruh functioncode
  updateFunctionNew(functions: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");
    return this.httpClient.put<any>(this.url + "/functions/update/", functions, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  //location
  getAllLocation() {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");//_headers.append('x-access-token', token.token);
    return this.httpClient.get<any>(this.url + '/location', { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  getAllLocationbyNameAndCode(criteria: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");//_headers.append('x-access-token', token.token);
    return this.httpClient.post<any>(this.url + '/location/loc/namecode', criteria, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  getLocationCriteria(criteria: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");
    return this.httpClient.post<any>(this.url + "/location/location_cr", criteria, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  postLocation(location: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");
    return this.httpClient.post<any>(this.url + "/location", location, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }
  putLocation(location: any) {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");
    return this.httpClient.put<any>(this.url + "/location", location, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }
  //params
  getAllParams(){
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', "abc");//_headers.append('x-access-token', token.token);
    return this.httpClient.get<any>(this.url + '/asset/params', { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }
}
