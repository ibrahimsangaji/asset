import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import * as SecureLS from 'secure-ls';
import { TransactService } from 'src/app/services/transact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StockOpname, Asset, StockOpnameDetail } from 'src/app/models';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-sto',
  templateUrl: './sto.component.html',
  styleUrls: ['./sto.component.less']
})
export class StoComponent implements OnInit, AfterViewInit {
  showScan = false;
  lock = false;
  @ViewChild('scanner')
  scanner: ZXingScannerComponent;
  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;
  hasCameras = false;
  mFunction = [];
  sto: StockOpname = new StockOpname();
  ls = new SecureLS();
  assetNumber = "";
  currentSTOCode = "";
  currentNotes = "";
  currentFunction = "";
  currentMonthValue = "";
  currentMonth = "";
  currentYear = "";
  openedMessage = "";
  message = "";
  hasError = false;
  confirmsuccess = false;
  asset: Asset = new Asset();
  itemFound = 0;
  stoDetail: StockOpnameDetail = new StockOpnameDetail();
  opened = false;
  constructor(private router: Router, private route: ActivatedRoute
    , private transService: TransactService, private masterService: MasterService) { }

  ngOnInit() {
    this.mFunction = this.ls.get('mfunctions');
    this.mFunction.unshift({ FunctionCode: "", Name: "---None---" });
    this.mFunction = this.orderObject(this.mFunction, "Name");
    this.route.queryParams.subscribe(params => {
      if (params.pmonth && params.pyear && params.pfunc && params.pcode) {
        this.currentFunction = params.pfunc;
        this.currentMonthValue = params.pmonth;
        this.currentMonth = "Month " + params.pmonth + " Year " + params.pyear;
        this.currentYear = params.pyear;
        this.currentSTOCode = params.pcode;
      } else {
        this.openedMessage = "There is no STO setup in Active";
        this.opened = true;
      }
    });
  }

  goToSetup() {
    this.router.navigate(["main/transact/sto-setup"]);
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
  addDesc(desc) {
    this.currentNotes += desc + ", ";
  }
  ngAfterViewInit() {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;
      this.availableDevices = devices;
    });

    this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
      console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
    });
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
  keypressInBox(e) {
    let code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode                        
      e.preventDefault();
      this.getAssetDetail(e.target.value);
    }
  };

  handleQrCodeResult(resultString: string) {
    let splitted = resultString.split("|");
    if (splitted.length > 0) {
      console.log('sukses')
      this.getAssetDetail(splitted[0]);
    } else {
      console.log('gagal')
    }
  }

  getAssetDetail(assetNumber) {
    console.log(assetNumber)
    this.masterService.getAssetCriteria({ AssetNumber: assetNumber }).subscribe(res => {
      if (res[0]) {
        this.asset = res[0];
        this.assetNumber = this.asset.AssetNumber;
        this.itemFound = 1;
        if (this.showScan) {
          this.getMyCamera();
        }
      } else {
        this.itemFound = 2;
      }
    })
  }

  getNewNumber() {
    return Math.floor(Math.pow(10, 6 - 1) + Math.random() * (Math.pow(10, 6) - Math.pow(10, 6 - 1) - 1));
  }

  handleError(msg: string) {
    this.message = msg;
    this.hasError = true;
    setTimeout(() => {
      this.message = "";
      this.hasError = false;
    }, 3000);
  }

  saveSTO() {
    if (this.assetNumber === "") {
      this.handleError("Asset must be selected!");
      return;
    }
    if (this.asset.Id > 0) {
      this.stoDetail.AssetNumber = this.asset.AssetNumber;
      this.stoDetail.AssetNumberSAP = this.asset.AssetNumberSAP;
      this.stoDetail.Notes = this.currentNotes;
      this.stoDetail.STOCode = this.currentSTOCode;
      this.stoDetail.Status = 1;
    } else {
      this.stoDetail.AssetNumber = "-";
      this.stoDetail.AssetNumberSAP = "-";
      this.stoDetail.Notes = this.currentNotes;
      this.stoDetail.STOCode = this.currentSTOCode;
      this.stoDetail.Status = 1;
    }
    this.transService.getAllSTODetail({ STOCode: this.currentSTOCode, AssetNumber: this.assetNumber }).subscribe(ck => {
      if (ck[0]) {
        this.confirmsuccess = true;
      } else {
        this.transService.postSTODetail(this.stoDetail).subscribe(res => {
          if (res) {
            this.confirmsuccess = true;
          }
        })
      }
    })
  }

  closeSTO() {
    this.transService.putSTO(
      {
        STOCode: this.currentSTOCode,
        Month: +this.currentMonthValue,
        Year: +this.currentYear,
        Status: 2,
        FunctionCode: this.currentFunction
      }).subscribe(res => {
        if (res.success) {
          this.router.navigate(['main/transact/sto-setup']);
        }
      })
  }

  refresh() {
    //window.location.reload();
    //this.currentSTOCode = "";
    this.currentNotes = "";
    this.openedMessage = "";
    this.asset = new Asset();
    this.itemFound = 0;
    this.stoDetail = new StockOpnameDetail();
    this.opened = false;
    this.showScan = false;
    this.assetNumber = "";
  }
}
