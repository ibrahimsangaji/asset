import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovalComponent } from './approval/approval.component';
import { StoComponent } from './sto/sto.component';
import { ClarityModule } from '@clr/angular';
import { ReceivebaseComponent } from './receivebase/receivebase.component';
import { IssueComponent } from './issue/issue.component';
import { SetupstoComponent } from './setupsto/setupsto.component';
import { MutationComponent } from './mutation/mutation.component';
import { GihistoryComponent } from './gihistory/gihistory.component';

const routes: Routes = [
  {
    path: 'receive',
    component: ReceivebaseComponent
  },
  {
    path: 'approval',
    component: ApprovalComponent
  },
  {
    path: 'sto',
    component: StoComponent
  },
  {
    path: 'sto-setup',
    component: SetupstoComponent
  },
  {
    path: 'issue',
    component: IssueComponent
  },
  {
    path: 'mutation',
    component: MutationComponent
  },
  {
    path: 'gihistory',
    component: GihistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ClarityModule]
})
export class TransactRoutingModule { }
