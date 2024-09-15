import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter',
  standalone: true
})
export class SearchfilterPipe implements PipeTransform {

  transform(items: any[], searchStr: string, itemType: string): any {
    if (!items || !searchStr) return items;

    if (itemType === 'title') {
      return items.filter(
        (item: any) =>
          item.title.toLowerCase().indexOf(searchStr.toLowerCase()) > -1 
      );
    }
    return items;

  }

}
