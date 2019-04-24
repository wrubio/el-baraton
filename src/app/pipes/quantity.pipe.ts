import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quantity'
})
export class QuantityPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args !== undefined) {
      const argsSplit = args.split('-');
      const min = parseInt(argsSplit[0], 10);
      const max = parseInt(argsSplit[1], 10);
      return value.filter((res: any) => {
        if (res.quantity <= max && res.quantity >= min) {
          return res;
        }
      });
    } else {
      return value;
    }
  }

}
