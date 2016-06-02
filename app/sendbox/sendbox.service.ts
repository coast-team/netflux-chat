import { Injectable } from '@angular/core';
import { WebChannelService } from '../webchannel.service';

@Injectable()
export class SendBox {

  constructor(public wcs:WebChannelService){}

  sendFormat(data:any, type:string, id:string){
    let wc = this.wcs.getWebChannel(this.wcs.getActiveChannel());
    let toSend : any;
    toSend = JSON.stringify({type:type, data:data});
    if(id === '0'){
      wc.send(toSend);
    }else{
      wc.sendTo(parseInt(id),toSend);
    }

  }
}
