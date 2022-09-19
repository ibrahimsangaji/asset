import { Component, OnInit } from '@angular/core';
import * as SecureLS from 'secure-ls';
import { MasterService } from 'src/app/services/master.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
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
  search:string="";
  showCol = ["FunctionCode", "Name", "l_Name"];
  code = "";
  OldCode = "";
  name = "";
  message = "";
  hasError = false;
  @BlockUI('form-block') blockUIList: NgBlockUI;
  constructor(private masterService: MasterService,private toasterService:ToastrService) { }

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
      this.functions = res;
      this.functionsOri = res;
      this.blockUIList.stop();
    })
  }
  onSearch(){
    setTimeout(() => {
      this.functions = this.functionsOri.filter(f=>f.FunctionCode.indexOf(this.search.toUpperCase()) > -1);
    }, 100);
    
  }
  resetFilter(){
    this.search = "";
    this.functions = this.functionsOri;
  }
  restView(){
    this.OldCode = "";
    this.search = "";
    this.functions = this.functionsOri;
  }

  submit() {
    this.code = this.code.toUpperCase();
    var cekTemp = 0;
    console.log(this.code)
    console.log(this.name)
    var tempcode = this.functionsOri.find(m=> m.FunctionCode == this.code)

    if(this.functionsOri.find(m => m.Name === this.name && m.FunctionCode === this.code || m.FunctionCode === this.OldCode) || tempcode != undefined){
      this.toasterService.warning("Data already exist!");
      this.search = this.code;
      this.onSearch();
      return ;
    } else if (this.functionsOri.find(m => m.Name === this.name && m.FunctionCode != this.code)) {
      cekTemp = 1;
    } else if (this.functionsOri.find(m => m.Name != this.name && m.FunctionCode === this.code)) {
    } else {
      cekTemp = 1;
    }

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
          this.masterService.updateFunctionNew({ Id: ck[0].Id ,Name: this.name, FunctionCode: this.code, LocationCode: this.locCode, OldCode : this.OldCode, UpdateDate : dateUpdate, UpdateBy : null }).subscribe(res => {
            if (res.success) {
              this.OldCode = "";
              this.code = "";
              this.name = "";
              this.locCode = "";
              this.functions = [];
              this.toasterService.success("Data updated!");
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
              this.fetchData();
            }
          })
        }
      })
    } else {
      this.masterService.getFunctionsCriteria({ FunctionCode: this.code }).subscribe(ck => {
        if (ck[0]) {
          this.masterService.putFunctions({ Name: this.name, FunctionCode: this.code, LocationCode: this.locCode, UpdateDate : dateUpdate, UpdateBy : null }).subscribe(res => {
            if (res.success) {
              this.OldCode = "";
              this.code = "";
              this.name = "";
              this.locCode = "";
              this.functions = [];
              this.toasterService.success("Data updated!");
              this.fetchData();
            }
          })
        }
      })
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
    let func = this.functions.find(m => m.FunctionCode === obj.find(f => f.key === "FunctionCode").value);
    this.OldCode = func.FunctionCode;
    this.code = func.FunctionCode;
    this.name = func.Name;
    this.locCode = func.LocationCode;
  }

}
