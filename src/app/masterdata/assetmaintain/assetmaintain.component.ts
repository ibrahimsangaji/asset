import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ClrDatagridStringFilterInterface } from "@clr/angular";
import { Asset } from 'src/app/models';
import * as SecureLS from 'secure-ls';
import * as join from 'array-join';
import { ExcelService } from 'src/app/services/excel.service';
import { TransactService } from 'src/app/services/transact.service';

class TypeFilter implements ClrDatagridStringFilterInterface<any> {
  accepts(obj: any, search: string): boolean {
    return "" + obj.t_Name == search
      || obj.t_Name.toLowerCase().indexOf(search) >= 0;
  }
}

class BrandFilter implements ClrDatagridStringFilterInterface<any> {
  accepts(obj: any, search: string): boolean {
    return "" + obj.b_Name == search
      || obj.b_Name.toLowerCase().indexOf(search) >= 0;
  }
}

@Component({
  selector: 'app-assetmaintain',
  templateUrl: './assetmaintain.component.html',
  styleUrls: ['./assetmaintain.component.less']
})
export class AssetmaintainComponent implements OnInit {
  ls = new SecureLS();
  typeFilter = new TypeFilter();
  brandFilter = new BrandFilter();
  @BlockUI('grid-block') blockUIList: NgBlockUI;
  assetOri = [];
  assetOri2 = [];
  assetData = [];
  assetData2 = [];
  assets = [];
  assets2 = [];
  assets3 = [];
  mType = [];
  mBrand = [];
  mRack = [];
  mStatus = [];
  fStatus = 0;
  fAssetNumber = "";
  opened = false;
  selectedUpdate = new Asset();

  listSw = [];
  selectedListSw = [];
  spec = "";
  saved = false;
  lock = false;
  loading=true;
  constructor(private masterService: MasterService, private transService: TransactService, private ecs : ExcelService) { }

  ngOnInit() {
    this.mBrand = this.ls.get("mbrand");
    this.mType = this.ls.get("mtype");
    this.mRack = this.ls.get("mrack");
    this.mStatus = this.ls.get("mparams");
    this.mStatus = this.mStatus.map(f => { f.EnumValue = +f.EnumValue; return f }).filter(f => f.EnumName === "StatusAsset" && f.RowStatus == 1);
    this.masterService.getAllSoftware().subscribe(res => {
      this.listSw = res;
    })
    this.fetchData();
    this.newGenerate();
  }

  customSearchFn(term: string, item: Asset) {
    term = term.toLocaleLowerCase();
    return item.AssetNumber.toLocaleLowerCase().indexOf(term) > -1 || item.AssetNumberSAP.toLocaleLowerCase().indexOf(term) > -1;
  }

  onChange($event) {
    console.log($event);
  }

  fetchData() {
    this.blockUIList.start();
    
    this.masterService.getAllAsset().subscribe(res => {
      this.assetOri = join.join(
        join.join(
          join.join(
            join.join(res, this.mBrand, { key: 'BrandCode', propMap2: p => 'b_' + p }), this.mType,
            { key: 'TypeCode', propMap2: p => 't_' + p }), this.mRack,
          { key: 'RackCode', propMap2: p => 'r_' + p }), this.mStatus,
        { key1: "Status", key2: "EnumValue", propMap2: p => 's_' + p });

      console.log(this.assetOri);
      // console.log(this.mBrand);
      // console.log(this.mType);
      // console.log(this.mRack);
      // console.log(this.mStatus);

      this.transService.getCurrentPosition({}).subscribe(resPos => {
        resPos.forEach(function(v){ delete v.BrandCode;
          delete v.GINo;
          delete v.Name;
          delete v.StatusAsset;
          delete v.StatusAssetOutHeader;
          delete v.TypeCode; });
        
        // console.log(resPos)
        for(let i=0; i<this.assetOri.length; i++) {
          var tempFInd = resPos.find((itmInner) => itmInner.AssetNumber === this.assetOri[i].AssetNumber)
          if(tempFInd != null || tempFInd != undefined){
            this.assetOri[i].PIC = tempFInd.PIC
            this.assetOri[i].ReceiverFunction = tempFInd.ReceiverFunction
          } else {
            this.assetOri[i].PIC = null
            this.assetOri[i].ReceiverFunction = null
          }
          // merged.push({
          //  ...this.assetOri[i], 
          //  ...(resPos.find((itmInner) => itmInner.AssetNumber === this.assetOri[i].AssetNumber))}
          // );
        }
        // console.log(this.assetOri)
        this.assetData = this.assetOri
        this.masterService.getAllFunctions().subscribe(resFunction => {
          this.masterService.getAllLocation().subscribe(resLoc => {
            // console.log(resLoc)
            // console.log(resFunction)
            for (let index = 0; index < this.assetOri.length; index++) {
              var tempFunction = resFunction.find(itm => itm.FunctionCode === this.assetOri[index].ReceiverFunction)
              if(tempFunction != undefined || tempFunction != null){
                var tempLoc = resLoc.find(itmf => itmf.LocationCode === tempFunction.LocationCode)
                if(tempLoc != null || tempLoc != undefined){
                  // console.log(tempLoc)
                  this.assetOri[index].LocationCode = tempLoc.LocationCode
                  this.assetOri[index].NameLocation = tempLoc.Name
                  this.assetOri[index].CategoryLocation = tempLoc.CategoryLocation
                } else {
                  this.assetOri[index].LocationCode = null
                  this.assetOri[index].NameLocation = null
                  this.assetOri[index].CategoryLocation = null
                }
                // lastMerge.push({
                //   ...merged[index],
                //   ...tempLoc,
                // })
              }
            }
          })
        })
      })
      this.assets = this.assetOri;
      console.log(this.assets)
      this.blockUIList.stop();
    });
  }

  newGenerate() {
    this.blockUIList.start();
    this.masterService.getAssetReport().subscribe(resGet => {
      console.log(resGet)
      var tempGet = []
      tempGet = resGet
      var tempOut = []
            tempGet.forEach(element => {
                var tempFind = (tempOut.filter(f=> f['Asset Number'] == element['Asset Number']))
                if(tempFind.length > 0){
                    var index = tempOut.indexOf(tempFind[0])
                    if(element['Software'] == null){
                      element['Software'] = ''
                    }
                    if(tempOut[index]['Software'] == null){
                      tempOut[index]['Software'] = ''
                    }
                    if(tempOut[index]['Software'].includes(element['Software'])){
                        
                    }else{
                      tempOut[index]['Software'] = tempOut[index]['Software'] + ", " + element['Software']
                    }
                }else{
                    tempOut.push(element)
                }
            })
      console.log(tempOut)
      this.assets2 = tempOut
    });
    this.blockUIList.stop();
  }

  searchAsset() {
    this.assets = this.assetOri;
    this.assets = this.assets.filter(f => f.AssetNumber.toLowerCase().indexOf(this.fAssetNumber.toLowerCase()) >= 0);
    if (this.fStatus != 0) {
      this.assets = this.assets.filter(f => f.Status == this.fStatus);
    }
  }

  keypressInBox(e) {
    let code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode                        
      e.preventDefault();
      this.searchAsset();
    }
  }

  updateAsset() {
    this.lock = true;
    this.selectedUpdate.Software = this.selectedListSw;
    this.masterService.putAsset(this.selectedUpdate).subscribe(res => {
      if (res.success) {
        this.saved = true;
        setTimeout(() => {
          this.lock = false;
          this.opened = false;
          this.saved = false;
          this.fetchData();
        }, 1500);

      }
    })
  }

  viewDetail(obj) {
    this.loading=true;
    this.selectedListSw = [];
    this.selectedUpdate = obj;
    if (obj.Software) {
      obj.Software.forEach(el => {
        el.Name =  this.listSw.find(f=>f.SWCode == el.SWCode).Name;
        this.selectedListSw = [...this.selectedListSw, el];
      });
      
    }
    setTimeout(() => {
      this.loading = false;
    }, 2000); 
    this.opened = true;
  }

  exportData() {
    this.newGenerate()
    // var exportData = []
    // var flags = [], output = [], l = this.assets2.length, i;
    // for( i=0; i<l; i++) {
    //     if( flags[this.assets2[i]['Asset Number']]) continue;
    //     flags[this.assets2[i]['Asset Number']] = true;
    //     output.push(this.assets2[i]['Asset Number']);
    // }

    // console.log(this.assets2)
    // this.assets2.forEach(element => {
    //   switch (element['Asset Status_Code']) {
    //     case 1:
    //       element['Asset Status_Description'] = 'Very Good-Used'
    //       break;
    //     case 2:
    //       element['Asset Status_Description'] = 'Good-Used'
    //       break;
    //     case 3:
    //       element['Asset Status_Description'] = 'Not Good'
    //       break;
    //     case 4:
    //       element['Asset Status_Description'] = 'Damaged'
    //       break;
    //     case 5:
    //       element['Asset Status_Description'] = 'Lost'
    //       break;
    //   }
    // });

    this.ecs.exportAsExcelFile(this.assets2, "asset-IT");
  }
}
