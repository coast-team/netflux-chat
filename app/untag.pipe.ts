import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'untag'})
export class UntagPipe implements PipeTransform {
  transform(value: string): string {
    let ret=value;
    if(ret!=undefined) ret = ret.replace(/</g,'&lt;');
    return ret;
  }
}
