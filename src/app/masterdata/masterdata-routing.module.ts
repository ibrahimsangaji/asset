import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetmaintainComponent } from './assetmaintain/assetmaintain.component';
import { ClarityModule } from '@clr/angular';
import { ParameterComponent } from './parameter/parameter.component';
import { TypeComponent } from './parameter/type/type.component';
import { BrandComponent } from './parameter/brand/brand.component';
import { RackComponent } from './parameter/rack/rack.component';
import { LocationComponent } from './parameter/location/location.component';
import { FunctionComponent } from './parameter/function/function.component';
import { SoftwareComponent } from './parameter/software/software.component';

const routes: Routes = [
  {
    path: 'maintain',
    component: AssetmaintainComponent
  },
  {
    path: 'parameter',
    component: ParameterComponent,
    children: [
      {
        path: 'type',
        data: { state: 'type' },
        component: TypeComponent
      },
      {
        path: 'brand',
        data: { state: 'brand' },
        component: BrandComponent
      },
      {
        path: 'rack',
        data: { state: 'rack' },
        component: RackComponent
      },
      {
        path: 'location',
        data: { state: 'location' },
        component: LocationComponent
      },
      {
        path: 'function',
        data: { state: 'function' },
        component: FunctionComponent
      }
      ,
      {
        path: 'sw',
        data: { state: 'software' },
        component: SoftwareComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,ClarityModule]
})
export class MasterdataRoutingModule { }
