import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { StatemanagerService } from '../services/statemanager.service';

@Component({
  selector: 'auth-callback',
  templateUrl: './auth-callback.component.html',
})
export class AuthCallbackComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private stateService: StatemanagerService) { }

  ngOnInit() {
    this.stateService.setCurrentStateLogin("1");
    setTimeout(() => this.authService.completeAuthentication()
      .then(() => {
        this.router.navigate(['main/landing']);
      })
      .catch((ex) => this.authService.startAuthentication()), 100)
  }

}
