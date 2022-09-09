import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TransactService } from 'src/app/services/transact.service';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-mutation',
  templateUrl: './mutation.component.html',
  styleUrls: ['./mutation.component.less']
})
export class MutationComponent implements OnInit, AfterViewInit {
  @BlockUI('grid-block') blockUIList: NgBlockUI;
  fAssetNumber = "";
  rptObj = [];
  Keys = [];
  results = [];
  showDetailModal = false;

  showScan = false;
  @ViewChild('scanner')
  scanner: ZXingScannerComponent;
  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;
  hasCameras = false;
  constructor(private transactService: TransactService) { }

  ngOnInit() {
  }

  keypressInBox(e) {
    let code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode                        
      e.preventDefault();
      this.fetchData();
    }
  }

  fetchData() {
    if (this.fAssetNumber !== "") {
      this.blockUIList.start();
      this.transactService.getMutation(this.fAssetNumber).subscribe(res => {
        this.rptObj = res;
        this.blockUIList.stop();
      });
    }
  }

  ignoreProp(element, index, array) {
    return (element != "Id" ||
      element != "RowStatus" ||
      element != "CreateDate" ||
      element != "CreateBy");
  }

  getDetail(objNumber, type) {
    // Add this inside subscribe
    let excludeCol = ["Id", "RowStatus", "AssetNumberSAP", "CreateBy", "ApproveBy", "UpdateDate", "UpdateBy", "ApproveDate", "Status", "Enable"]
    if (type == 1) {
      
      this.transactService.getAssetInCriteria({ GRNo: objNumber }).subscribe(res => {
        this.Keys = (res.length || []) &&
          Object.keys(res[0]);
        this.Keys = this.Keys.filter(f => !excludeCol.includes(f));
        this.results = res.map(
          element => {
            let obj = [];
            this.Keys.filter(f => !excludeCol.includes(f)).forEach(key => obj.push({ key: key, value: element[key] }))
            return obj;
          }
        )
      }, err => { }, () => { this.showDetailModal = true; })
    } else {
      this.transactService.getAssetOutCriteria({ GINo: objNumber }).subscribe(res => {
        this.Keys = (res.length || []) &&
          Object.keys(res[0]);
          this.Keys = this.Keys.filter(f => !excludeCol.includes(f));
        this.results = res.map(
          element => {
            let obj = [];
            this.Keys.filter(f => !excludeCol.includes(f)).forEach(key => obj.push({ key: key, value: element[key] }))
            return obj;
          }
        )
      }, err => { }, () => { this.showDetailModal = true; })
    }

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

  handleQrCodeResult(resultString: string) {
    let splitted = resultString.split("|");
    if (splitted.length == 2) {
      this.fAssetNumber = splitted[0];
      this.fetchData();
    } else {

    }
  }
}
