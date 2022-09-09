import { Component, OnInit, Input } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';
import { Asset } from 'src/app/models';

@Component({
  selector: 'app-viewassetdetail',
  templateUrl: './viewassetdetail.component.html',
  styleUrls: ['./viewassetdetail.component.less']
})
export class ViewassetdetailComponent implements OnInit {
  @Input() assetnumber: string;
  asset:Asset=new Asset();
  constructor(private masterService:MasterService) { }

  ngOnInit() {
    this.masterService.getAssetCriteria({AssetNumber:this.assetnumber}).subscribe(res=>{
      if(res[0])
        this.asset = res[0];
    })
  }
}
