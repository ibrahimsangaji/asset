import { Pipe, PipeTransform } from '@angular/core';
import * as SecureLS from 'secure-ls';
@Pipe({
  name: 'ffunctions'
})
export class FfunctionsPipe implements PipeTransform {
  ls = new SecureLS();
  transform(value: Array<any>, args?: any): any {
    value = this.ls.get('mfunctions');
    return value.find(f=>f.FunctionCode == args);
  }

}
