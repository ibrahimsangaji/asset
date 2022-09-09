import { Component, OnInit } from '@angular/core';
import { InitialService } from '../services/initial.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MasterService } from '../services/master.service';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less']
})
export class LandingComponent implements OnInit {
  menus = [];
  ls = new SecureLS();
  constructor(private router: Router, private initialService: InitialService, private masterService: MasterService) { }

  ngOnInit() {
    this.initialService.getJSON("menu.json").subscribe(res => {
      this.menus = res;
    });
    // if (!this.ls.get("mbrand")) { //check if no master data, then get it all
      forkJoin([
        this.masterService.getAllBrand(),
        this.masterService.getAllFunctions(),
        this.masterService.getAllLocation(),
        this.masterService.getAllRack(),
        this.masterService.getAllType(),
        this.masterService.getAllParams()]).subscribe(val => {
          this.ls.set("mbrand", val[0]);
          this.ls.set("mfunctions", val[1]);
          this.ls.set("mlocation", val[2]);
          this.ls.set("mrack", val[3]);
          this.ls.set("mtype", val[4]);
          this.ls.set("mparams", val[5]);
        });
    // }
  }
  goTo(path: string) {
    this.router.navigate(["main/" + path]);
  }
}
