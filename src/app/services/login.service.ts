import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as globalVar from '../global';
import { InitialService } from './initial.service';
import { StatemanagerService } from './statemanager.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = globalVar.global_api + '/user';  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient, private initialService:InitialService, private stateManager:StatemanagerService) {
  }

  login(username, password): Observable<any> {
    return this.httpClient.post<any>(this.url + '/login', { username: username, password: password },{ headers: this._headers }).pipe(map(res => {
      return res;
    }));
    //return this.initialService.getJSON("user.json").pipe();
  }

  getUser(key:string){
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', token.token);
    return this.httpClient.post(this.url+"/user_cr",{uID:key}, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  getUserAdmin(key:string){
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', token.token);
    return this.httpClient.post<any>(this.url+"/user_cr",{uType:key}, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  getByType(key:string){
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', token.token);
    return this.httpClient.post<any>(this.url+"/user_cr",{uType:key}, { headers: headers }).pipe(
      map(
        res => {
          return res;
        }
      ));
  }

  logout() {
    setTimeout(() => {
      localStorage.clear();
      this.stateManager.setCurrentStateLogin("0");
    }, 500);
  }

}
