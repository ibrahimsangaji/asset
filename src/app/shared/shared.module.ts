import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbrandPipe } from '../pipes/fbrand.pipe';
import { FlocationPipe } from '../pipes/flocation.pipe';
import { FrackPipe } from '../pipes/frack.pipe';
import { FtypePipe } from '../pipes/ftype.pipe';
import { FassetstatusPipe } from '../pipes/fassetstatus.pipe';
import { FfunctionsPipe } from '../pipes/ffunctions.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CurrencyMaskModule } from "ng2-currency-mask";
@NgModule({
  declarations: [FbrandPipe,
    FlocationPipe,
    FrackPipe,
    FtypePipe,
    FassetstatusPipe,
    FfunctionsPipe],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    CurrencyMaskModule 
  ],
  exports: [FbrandPipe,
    FlocationPipe,
    FrackPipe,
    FtypePipe,
    FassetstatusPipe,
    FfunctionsPipe,
    ToastrModule,
    CurrencyMaskModule 
  ]
})
export class SharedModule { }
