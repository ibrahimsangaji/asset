import { Component, OnInit } from '@angular/core';
import * as SecureLS from 'secure-ls';
import { MasterService } from 'src/app/services/master.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { TransactService } from 'src/app/services/transact.service';
@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.less']
})
export class FunctionComponent implements OnInit {
  locCode = "";
  mLocation = [];
  ls = new SecureLS();
  functions = [];
  functionsOri = [];
  t_functions = [];
  search:string="";
  showCol = ["Division/ProjectCode", "Name", "Status", "l_Name"];
  code = "";
  OldCode = "";
  name = "";
  message = "";
  tempStatus = null;
  RowStatus = null;
  hasError = false;
  @BlockUI('form-block') blockUIList: NgBlockUI;
  constructor(private masterService: MasterService,private toasterService:ToastrService, private transService: TransactService) { }

  ngOnInit() {
    // this.mLocation = this.ls.get('mlocation');
    this.masterService.getAllLocation().subscribe(resLoc => {
      this.mLocation = resLoc
    })
    this.fetchData();
  }
  fetchData() {
    this.blockUIList.start();
    this.masterService.getAllFunctions().subscribe(res => {
      let resNew = []
      res.forEach(element => {
        if(element.RowStatus == 0) {
          var temp = {
            'Division/ProjectCode' : element.FunctionCode,
            'Name'  : element.Name,
            'LocationCode' : element.LocationCode,
            'Status' : "Tidak Aktif"
          }
        } else {
          var temp = {
            'Division/ProjectCode' : element.FunctionCode,
            'Name'  : element.Name,
            'LocationCode' : element.LocationCode,
            'Status' : "Aktif"
          }
        }
        resNew.push(temp)
      });
      this.functions = resNew;
      this.t_functions = resNew;
      this.functionsOri = res;
      console.log(res)
      this.blockUIList.stop();
    })
  }
  onSearch(){
    setTimeout(() => {
      this.functions = this.t_functions.filter(f=>f['Division/ProjectCode'].indexOf(this.search.toUpperCase()) > -1);
    }, 100);
    
  }
  resetFilter(){
    this.search = "";
    this.functions = this.t_functions;
  }
  restView(){
    this.OldCode = "";
    this.search = "";
    this.functions = this.t_functions;
  }
  submit() {
    if(this.RowStatus != this.tempStatus){
      this.transService.getCurrentPosition({ReceiverFunction : this.code}).subscribe(res => {
        if(res.length >= 1){
          this.toasterService.warning("There is an asset in the Division/Project, please clean it first");
          return;
        } else {
          this.succescSubmit();
        }
      })
    }else{
      this.succescSubmit();
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
  acceptCode(obj) {
    console.log(obj)
    let func = this.functions.find(m => m['Division/ProjectCode'] === obj.find(f => f.key === "Division/ProjectCode").value);
    this.OldCode = func['Division/ProjectCode'];
    this.code = func['Division/ProjectCode'];
    this.name = func.Name;
    this.locCode = func.LocationCode;
    this.RowStatus = func.RowStatus;
    this.tempStatus = func.RowStatus;
  }
  succescSubmit(){
    this.code = this.code.toUpperCase();
    var cekTemp = 0;
    if(this.functionsOri.find(m => m.Name === this.name && m.FunctionCode === this.code && m.RowStatus === this.RowStatus)){
      console.log(this.code)
      console.log(this.name)
      var tempcode = this.functionsOri.find(m=> m.FunctionCode == this.code)
      this.toasterService.warning("Data already exist!");
      this.search = this.code;
      this.onSearch();
      return ;
    } else if (this.functionsOri.find(m => m.Name === this.name && m.FunctionCode != this.code)) {
      cekTemp = 1;
    } else if (this.functionsOri.find(m => m.Name != this.name && m.FunctionCode === this.code)) {
    } else { cekTemp = 1; }
  
    if ((this.code === "" || this.code == null) && (this.name === "" || this.name == null) && (this.locCode === "" || this.locCode == null)){
      this.toasterService.error("All fields must be full filled!");
      return;
    }

    if (this.code === "" || this.name === "") {
      this.handleError("Function Code and Name must be defined!");
      return;
    }

    this.blockUIList.start();
    var dateUpdate = moment().format("YYYY-MM-DD HH:mm:ss")

    if (cekTemp == 1) {
        console.log('Code Baru')
        this.masterService.getFunctionsCriteria({ FunctionCode: this.OldCode }).subscribe(ck => {
          if (ck[0]) {
            console.log('updated')
            this.masterService.updateFunctionNew({ Id: ck[0].Id ,Name: this.name, FunctionCode: this.code, LocationCode: this.locCode, OldCode : this.OldCode, UpdateDate : dateUpdate, UpdateBy : null, RowStatus : this.RowStatus }).subscribe(res => {
              if (res.success) {
                this.OldCode = "";
                this.code = "";
                this.name = "";
                this.locCode = "";
                this.functions = [];
                this.OldCode = "";
                this.toasterService.success("Data updated!");
                this.blockUIList.stop();
                this.fetchData();
              }
            })
          } else {
            console.log("insert")
            this.masterService.postFunctions({ Name: this.name, FunctionCode: this.code, LocationCode: this.locCode }).subscribe(res => {
              if (res[0]) {
                this.OldCode = "";
                this.code = "";
                this.name = "";
                this.locCode = "";
                this.functions = [];
                this.toasterService.success("Data inserted!");
                this.blockUIList.stop();
                this.fetchData();
              }
            })
          }
        })
    } else {
      this.masterService.getFunctionsCriteria({ FunctionCode: this.code }).subscribe(ck => {
        if (ck[0]) {
          this.masterService.putFunctions({ Name: this.name, FunctionCode: this.code, LocationCode: this.locCode, UpdateDate : dateUpdate, UpdateBy : null, RowStatus : this.RowStatus }).subscribe(res => {
            if (res.success) {
              this.OldCode = "";
              this.code = "";
              this.name = "";
              this.locCode = "";
              this.functions = [];
              this.toasterService.success("Data updated!");
              this.blockUIList.stop();
              this.fetchData();
            }
          })
        }
      })
    }
  }
}
