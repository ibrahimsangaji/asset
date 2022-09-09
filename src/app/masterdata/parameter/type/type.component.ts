import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.less']
})
export class TypeComponent implements OnInit {
  code:string="";
  name:string="";
  types=[];
  typesOri = [];
  search:string="";
  showCol=["TypeCode","Name"];
  @BlockUI('form-block') blockUIList: NgBlockUI;
  constructor(private masterService:MasterService,private toasterService:ToastrService) { }

  ngOnInit() {
    this.fetchData()
  }
  fetchData() {
    this.blockUIList.start();
    this.masterService.getAllType().subscribe(res => {
      this.types = res;
      this.typesOri = res;
      this.blockUIList.stop();
    })
  }
  onSearch(){
    setTimeout(() => {
      this.types = this.typesOri.filter(f=>f.Name.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    }, 100);
    
  }
  resetFilter(){
    this.search = "";
    this.types = this.typesOri;
  }
  submit() {
    if(this.typesOri.find(m => m.Name === this.name)){
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
      this.masterService.postType({ Name: this.name }).subscribe(res => {
        if (res[0]) {
          this.code = "";
          this.name ="";
          this.types = [];
          this.fetchData();
        }
      })
    } else {
      this.masterService.putType({ Name: this.name, TypeCode:this.code }).subscribe(res => {
        if (res.success) {
          this.code = "";
          this.name ="";
          this.types = [];
          this.fetchData();
        }
      })
    }
  }
  acceptCode(obj){
    let typ = this.types.find(m => m.TypeCode === obj.find(f=>f.key==="TypeCode").value);
    this.code = typ.TypeCode;
    this.name = typ.Name;
  }
}
