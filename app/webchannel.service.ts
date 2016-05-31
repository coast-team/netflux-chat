import { Injectable } from '@angular/core';

@Injectable()
export class WebChannelService{
  webChannels = [];
  activeChannel : number;



  addWebChannel(channel:any){
    this.webChannels.push(channel);
    return this.webChannels.length-1;
  }

  getWebChannel(id:number){
    return this.webChannels[id];
  }

  setActiveChannel(id:number){
    this.activeChannel = id;
  }

  getActiveChannel(){
    return this.activeChannel;
  }

/**
  getAllOpen(){

  }
  **/
}
