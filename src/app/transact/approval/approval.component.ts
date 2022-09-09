import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TransactService } from 'src/app/services/transact.service';
import * as globalVar from '../../global';
@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.less']
})
export class ApprovalComponent implements OnInit {
  @BlockUI('grid-block') blockUIList: NgBlockUI;
  assets = [];
  toViewDetail = "";
  toViewGI = "";
  showDetailModal = false;
  lock = false;
  urlBast = globalVar.global_api + "/assetout/bastk/";
  constructor(private transactService: TransactService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.blockUIList.start();
    this.transactService.getAssetOutCriteria({ Status: 1 }).subscribe(res => {
      this.assets = res;
      this.blockUIList.stop();
    });
  }

  showDetail(assetNumberSAP, giNo) {
    this.showDetailModal = true;
    this.toViewDetail = "";
    this.toViewGI = "";
    setTimeout(() => {
      this.toViewDetail = assetNumberSAP;
      this.toViewGI = giNo;
    }, 500);
  }

  actionGI(act: number) {
    this.lock = true;
    this.transactService.postApproveReject(this.toViewGI, act).subscribe(res => {
      if (res.rowsAffected.length > 0) {
        if(act == 2){
          window.open(this.urlBast + this.toViewGI, "_blank");
        }
        this.toViewDetail = "";
        this.toViewGI = "";
        setTimeout(() => {
          this.lock = false;
          this.showDetailModal = false;
        }, 500);
      }
    }, err => { }
      , () => { this.fetchData(); })

  }
}
