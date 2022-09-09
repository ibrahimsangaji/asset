import { Pipe, PipeTransform } from '@angular/core';
import * as SecureLS from 'secure-ls';

@Pipe({
  name: 'frack'
})
export class FrackPipe implements PipeTransform {
  ls = new SecureLS();
  transform(value: Array<any>, args?: any): any {
    value = this.ls.get('mrack');
    return value.find(f=>f.RackCode == args);
  }

}
