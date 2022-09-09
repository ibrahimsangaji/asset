import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactRoutingModule } from './transact-routing.module';
import { ApprovalComponent } from './approval/approval.component';
import { StoComponent } from './sto/sto.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';
import { ReceiveComponent } from './receive/receive.component';
import { IssueComponent } from './issue/issue.component';
import { ReceivebaseComponent } from './receivebase/receivebase.component';
import { ReturnComponent } from './return/return.component';
import { MyDatePickerModule } from 'mydatepicker';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ViewassetComponent } from './viewasset/viewasset.component';
import { ViewassetdetailComponent } from './viewassetdetail/viewassetdetail.component';
import {SharedModule} from '../shared/shared.module';
import { SetupstoComponent } from './setupsto/setupsto.component';
import { MutationComponent } from './mutation/mutation.component';
import { GihistoryComponent } from './gihistory/gihistory.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FfunctionsPipe } from '../pipes/ffunctions.pipe';
@NgModule({
  declarations: [ApprovalComponent, StoComponent, ReceiveComponent,
    IssueComponent, ReceivebaseComponent, ReturnComponent,
    ViewassetComponent,
    ViewassetdetailComponent,
    SetupstoComponent,
    MutationComponent,
    GihistoryComponent],
  imports: [
    CommonModule,
    TransactRoutingModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    BlockUIModule.forRoot({
      message: 'Please wait'
    }),
    MyDatePickerModule,
    ZXingScannerModule,
    SharedModule
  ],
  providers: [
    FfunctionsPipe
  ]
})
export class TransactModule { }
