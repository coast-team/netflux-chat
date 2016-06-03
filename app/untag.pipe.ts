import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'untag'})
export class UntagPipe implements PipeTransform {
  transform(value: string): string {
    console.log('value : ',value);
    let ret=value;
    ret = ret.replace(/</g,'&lt;');
    console.log('ret : ',ret);
    return ret;
  }
}
