import { Component, OnInit } from '@angular/core';
import { AssetIn } from 'src/app/models';
import * as SecureLS from 'secure-ls';
import * as moment from 'moment';
import { IMyDpOptions, IMyDateModel, IMyDate } from 'mydatepicker';
import { TransactService } from 'src/app/services/transact.service';
import * as globalVar from '../../global';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.less']
})
export class ReceiveComponent implements OnInit {
  @BlockUI('form-block') blockUIList: NgBlockUI;
  assetIn: AssetIn = new AssetIn();
  message = "";
  hasError = false;
  opened = false;
  mType = [];
  mBrand = [];
  mRack = [];
  mEmp: any;
  urlPrintQR = globalVar.global_api + "/asset/print/";
  assetRegistered = [];
  ls = new SecureLS();

  lock = false;
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
    disableSince: {
      year: +moment().add(1,"day").format("YYYY"),
      month: +moment().add(1,"day").format("MM"),
      day: +moment().add(1,"day").format("DD")
    }
  };

  // public disableDate: IMyDate = {};
  todayDate: any = { jsdate: new Date() };
  constructor(private transactService: TransactService, private masterService: MasterService) { }

  ngOnInit() {

    this.mType = this.ls.get('mtype');
    this.mBrand = this.ls.get('mbrand');
    this.mRack = this.ls.get('mrack');
    this.mEmp = this.ls.get('memp');
    this.assetIn.ReceiveDate = this.todayDate;
  }

  // onChangeTransactionType(val: number) {

  // }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onDateChanged(event: IMyDateModel) {
    console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
  }

  submit() {
    if (this.assetIn.Unit === 0 || this.assetIn.Unit === null) {
      this.handleError("Qty cannot be empty or zero");
      return false;
    }
    if (this.assetIn.Unit < 0 || this.assetIn.Unit === null) {
      this.handleError("Qty cannot be less then zero");
      return false;
    }
    if (this.assetIn.BrandCode === "") {
      this.handleError("Brand must be defined");
      return false;
    }
    if (this.assetIn.TypeCode === "") {
      this.handleError("Type must be defined");
      return false;
    }
    if (this.assetIn.RackCode === "") {
      this.handleError("Rack must be defined");
      return false;
    }
    if (this.assetIn.PurchasePrice === 0 || this.assetIn.PurchasePrice === null) {
      this.handleError("Purchase price must be defined");
      return false;
    }
    if (this.assetIn.ReceiveDate === "") {
      this.handleError("Receive date must be defined");
      return false;
    }
    if (this.assetIn.AssetName === "") {
      this.handleError("Name must be defined");
      return false;
    }
    if (this.assetIn.AssetNumberSAP === "") {
      this.handleError("Asset SAP No must be defined");
      return false;
    }
    this.lock = true;
    this.blockUIList.start();
    this.assetIn.Enable = 1;
    this.assetIn.TransactionType = 1;
    this.assetIn.Status = 1;
    this.assetIn.ReceiveDate = moment(this.assetIn.ReceiveDate.jsdate).format("YYYY-MM-DD");
    this.masterService.getAssetCriteria({ AssetNumberSAP: this.assetIn.AssetNumberSAP }).subscribe(ck => {
      if (ck.length == 0) {
        this.transactService.postAssetIn(this.assetIn).subscribe(res => {
          if (res.length > 0) {
            this.opened = true;
            this.assetRegistered = res;
            this.assetIn = new AssetIn();
            this.lock = false;
            this.blockUIList.stop();
          }
        })
      } else {
        this.handleError("SAP Asset Number existed!");
        this.lock = false;
        this.blockUIList.stop();
      }
    });
  }

  printQR() {
    window.open(this.urlPrintQR + this.assetRegistered[0].AssetNumberSAP, "_blank");
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
