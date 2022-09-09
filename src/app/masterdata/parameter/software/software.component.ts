import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.less']
})
export class SoftwareComponent implements OnInit {
  code: string="";
  name: string="";
  price:number=0;
  sws = [];
  swsOri = [];
  search:string="";
  showCol = ["SWCode", "Name", "Price"];
  @BlockUI('form-block') blockUIList: NgBlockUI;
  constructor(private masterService: MasterService,private toasterService:ToastrService) { }

  ngOnInit() {
    this.fetchData();
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  fetchData() {
    this.blockUIList.start();
    this.masterService.getAllSoftware().subscribe(res => {
      this.sws = res;
      this.swsOri = res;
      this.blockUIList.stop();
    })
  }
  onSearch(){
    setTimeout(() => {
      this.sws = this.swsOri.filter(f=>f.Name.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    }, 100);
    
  }
  resetFilter(){
    this.search = "";
    this.sws = this.swsOri;
  }
  submit() {
    if(this.swsOri.find(m => m.Name === this.name)){
      this.toasterService.warning("Data already exist!");
      this.search = this.name;
      this.onSearch();
      return ;
    };

    if ((this.code === "" || this.code == null) && (this.name === "" || this.name == null)){
      this.toasterService.error("All fields must be full filled!");
      return;
    }
    this.blockUIList.start();
    if (this.code === "" || this.code == null) {
      this.masterService.postSoftware({ Name: this.name, Price:this.price }).subscribe(res => {
        if (res[0]) {
          this.code = "";
          this.price = 0;
          this.name ="";
          this.sws = [];
          this.toasterService.success("Data inserted!");
          this.fetchData();
        }
      })
    } else {
      this.masterService.putSoftware({ Name: this.name, SWCode:this.code, Price:this.price }).subscribe(res => {
        if (res.success) {
          this.code = "";
          this.name ="";
          this.price = 0;
          this.sws = [];
          this.toasterService.success("Data updated!");
          this.fetchData();
        }
      })
    }
  }

  acceptCode(obj) {
    let sw = this.sws.find(m => m.SWCode === obj.find(f => f.key === "SWCode").value);
    this.code = sw.SWCode;
    this.name = sw.Name;
    this.price = sw.Price;
  }

}
