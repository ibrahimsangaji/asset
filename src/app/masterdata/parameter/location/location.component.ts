import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.less']
})
export class LocationComponent implements OnInit {
  code: string = "";
  name: string = "";
  locCode = "";
  locations = [];
  locationsOri = [];
  search:string="";
  showCol = ["LocationCode", "Name", "CategoryLocation"];
  message = "";
  hasError = false;
  @BlockUI('form-block') blockUIList: NgBlockUI;
  constructor(private masterService: MasterService,private toasterService:ToastrService) { }

  ngOnInit() {
    this.fetchData();
  }
  
  fetchData() {
    this.blockUIList.start();
    this.masterService.getAllLocation().subscribe(res => {
      this.locations = res;
      this.locationsOri = res;
      this.locationsOri.forEach(element => { })
      this.blockUIList.stop();
    })
  }
  
  onSearch(){
    setTimeout(() => {
      this.locations = this.locationsOri.filter(f=>f.Name.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    }, 100);
  }

  resetFilter(){
    this.search = "";
    this.locations = this.locationsOri;
  }

  submit() {
    if ((this.name === "" || this.name == null) || (this.locCode === "" || this.locCode == null)){
      this.toasterService.error("Location name and location catrgory must be full filled!");
      return;
    }
    
      this.masterService.getAllLocationbyNameAndCode({Name : this.name, LocCode : this.locCode}).subscribe(resFind => {
        console.log(resFind[0])
        if(resFind[0]) {
          this.toasterService.warning("Data already exist!");
          this.search = this.name;
          this.onSearch();
          return ;
        }else{
          console.log('else namcod')
          if ((this.name === "" || this.name == null) && (this.locCode === "" || this.locCode == null)){
            this.toasterService.error("Location name must be full filled!");
            return;
          }

          this.blockUIList.start();
          this.masterService.getLocationCriteria({ LocationCode: this.code }).subscribe(ck => {
            console.log(ck)
            console.log(ck[0])
            if (ck[0]) {
              this.masterService.putLocation({ Name: this.name, LocationCode: this.code, LocCat: this.locCode }).subscribe(res => {
                if (res.success) {
                  this.code = "";
                  this.name = "";
                  this.locCode = "";
                  this.locations = [];
                  this.toasterService.success("Data updated!");
                  this.fetchData();
                }
              })
            } else {
              this.masterService.postLocation({ Name: this.name, LocationCode: this.code, LocCat: this.locCode }).subscribe(res => {
                if (res[0]) {
                  this.code = "";
                  this.name = "";
                  this.locCode = "";
                  this.locations = [];
                  this.toasterService.success("Data inserted!");
                  this.fetchData();
                }
              })
            }
          })

        }
      })
    
    
    // if ((this.name === "" || this.name == null) && (this.locCode === "" || this.locCode == null)){
    //   this.toasterService.error("Location name must be full filled!");
    //   return;
    // }

    // this.blockUIList.start();
    // this.masterService.getLocationCriteria({ LocationCode: this.code }).subscribe(ck => {
    //   if (ck[0]) {
    //     this.masterService.putLocation({ Name: this.name, LocationCode: this.code, LocCat: this.locCode }).subscribe(res => {
    //       if (res.success) {
    //         this.code = "";
    //         this.name = "";
    //         this.locCode = "";
    //         this.locations = [];
    //         this.toasterService.success("Data updated!");
    //         this.fetchData();
    //       }
    //     })
    //   } else {
    //     this.masterService.postLocation({ Name: this.name, LocationCode: this.code, LocCat: this.locCode }).subscribe(res => {
    //       if (res[0]) {
    //         this.code = "";
    //         this.name = "";
    //         this.locCode = "";
    //         this.locations = [];
    //         this.toasterService.success("Data inserted!");
    //         this.fetchData();
    //       }
    //     })
    //   }
    // })
  }

  clear() {
    this.code = "";
    this.name = "";
    this.locCode = "";
    this.search = "";
  }

  acceptCode(obj) {
    let loc = this.locations.find(m => m.LocationCode === obj.find(f => f.key === "LocationCode").value);
    this.code = loc.LocationCode;
    this.name = loc.Name;
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
