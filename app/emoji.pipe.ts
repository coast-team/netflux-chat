import { Pipe, PipeTransform } from '@angular/core';
declare var emojione : any;

@Pipe({name: 'emoji'})
export class EmojiPipe implements PipeTransform {
  transform(value: string): string {
    let ret = value;
    if(value!=undefined)ret = emojione.toImage(value);
    return ret;
  }
}
