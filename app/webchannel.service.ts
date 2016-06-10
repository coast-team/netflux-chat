import { Injectable } from '@angular/core';

@Injectable()
export class WebChannelService{
  webChannels = [];
  keys = [];
  urls = [];
  activeChannel : number;



  addWebChannel(channel:any,key:string,url:string){
    this.webChannels.push(channel);
    this.keys.push(key);
    this.urls.push(url);
    return this.webChannels.length-1;
  }

  getWebChannel(id:number){
    return this.webChannels[id];
  }

  getAccessData(id:number){
    return {key: this.keys[id], url: this.urls[id]};
    /**
    if(!this.webChannels[id].isOpen()){
       console.log('OpenForJoining');
       return this.webChannels[id].openForJoining();
     }
    else{
      console.log('getAccess');
      return Promise.resolve(this.webChannels[id].getAccess());
    }
    **/
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
