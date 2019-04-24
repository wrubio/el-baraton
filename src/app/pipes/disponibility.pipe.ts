import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'disponibility'
})
export class DisponibilityPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (args !== undefined) {
      if (args) {
        return value.filter((res: any) => {
          if (res.available) {
            return res;
          }
        });
      } else {
        return value;
      }
    } else {
      return value;
    }
  }

}
