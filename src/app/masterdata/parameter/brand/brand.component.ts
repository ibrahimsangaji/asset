import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.less']
})
export class BrandComponent implements OnInit {
  code: string="";
  name: string="";
  brands = [];
  brandsOri = [];
  search:string="";
  showCol = ["BrandCode", "Name"];
  @BlockUI('form-block') blockUIList: NgBlockUI;
  constructor(private masterService: MasterService,private toasterService:ToastrService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.blockUIList.start();
    this.masterService.getAllBrand().subscribe(res => {
      this.brands = res;
      this.brandsOri = res;
      this.blockUIList.stop();
    })
  }
  onSearch(){
    setTimeout(() => {
      this.brands = this.brandsOri.filter(f=>f.Name.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    }, 100);
    
  }
  resetFilter(){
    this.search = "";
    this.brands = this.brandsOri;
  }
  submit() {
    if(this.brandsOri.find(m => m.Name === this.name)){
      this.toasterService.warning("Data already exist!");
      this.search = this.name;
      this.onSearch();
      return ;
    };

    if ((this.code === "" || this.code == null) && (this.name === "" || this.name == null)){
      this.toasterService.error("All fields must be full filled!");
      return;
    }
    if (this.code === "" || this.code == null) {
      this.blockUIList.start();
      this.masterService.postBrand({ Name: this.name }).subscribe(res => {
        if (res[0]) {
          this.code = "";
          this.name ="";
          this.brands = [];
          this.toasterService.success("Data inserted!");
          this.fetchData();
        }
      })
    } else {
      this.blockUIList.start();
      this.masterService.putBrand({ Name: this.name, BrandCode:this.code }).subscribe(res => {
        if (res.success) {
          this.code = "";
          this.name ="";
          this.brands = [];
          this.toasterService.success("Data updated!");
          this.fetchData();
        }
      })
    }
  }

  acceptCode(obj) {
    let brand = this.brands.find(m => m.BrandCode === obj.find(f => f.key === "BrandCode").value);
    this.code = brand.BrandCode;
    this.name = brand.Name;
  }

}
