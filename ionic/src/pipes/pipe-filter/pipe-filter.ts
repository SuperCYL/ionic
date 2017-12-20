import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PipeFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'pipeFilter',
})
export class PipeFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    value = value + '';
    if(value.indexOf("-") !== -1){
      return value.replace(/-/, "")
    }
  }
}
