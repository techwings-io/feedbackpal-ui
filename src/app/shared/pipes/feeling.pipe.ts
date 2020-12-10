import { Pipe, PipeTransform } from '@angular/core';
import { Feeling } from '../model/feeling.enum';

@Pipe({
  name: 'feeling',
})
export class FeelingPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    let retValue: string;
    switch (+value) {
      case Feeling.ANGRY:
        retValue = '../assets/images/glassy-smiley-red.png';
        break;
      case Feeling.NEUTRAL:
        retValue = '../assets/images/glassy-smiley-amber.png';
        break;
      case Feeling.HAPPY:
        retValue = '../assets/images/glassy-smiley-green.png';
        break;
    }
    return retValue;
  }
}
