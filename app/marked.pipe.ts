import { Pipe, PipeTransform } from '@angular/core';
declare var marked : any;

@Pipe({name: 'marked'})
export class MarkedPipe implements PipeTransform {
  transform(value: string): string {
    return marked(value);
  }
}
