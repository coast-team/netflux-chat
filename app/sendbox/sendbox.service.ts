import { Injectable } from '@angular/core';
import { WebChannelService } from '../webchannel.service';

@Injectable()
export class SendBox {

  constructor(public wcs:WebChannelService){}

  sendFormat(data:any, type:string){
    switch(type){
      case 'message' :
        let wc = this.wcs.getWebChannel(this.wcs.getActiveChannel());
        let toSend = JSON.stringify({type:type, data:data});
        wc.send(toSend);
        console.log('Envoie de : ', data);
        break;
      default : console.log('Not yet implemented');
    }
  }
}
