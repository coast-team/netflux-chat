import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'nl2br'})
export class nl2brPipe implements PipeTransform {
  transform(value: string): string {
    let ret=value;
    if(ret!=undefined) ret = ret.replace(/([^(</p>)])(\r\n|\n|\r)/gm, "$1<br />");
    return ret;
  }
}
