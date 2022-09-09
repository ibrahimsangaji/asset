import { Component, OnInit, Input } from '@angular/core';
import { TransactService } from 'src/app/services/transact.service';

@Component({
  selector: 'app-viewasset',
  templateUrl: './viewasset.component.html',
  styleUrls: ['./viewasset.component.less']
})
export class ViewassetComponent implements OnInit {
  @Input() assetnumbersap: string;
  @Input() gino: string;
  assets = [];
  constructor(private transactService:TransactService) { }

  ngOnInit() {
    this.transactService.getAssetOutDetailCriteria({GINo:this.gino}).subscribe(res=>{
      this.assets = res;
    })
  }
}
