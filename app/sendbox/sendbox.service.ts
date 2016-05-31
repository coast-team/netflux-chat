import { Injectable } from '@angular/core';
import { WebChannelService } from '../webchannel.service';

@Injectable()
export class SendBox {

  constructor(public wcs:WebChannelService){}

  sendFormat(content:string, type:string){
    switch(type){
      case 'message' :
        let wc = this.wcs.getWebChannel(this.wcs.getActiveChannel());
        wc.send(content);
        console.log('Envoie de : ', content);
        break;
      default : console.log('Not yet implemented');
    }
  }
}
