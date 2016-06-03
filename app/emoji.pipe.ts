import { Pipe, PipeTransform } from '@angular/core';
declare var emojione : any;
/*
 * catch emoji in unicode or shortcode like :smile:
 * and return the tag image with css corresponding
 * due to the eomjione library
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({name: 'emoji'})
export class EmojiPipe implements PipeTransform {
  transform(value: string): string {
    return emojione.toImage(value);
  }
}
