import { Pipe, PipeTransform } from '@angular/core';
declare var emojione : any;

@Pipe({name: 'emoji'})
export class EmojiPipe implements PipeTransform {
  transform(value: string): string {
    return emojione.toImage(value);
  }
}
