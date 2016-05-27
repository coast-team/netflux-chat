import { MessageService } from '../message/service/message.service';
import { UserService } from '../user/service/user.service';
import { User } from '../user/model/user';
import { Message } from '../message/model/message';

import { Injectable } from '@angular/core';

declare var netflux:any;

export class MediatorService{
  constructor(public userService : UserService, public messageService:MessageService){};

  webChannel: any;
  key: string;

  create(sigAddress : string = 'ws://192.168.0.102:8081'){ //default address
    this.webChannel = new netflux.WebChannel({signaling: sigAddress});
    this.key = this.webChannel.openForJoining();
    //define webChannel.onJoining and others ...

  }

  join(key:string, sigAddress : string = 'ws://192.168.0.102:8081'){
    this.webChannel = new netflux.WebChannel({signaling: sigAddress});
    this.key=key;
    //define webChannel.onJoining and others ...

    this.webChannel.join(key)
    .then(function (wc) {
        this.webChannel.channels.forEach(function(value) {
          //onJoining(value.peerId) need to define onJoining
        })
      })
  }

  leave(){
    this.webChannel.leave();
    //TODO
  }

  //TODO : onJoining, onLeaving, onMessage ...
  onJoining(id:string){
    //request nickname
    let name = "Default "+ this.userService.users.length;
    this.userService.addUser({id:id,nickname:name,peerId:id,online:true});
  }

  onLeaving(id:string){

  }

  onMessage(id:string, msg: string){

  }

}
