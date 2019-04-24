import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args !== undefined) {
      const argsSplit = args.split('-');
      const min = parseInt(argsSplit[0], 10);
      const max = parseInt(argsSplit[1], 10);
      return value.filter((res: any) => {
        const priceVal = parseInt(res.price.split('$').pop(), 10);
        if (priceVal <= max && priceVal >= min) {
          return res;
        }
      });
    } else {
      return value;
    }
  }

}
