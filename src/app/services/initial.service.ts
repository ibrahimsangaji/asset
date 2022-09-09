import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitialService {

  constructor(private http: HttpClient) { }

  getJSON(filejson:string): Observable<any> {
    let hitUrl = "assets/jsonatte/"+filejson;
    hitUrl += filejson === "config.json" ? "":"?_cache_buster=" + new Date().getTime();
    return this.http.get(hitUrl);
  }
}
