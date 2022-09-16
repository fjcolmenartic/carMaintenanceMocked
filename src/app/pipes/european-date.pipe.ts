import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'EUDate'
})
export class EuropeanDatePipe implements PipeTransform {

  transform(value: string): unknown {

    try {
      const europeanDate = value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');

      return europeanDate;

    } catch(e) {
      return null;
    }
  }

}
