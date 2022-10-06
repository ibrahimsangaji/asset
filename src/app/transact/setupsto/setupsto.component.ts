import { Component, OnInit } from '@angular/core';
import * as SecureLS from 'secure-ls';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TransactService } from 'src/app/services/transact.service';
import { StockOpname } from 'src/app/models';
import * as async from 'async';
import * as join from 'array-join';
import { ClrDatagridStringFilterInterface } from "@clr/angular";
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/services/excel.service';
import { MasterService } from 'src/app/services/master.service';
import { element } from '@angular/core/src/render3';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

class FunctionFilter implements ClrDatagridStringFilterInterface<any> {
  accepts(obj: any, search: string): boolean {
    return "" + obj.Name == search
      || obj.Name.toLowerCase().indexOf(search) >= 0;
  }
}

@Component({
  selector: 'app-setupsto',
  templateUrl: './setupsto.component.html',
  styleUrls: ['./setupsto.component.less']
})
export class SetupstoComponent implements OnInit {
  @BlockUI('form-block') blockUIList: NgBlockUI;
  @BlockUI('page-block') blockUIPage: NgBlockUI;
  functionFilter = new FunctionFilter();
  ls = new SecureLS();
  lock = false;
  message = "";
  hasError = false;
  sltmFuc = 0
  searchStatus = 0
  mFunction = [];
  mStatus = [];
  sto: StockOpname = new StockOpname();
  search:string="";
  tempSt = [];
  listSto = [];
  resList = [];
  listStoDetail = [];
  showDetailModal = false;
  constructor(private router: Router, private transactService: TransactService,
    private excelService: ExcelService, private masterService: MasterService, private toasterService:ToastrService) { }

  ngOnInit() {
    this.mFunction = this.ls.get('mfunctions');
    this.mFunction = this.orderObject(this.mFunction, "Name");
    this.mStatus = this.ls.get("mparams");
    this.mStatus = this.mStatus.map(f => { f.EnumValue = +f.EnumValue; return f }).filter(f => f.EnumName === "StatusSTO" && f.RowStatus == 1);
    this.fetchData();
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

  orderObjectDesc(array, property) {
    return array.sort((a: any, b: any) => {
      if (a[property] > b[property]) {
        return -1;
      } else if (a[property] < b[property]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  fetchData() {
    this.blockUIList.start();
    this.transactService.getSTOCriteria({ RowStatus: 1 }).subscribe(res => {
      this.listSto = join.join(
        join.join(res, this.mFunction, { key: "FunctionCode" }), this.mStatus,
        { key1: "Status", key2: "EnumValue" });
      this.listSto = this.orderObjectDesc(this.listSto, "Id");
      this.resList = this.listSto
      this.blockUIList.stop();
    })
  }

  btSearch(){
    var req = {Year: this.sto.Year, Month: this.sto.Month, FunctionCode: this.sltmFuc}
    var resSeacrch = this.resList.filter((list) => list.Year == req.Year && list.Month == req.Month && list.FunctionCode == req.FunctionCode)
    // console.log(this.resList)
    // console.log(resSeacrch)
    this.listSto = resSeacrch
    this.searchStatus = 1
  }

  onSearch(){
    // var resSeacrch = this.resList.filter((list) => list.STOCode === this.search)
    // this.listSto = resSeacrch
    // console.log(this.search.length)
    
    if(this.search.length > 0){
      var resSeacrch = this.resList.filter((list) => list.STOCode.includes(this.search))
      this.listSto = resSeacrch
    }else{
      this.listSto = this.resList
    }
  }

  resetFilter(){
    this.listSto = this.resList
    this.searchStatus = 0
    this.sto.Month = 0
    this.sto.Year = 0
    this.sltmFuc = 0
  }

  fetchDetail(sto) {
    this.showDetailModal = true;
    this.transactService.getCurrentPosition({ ReceiverFunction: sto.FunctionCode }).subscribe(res => {
      console.log(res)
      console.log(sto)
      console.log(sto.FunctionCode)
      res.forEach(element => {
        if(element.StatusSTODT == 1 && sto.STOCode == element.STOCode){
          element.StatusSTODT = 'Scanned';
        }else{
          element.StatusSTODT = 'Not Scanned';
        }
      });
      this.listStoDetail = res;
      
      // console.log(this.listSto)
      console.log(this.listStoDetail)
    })
  }

  cancelClose(obj) {
    this.lock = true;
    if (this.listSto.filter(f => f.Year == obj.Year && f.Month == obj.Month && f.Status == 2).length>0) {
      this.lock = false;
      this.handleError("This cancellation be done, because one or more of STO is already closed");
    } else {

      async.each(this.listSto.filter(f => f.Year == obj.Year && f.Month == obj.Month), (i, callback) => {

        this.transactService.putSTO(
          {
            STOCode: i.STOCode,
            Status: 1,
            RowStatus: 0
          }).subscribe(gen => {
            if (gen.success) {
              setTimeout(() => {
                callback();
              }, 1000);
            }
          })
      }, (err) => {
        this.lock = false;
        this.sto.Month = 0;
        this.sto.Year = 0;
        this.fetchData();
      });

      this.sltmFuc = 0;
    }
  }

  registerSTO() {
    if (+this.sto.Month === 0) {
      this.handleError("Month must be defined");
      return false;
    }
    if (+this.sto.Year === 0) {
      this.handleError("Year must be defined");
      return false;
    }
    var currYear = new Date().getFullYear()
    var currMonth = new Date().getMonth()+1
    
    if (this.sto.Year < currYear || (this.sto.Year == currYear && this.sto.Month < currMonth)) {
      this.handleError("Date cannot before today");
      return false;
    }
    
    
    // this.blockUIPage.start()
    console.log(this.sltmFuc)
    if (this.sltmFuc == 0) {
      this.transactService.getSTOCriteria({Month : this.sto.Month, Year : this.sto.Year, RowStatus : 1}).subscribe(resSto => {
        if (resSto.length > 0){
        
        }else{
          const filterRes = this.listSto.filter(element => {
            return element.Status == 1;
          });
          var exceptFunc = []
          filterRes.forEach(element => {
            exceptFunc.push(element.FunctionCode)
          })
          var listFunc = []
          var tempFunc = this.mFunction.filter(f => !exceptFunc.includes(f.FunctionCode) && f.RowStatus == 1)
          tempFunc.forEach(element => {
            listFunc.push({FunctionCode : element.FunctionCode, Status : 1, Month : this.sto.Month, Year : this.sto.Year, CreateBy : null})
          })
          
          if(listFunc.length > 0){
            console.log(listFunc)
            this.transactService.batchSTO(listFunc).subscribe(resBatch => {
              console.log(resBatch)
              if(resBatch[0]){
                this.fetchData()
              }
            })
          }
          
        }
      })
      // this.blockUIPage.stop()
      // this.lock = false;
      return true;
    }
    this.transactService.getSTOCriteria({ Month: this.sto.Month, Year: this.sto.Year, RowStatus: 1, FunctionCode : this.sltmFuc }).subscribe(res => {
      if (res.length == 0) {
        
        const filterRes = this.listSto.filter(element => {
          return element.Status == 1 && element.FunctionCode == this.sltmFuc;
        });
        
        console.log(filterRes)
        
        if (filterRes.length > 0) {
          this.lock = false;
          this.handleError("This periode still has an active STO on function " + filterRes[0].FunctionCode + " ( Month : "+ filterRes[0].Month + ", Year : "+ filterRes[0].Year + " )");
        } else {
          console.log("masuk else")
          async.each(this.mFunction.filter(f => f.FunctionCode == this.sltmFuc), (i, callback) => {
            this.sto.FunctionCode = i.FunctionCode;
            this.sto.Status = 1;
            this.transactService.postSTO(this.sto).subscribe(gen => {
              console.log("selesai post")
              if (gen[0]) {
                setTimeout(() => {
                  callback();
                }, 1000);
              }
            });

          }, (err) => {
            this.lock = false;
            this.sto.Month = 0;
            this.sto.Year = 0;
            this.fetchData();
          });
        }
      } else {
        this.handleError("This periode already exist");
      }
    })
    
    this.sltmFuc = 0;
  }

  goToPlay(obj) {
    this.router.navigate(['main/transact/sto'], { queryParams: { pmonth: obj.Month, pyear: obj.Year, pfunc: obj.FunctionCode, pcode: obj.STOCode } });
  }

  exportReport() {
    if (this.sto.Month == 0 || this.sto.Year == 0) {
      this.handleError("Please define month and year periode to export report");
      return;
    }
    this.lock = true;
    // console.log(this.sto.Month,"----",this.sto.Year)
    this.masterService.getReport(this.sto.Month, this.sto.Year, this.sltmFuc).subscribe(raw => {
      // console.log(raw)
      this.tempSt = raw
      this.excelService.exportAsExcelFile(raw, "export_raw");
      this.lock = false;
    })

  }

  downFile(stoDl) {
    console.log(stoDl)

    this.lock = true;
    // console.log(this.sto.Month,"----",this.sto.Year)
    this.masterService.getReport(stoDl.Month, stoDl.Year, stoDl.FunctionCode).subscribe(raw => {
      // console.log(raw)
      this.tempSt = raw
      if(raw.length > 0){
        this.excelService.exportAsExcelFile(raw, "export_raw");
      }else{
        this.toasterService.error("Null Data and Not Scanned");
      }
      this.lock = false;
    })

    // this.transactService.getCurrentPosition({ ReceiverFunction: stoDl.FunctionCode }).subscribe(res => {
    //   // console.log(this.listSto)
    //   res.forEach(element => {
    //     element.STONumber = stoDl.STOCode
    //   });
      
    //   console.log(this.tempSt)
    //   this.excelService.exportAsExcelFile(res, "report_"+stoDl.STOCode);
    // })


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
