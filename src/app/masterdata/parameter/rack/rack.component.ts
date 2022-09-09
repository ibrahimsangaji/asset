import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-rack',
  templateUrl: './rack.component.html',
  styleUrls: ['./rack.component.less']
})
export class RackComponent implements OnInit {
  code:string="";
  name:string="";
  line="";
  racks=[];
  racksOri = [];
  search:string="";
  showCol=["RackCode","Name","Line"];
  @BlockUI('form-block') blockUIList: NgBlockUI;
  constructor(private masterService:MasterService,private toasterService:ToastrService) { }

  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.blockUIList.start();
    this.masterService.getAllRack().subscribe(res => {
      this.racks = res;
      this.racksOri = res;
      this.blockUIList.stop();
    })
  }
  onSearch(){
    setTimeout(() => {
      this.racks = this.racksOri.filter(f=>f.Name.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    }, 100);
    
  }
  resetFilter(){
    this.search = "";
    this.racks = this.racksOri;
  }
  submit() {
    if(this.racksOri.find(m => m.Name === this.name && m.Line == this.line)){
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
      this.masterService.postRack({ Name: this.name, Line:this.line }).subscribe(res => {
        if (res[0]) {
          this.code = "";
          this.name ="";
          this.racks = [];
          this.toasterService.success("Data inserted!");
          this.fetchData();
        }
      })
    } else {
      this.masterService.putRack({ Name: this.name, RackCode:this.code, Line:this.line }).subscribe(res => {
        if (res.success) {
          this.code = "";
          this.name ="";
          this.racks = [];
          this.toasterService.success("Data updated!");
          this.fetchData();
        }
      })
    }
  }
  acceptCode(obj){
    let rack = this.racks.find(m => m.RackCode === obj.find(f=>f.key==="RackCode").value);
    this.code = rack.RackCode;
    this.name = rack.Name;
    this.line = rack.Line;
  }

}
