import { Pipe, PipeTransform } from '@angular/core';
import * as en from '../../assets/translate/en.json';

@Pipe({
  name: 'customTranslate'
})
export class CustomTranslatePipe implements PipeTransform {

  transform(value: string): unknown {
    // can refactor for the undefined deleting the catch response
    try {
      const data: any = (en as any);
      return data[value];
    } catch (e) {
      return null;
    }
  }

}
