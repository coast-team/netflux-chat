import { Pipe, PipeTransform } from '@angular/core';
declare var marked : any;

@Pipe({name: 'marked'})
export class MarkedPipe implements PipeTransform {
  transform(value: string): string {
    let ret = value;
    if(value!=undefined) ret = marked(value);
    return ret;
  }
}
