import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MasterService } from 'src/app/services/master.service';
import { Asset, AssetOut } from 'src/app/models';
import * as SecureLS from 'secure-ls';
import { TransactService } from 'src/app/services/transact.service';
import * as async from 'async';
import { IMyDpOptions, IMyDateModel, IMyDate } from 'mydatepicker';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.less']
})
export class IssueComponent implements OnInit {
  @BlockUI('form-block') blockUIList: NgBlockUI;
  listAssets = [];
  searchItem = "";
  selectedListAssets = [];
  loading = false;
  assetOut: AssetOut = new AssetOut();
  mFunction = [];
  ls = new SecureLS();
  lock = false;
  message = "";
  hasError = false;
  opened = false;
  openedMessage = "";
  doubleGI = false;
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    sunHighlight: true,
    inline: false,
    satHighlight: true,
    editableDateField: false,
    selectorHeight: "255px",
    selectorWidth: "275px",
    openSelectorOnInputClick: true,
    componentDisabled:true
  };
  issueDateDisplay: any = { jsdate: new Date() };
  constructor(private masterService: MasterService, private transactService: TransactService) { }

  ngOnInit() {
    this.mFunction = this.ls.get('mfunctions');
    this.mFunction.unshift({ FunctionCode: "", Name: "---None---" });
    this.mFunction = this.orderObject(this.mFunction, "Name");
    this.fetchAsset();
  }

  fetchAsset() {
    this.loading = true;
    this.masterService.getAssetCriteria({ Status: 1 }).subscribe(res => {
      this.listAssets = res;
      this.loading = false;
    })
  }
  customSearchFn(term: string, item: Asset) {
    term = term.toLocaleLowerCase();
    return item.AssetNumber.toLocaleLowerCase().indexOf(term) > -1 || item.AssetNumberSAP.toLocaleLowerCase().indexOf(term) > -1;
  }

  orderObject(array, property) {
    return array.sort((a: any, b: any) => {
      if (a[property] < b[property]) {
        return -1;
      } else if (a[property] > b[property]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  onChange($event) {
    this.assetOut.Unit = this.selectedListAssets.length;
  }

  checkDoubleGI() {
    if (this.validateInput()) {
      let distinctAssetNumberSAP = Array.from(new Set(this.selectedListAssets.map(f => f.AssetNumberSAP)));
      if (distinctAssetNumberSAP.length > 1) {
        this.doubleGI = true;
        this.opened = true;
        this.openedMessage = "Request has " + distinctAssetNumberSAP.length + " (SAP Number)," +
          " GI document will be separated.";
      } else {
        this.submit();
      }
    }
  }

  submit() {
    this.lock = true;
    this.blockUIList.start();
    this.transactService.getSTOCriteria({ Status: 1, FunctionCode: this.assetOut.ReceiverFunction, RowStatus:1 }).subscribe(ck => {
      if (ck[0]) {
        this.handleError("Issuing disable during stock opname periode on this function");
        this.lock = false;
        this.blockUIList.stop();
      } else {
        this.assetOut.Enable = 1;
        this.assetOut.Status = 1; //new, need approval
        let multiGI = Array.from(new Set(this.selectedListAssets.map(f => f.AssetNumberSAP)));
        if (multiGI.length > 1)//multi GI
        {
          async.eachSeries(multiGI, (i, callback) => {
            this.assetOut.Detail = this.selectedListAssets.filter(f => f.AssetNumberSAP === i);
            this.assetOut.AssetNumberSAP = i;
            this.assetOut.Unit = this.assetOut.Detail.length;
            this.transactService.postAssetOut(this.assetOut).subscribe(res => {
              this.openedMessage += "<br/>" + res.GINo;
            }, err => { callback(err); }
              , () => { callback(null); })
          }, (err) => {
            this.blockUIList.stop();
            this.assetOut = new AssetOut();
            this.selectedListAssets = [];
            this.lock = false;
            this.opened = true;
            this.fetchAsset();
            if (err) {
              this.openedMessage = "Something Error " + err;
            } else {
              this.openedMessage = "All request submitted " + this.openedMessage;
            }
          });
        } else {

          this.assetOut.Detail = this.selectedListAssets;
          this.assetOut.AssetNumberSAP = this.selectedListAssets[0].AssetNumberSAP; //get one sample;
          this.transactService.postAssetOut(this.assetOut).subscribe(res => {
            this.blockUIList.stop();
            this.lock = false;
            this.opened = true;
            this.openedMessage = "Request submitted, document number <br/>" + res.GINo;
          }, err => { }
            , () => {
              this.assetOut = new AssetOut();
              this.selectedListAssets = [];
              this.fetchAsset();
            })
        }
      }
    })

  }

  validateInput() {
    if (this.assetOut.Unit === 0 || this.assetOut.Unit === null) {
      this.handleError("No asset selected");
      return false;
    } else if (this.assetOut.PIC === "") {
      this.handleError("PIC must be defined");
      return false;
    } else {
      return true;
    }
  }

  handleError(msg: string) {
    this.message = msg;
    this.hasError = true;
    setTimeout(() => {
      this.message = "";
      this.hasError = false;
    }, 3000);
  }
}
