import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MasterService } from 'src/app/services/master.service';
import { TransactService } from 'src/app/services/transact.service';
import * as SecureLS from 'secure-ls';
import * as join from 'array-join';
import { ExcelService } from 'src/app/services/excel.service';
import { FfunctionsPipe } from 'src/app/pipes/ffunctions.pipe';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-gihistory',
  templateUrl: './gihistory.component.html',
  styleUrls: ['./gihistory.component.less']
})
export class GihistoryComponent implements OnInit {
  @BlockUI('grid-block') blockUIList: NgBlockUI;
  ls = new SecureLS();
  giHistory = [];
  Keys = [];
  results = [];
  showDetailModal = false;
  mType = [];
  mBrand = [];
  mStatus = [];
  showingDetail = ["Name", "TypeName", "StatusInfo1", "BrandName", "AssetNumber","PIC"];
  constructor(private transService: TransactService, private ecs : ExcelService,
     private masterService : MasterService, private functionPipe : FfunctionsPipe) { }

  ngOnInit() {
    this.mBrand = this.ls.get("mbrand");
    this.mType = this.ls.get("mtype");
    this.mStatus = this.ls.get("mparams");
    this.mStatus = this.mStatus.map(f => { f.EnumValue = +f.EnumValue; return f }).filter(f => f.EnumName === "StatusAsset" && f.RowStatus == 1);
    this.fetchData();
  }
  
  fetchData() {
    this.blockUIList.start();
    this.transService.getCurrentPosition({}).subscribe(res => {
      // console.log(res);
      this.giHistory = res;
      this.giHistory = join.join(
        join.join(
          join.join(res, this.mBrand, { key: 'BrandCode', propMap2: p => 'Brand' + p }),
          this.mType, { key: 'TypeCode', propMap2: p => 'Type' + p }), this.mStatus,
        { key1: "StatusAsset", key2: "EnumValue", propMap2: p => 'Status' + p });

      const groupedObj = this.giHistory.reduce((prev, cur) => {
        if (!prev[cur["ReceiverFunction"]]) {
          prev[cur["ReceiverFunction"]] = [cur];
        } else {
          prev[cur["ReceiverFunction"]].push(cur);
        }
        return prev;
      }, {});
      this.giHistory = Object.keys(groupedObj)
        .map(ReceiverFunction => ({ ReceiverFunction, CountDevices: groupedObj[ReceiverFunction] }));
        console.log(this.giHistory);
      this.blockUIList.stop();
    });
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

  showDetail(res) {
    this.Keys = (res.length || []) &&
      Object.keys(res[0]);
    this.Keys = this.Keys.sort((a, b) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    })
    this.results = res.map(
      element => {
        let obj = [];
        this.Keys.filter(f => this.showingDetail.includes(f)).forEach(key => {
          obj.push({ key: key, value: element[key] })
        })
        return obj;
      }
    )
    this.Keys = this.Keys.filter(f => this.showingDetail.includes(f));

    this.showDetailModal = true;
  }

  downFile(res) {
    // this.excelService.exportAsExcelFile(raw, "export_raw");
    // console.log(res);
    const all = this.giHistory.filter((obj) => {
      return obj.ReceiverFunction === res;
    }); 

      //ganti nama file 
        var print = []
        var tmpNameFuc = []

        all[0].CountDevices.forEach(element => {
          var tempFunc = this.functionPipe.transform(print,element.ReceiverFunction)
          var tempObj = {"AssetNumber":null, "BrandName":null, "Name":null, "PIC":null, "StatusInfo1":null, "TypeName":null}
          // console.log(element)
          tempObj["Name"] = element.Name
          tempObj["TypeName"] = element.TypeName
          tempObj["StatusInfo1"] = element.StatusInfo1
          tempObj["BrandName"] = element.BrandName
          tempObj["AssetNumber"] = element.AssetNumber
          tempObj["PIC"] = element.PIC
          tempObj["FunctionCode"] = element.ReceiverFunction
          tempObj["FunctionName"] = tempFunc.Name
          print.push(tempObj)
          tmpNameFuc = tempFunc.Name
        })
        this.ecs.exportAsExcelFile(print, "asset-IT_"+tmpNameFuc);


    // console.log(all[0].CountDevices);
    
  }

}
