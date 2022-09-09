import { Component, OnInit } from '@angular/core';
import { StatemanagerService } from '../services/statemanager.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;
  traffic: boolean = false;
  empInfo:any;
  constructor(private router: Router,private stateManager:StatemanagerService
    , private loginService:LoginService, private authService:AuthService) { }

  ngOnInit() {
    this.stateManager.currentStateLogin.subscribe(res => {
      this.empInfo = JSON.parse(localStorage.getItem('currentUser'));
      this.isLogin = res;
    });
    this.stateManager.currentExistTraffic.subscribe(res => {
      this.traffic = res;
    });
  }

  logout() {
    setTimeout(() => {
      this.loginService.logout();
      this.authService.startLogout();
    }, 200);
  }
}
