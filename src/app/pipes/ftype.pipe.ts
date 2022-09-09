import { Pipe, PipeTransform } from '@angular/core';
import * as SecureLS from 'secure-ls';

@Pipe({
  name: 'ftype'
})
export class FtypePipe implements PipeTransform {
  ls = new SecureLS();
  transform(value: Array<any>, args?: any): any {
    value = this.ls.get('mtype');
    return value.find(f=>f.TypeCode == args);
  }

}
