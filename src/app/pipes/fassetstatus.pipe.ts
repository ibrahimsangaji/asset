import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fassetstatus'
})
export class FassetstatusPipe implements PipeTransform {

  transform(value: any): any {
    let retVal = "None";
    switch (value) {
      case 1:
        retVal = "Free";
        break;
      case 2:
        retVal = "Booked";
        break;
      case 3:
        retVal = "Outgoing";
        break;
      case 4:
        retVal = "Damage";
        break;
      case 5:
        retVal = "Repair";
        break;
      case 6:
        retVal = "Lost";
        break;
      default:
        retVal = "None";
    }
    return retVal;
  }

}
