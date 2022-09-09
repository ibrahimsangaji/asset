import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { AssetIn, AssetOut, Asset } from 'src/app/models';
import { TransactService } from 'src/app/services/transact.service';
import * as SecureLS from 'secure-ls';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import * as moment from 'moment';
@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.less']
})
export class ReturnComponent implements OnInit, AfterViewInit {
  showScan = false;
  @ViewChild('scanner')
  scanner: ZXingScannerComponent;
  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;
  hasCameras = false;
  assetNumber = "";
  assetAbstract: any;
  assetDetail = [];
  assetIn: AssetIn = new AssetIn();
  assetOut: AssetOut = new AssetOut();
  message = "";
  hasError = false;
  lock = false;

  openedMessage = "";
  opened = false;
  ls = new SecureLS();
  mRack = [];
  //select
  listAssets = [];
  selectedListAssets = [];
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    sunHighlight: true,
    inline: false,
    satHighlight: true,
    editableDateField: false,
    selectorHeight: "255px",
    selectorWidth: "275px",
    openSelectorOnInputClick: true
  };
  constructor(private transServices: TransactService) { }

  ngOnInit() {
    this.mRack = this.ls.get('mrack');
  }

  ngAfterViewInit() {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;

      this.availableDevices = devices;

      // selects the devices's back camera by default
      // for (const device of devices) {
      //   if (/back|rear|environment/gi.test(device.label)) {
      //     this.scanner.changeDevice(device);
      //     this.selectedDevice = device;
      //     break;
      //   }

      //   if (/webcam|EasyCamera/gi.test(device.label)) {
      //     this.scanner.changeDevice(device);
      //     this.selectedDevice = device;
      //     break;
      //   }
      // }
    });

    this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
      console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
    });
  }

  keypressInBox(e) {
    let code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode                        
      e.preventDefault();
      this.getAssetDetail(e.target.value);
    }
  };

  handleQrCodeResult(resultString: string) {
    let splitted = resultString.split("|");
    if (splitted.length == 2)
      this.getAssetDetail(splitted[0]);
  }

  getAssetDetail(assetNumber: string) {
    this.assetOut = new AssetOut();
    this.assetAbstract = {};
    this.transServices.getDetailReturn(assetNumber).subscribe(res => {
      if (res.length == 0) {
        this.opened = true;
        this.openedMessage = "Asset not in 'Outgoing' status, please check asset on maintain page's";
      } else {
        this.assetOut = res[0];
        this.assetAbstract = res[0];
        this.listAssets = res;
        res.forEach(el => {
          this.selectedListAssets = [...this.selectedListAssets, el.AssetNumber];
        });
      }
    }, err => { }
      , () => {
      })
  }

  getMyCamera() {
    if (!this.showScan) {
      for (const device of this.availableDevices) {
        if (/back|rear|environment/gi.test(device.label)) {
          this.scanner.changeDevice(device);
          this.selectedDevice = device;
          this.showScan = true;
          break;
        }

        if (/webcam|EasyCamera/gi.test(device.label)) {
          this.scanner.changeDevice(device);
          this.selectedDevice = device;
          this.showScan = true;
          break;
        }
      }
    } else {
      this.selectedDevice = null;
      this.showScan = false;
    }
  }

  submit() {
    this.assetIn.ReturnPartial = this.selectedListAssets.length == this.listAssets.length ? 0 : 1;
    this.assetIn.Unit = this.selectedListAssets.length;
    this.assetIn.ReffNo = this.assetAbstract.GINo;
    this.assetIn.TransactionType = 2;
    this.assetIn.Status = 1;
    this.assetIn.AssetNumberSAP = this.assetAbstract.AssetNumberSAP;
    this.assetIn.BrandCode = this.assetAbstract.BrandCode;
    this.assetIn.TypeCode = this.assetAbstract.TypeCode;
    this.assetIn.AssetName = this.assetAbstract.Name;
    this.assetIn.ReceiveDate = moment(this.assetIn.ReceiveDate.jsdate).format("YYYY-MM-DD");
    this.assetIn.PurchasePrice = 0;
    this.selectedListAssets.forEach(e => {
      this.assetIn.Detail.push({ AssetNumber: e });
    })
    if (this.assetIn.Unit === 0 || this.assetIn.Unit === null) {
      this.handleError("Qty cannot be empty or zero");
      return false;
    }
    if (this.assetIn.Unit === 0 || this.assetIn.Unit === null) {
      this.handleError("Qty cannot be empty or zero");
      return false;
    }
    if (this.assetIn.ReceiveDate === "") {
      this.handleError("Receive date must be defined");
      return false;
    }
    if (this.assetIn.RackCode === "") {
      this.handleError("Rack must be defined");
      return false;
    }
    this.lock = true;
    setTimeout(() => {
      this.transServices.postAssetInReturn(this.assetIn).subscribe(res => {
        this.assetAbstract = {};
        this.assetDetail = [];
        this.assetIn = new AssetIn();
        this.assetOut = new AssetOut();
        this.listAssets = [];
        this.selectedListAssets = [];
        this.lock = false;
        this.opened = true;
        this.openedMessage = "Asset registered, document number " + res.GRNo;
        this.assetNumber = "";
      }, err => { }
       , () => { })
    }, 500);
  }
  onDateChanged(event: IMyDateModel) {
    console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
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
