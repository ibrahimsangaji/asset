import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User, WebStorageStateStore } from 'oidc-client';
import { Employee } from '../models';
import { InitialService } from './initial.service';
import * as SecureLS from 'secure-ls';
import { AppConfig } from '../app-config';

@Injectable()
export class AuthService {

  /* Use Module OidcService */

  // set variable
  public manager = null;
  private user: User = null;
  ls = new SecureLS();
  private config: any;
  // setter, getter
  private setEmployee(userId: string, idNumber: string, name: string, department: string, email: string, phoneNumber: string, isAdmin: boolean) {
    const employee = new Employee();
    employee.UserId = userId;
    employee.EmployeeNumber = idNumber;
    employee.Name = name;
    employee.FunctionCode = department;
    employee.FunctionName = null;
    employee.Email = email;
    employee.PhoneNumber = phoneNumber;
    employee.IsActive = isAdmin;
  }

  // constructor
  constructor(private app_config: AppConfig) {
    this.config = this.app_config.get();
    this.manager = new UserManager(getClientSettings(
      this.config.AuthProtocol.LoginAddress,
      this.config.AuthProtocol.client_id,
      this.config.WebMainAddress,
      this.config.AuthProtocol.redirect_uri,
      this.config.AuthProtocol.response_type,
      this.config.AuthProtocol.scope,
      this.config.AuthProtocol.filterProtocolClaims,
      this.config.AuthProtocol.loadUserInfo));

    this.manager.getUser().then(user => {
      this.user = user;
    });

  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }
  getClaims(): any {
    return this.user.profile;
  }
  getAuthorizationHeaderValue(): string {
    if (this.user) {
      return `${this.user.token_type} ${this.user.access_token}`;
    }
    else {
      return null;
    }
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }
  startLogout(): Promise<void> {
    return this.manager.signoutRedirect();
  }
  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      this.ls.set("memp", user);
      this.setUserProfile(user);
    });
  }
  initialLoad(): Promise<any> {
    return this.manager.getUser().then(user => {
      this.setUserProfile(user);
    });
  }
  setUserProfile(user): void {
    if (user !== null && user !== undefined) {
      this.user = user;
      let isAdmin = false;
      this.setEmployee(
        user.profile.sub,
        user.profile.EmployeeIdNumber,
        user.profile.FullName,
        user.profile.Description,
        user.profile.Email,
        user.profile.PhoneNumber,
        isAdmin
      );
    }
  }
  getAccessToken(): any {
    // return this.user.access_token;
    if (this.user) {
      return `${this.user.token_type} ${this.user.access_token}`;
    }
    else {
      return null;
    }
  }
}

export function getClientSettings(
  authority, client_id, mainWeb, redirect_uri,
  response_type, scope, filterProtocolClaims, loadUserInfo): UserManagerSettings {

  return {
    authority: authority,
    client_id: client_id,
    redirect_uri: mainWeb + redirect_uri,
    post_logout_redirect_uri: mainWeb,
    response_type: response_type,
    scope: scope,
    filterProtocolClaims: filterProtocolClaims,
    loadUserInfo: loadUserInfo,
    userStore: new WebStorageStateStore({ store: localStorage })
  };

}
