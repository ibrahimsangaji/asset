import { Pipe, PipeTransform } from '@angular/core';
import * as SecureLS from 'secure-ls';
@Pipe({
  name: 'fbrand'
})
export class FbrandPipe implements PipeTransform {
  ls = new SecureLS();
  transform(value: Array<any>, args?: any): any {
    value = this.ls.get('mbrand');
    return value.find(f=>f.BrandCode == args);
  }

}
