import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { AuthguardService } from './services/authguard.service';
import { LandingComponent } from './landing/landing.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

const routes: Routes = [
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  },
  // { path: 'login', component: LoginComponent, data: { state: 'login' } },
  {
    path: 'main', component: MainComponent,
    children: [

      {
        path: 'master',
        loadChildren: './masterdata/masterdata.module#MasterdataModule',
        data: { state: 'masterdata' },
        canActivate: [AuthguardService]
      },
      {
        path: 'transact',
        loadChildren: './transact/transact.module#TransactModule',
        data: { state: 'transact' },
        canActivate: [AuthguardService]
      },

      { path: 'landing', component: LandingComponent, data: { state: 'landing' }, canActivate: [AuthguardService] },
    ]
  },
  // otherwise redirect to home
  { path: 'main', component: MainComponent, pathMatch: 'full' },
  { path: '**', redirectTo: 'main/landing' }
];
const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
