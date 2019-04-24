import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args !== undefined) {
      if (args === '') {
        return value;
      }
      const textFind = args.toLowerCase();
      return value.filter((res: any) => {
        if (textFind ===  res.name.toLowerCase()) {
          return res;
        }
      });
    } else {
      return value;
    }
  }

}
