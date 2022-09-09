import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MasterdataRoutingModule } from './masterdata-routing.module';
import { AssetmaintainComponent } from './assetmaintain/assetmaintain.component';
import { BlockUIModule } from 'ng-block-ui';
import {SharedModule} from '../shared/shared.module';
import { ParameterComponent } from './parameter/parameter.component';
import { TypeComponent } from './parameter/type/type.component';
import { BrandComponent } from './parameter/brand/brand.component';
import { LocationComponent } from './parameter/location/location.component';
import { RackComponent } from './parameter/rack/rack.component';
import { FunctionComponent } from './parameter/function/function.component';
import { ComtableComponent } from './parameter/comtable/comtable.component';
import { SoftwareComponent } from './parameter/software/software.component';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    AssetmaintainComponent, ParameterComponent, TypeComponent, BrandComponent, LocationComponent, RackComponent, FunctionComponent, ComtableComponent, SoftwareComponent],
  imports: [
    CommonModule,
    MasterdataRoutingModule,
    BlockUIModule.forRoot({
      message: 'Please wait'
    }),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule
  ]
})
export class MasterdataModule { }
