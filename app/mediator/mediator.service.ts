import { MessageService } from '../message/service/message.service';
import { UserService } from '../user/service/user.service';
import { User } from '../user/model/user';
import { Message } from '../message/model/message';
import { WebChannelService } from '../webchannel.service';
import { Injectable } from '@angular/core';


declare var netflux:any;

@Injectable()
export class MediatorService{
  constructor(public userService : UserService, public messageService : MessageService, public wcs:WebChannelService){};


  key: string;

  create(sigAddress : string = 'ws://'+location.hostname+':8000'){ //default address ws://192.168.0.102:8081
    let wc = new netflux.WebChannel({signaling: sigAddress});
    let f = (obj)=>{
      console.log('obj : ',obj);
      this.key = obj.key;
      alert('key = ' + this.key);
    };
    wc.openForJoining().then(f);

    //define webChannel.onJoining and others ...
    this.config(wc);
    // ************ //
    this.userService.setCurrentUserId(wc.myId);
    this.userService.addUser({id:wc.myId, peerId : wc.myId, nickname:'Default '+wc.myId,online:true});
    this.wcs.setActiveChannel(this.wcs.addWebChannel(wc));
    console.log('WC créé.');
  }

  join(key:string, sigAddress : string = 'ws://'+location.hostname+':8000'){//default address ws://192.168.0.102:8081
    let wc = new netflux.WebChannel({signaling: sigAddress});
    this.key=key;

    this.config(wc);


    let self = this;
    wc.join(key).then(function () {
        self.userService.setCurrentUserId(wc.myId);
        self.userService.addUser({id:wc.myId, peerId : wc.myId, nickname:'Default '+wc.myId,online:true});
        wc.channels.forEach(function(value) {
          //onJoining(value.peerId) need to define onJoining
          self.onJoining(value.peerId);
          console.log('Ajout du user : ',value.peerId);
        })
      });
    this.wcs.setActiveChannel(this.wcs.addWebChannel(wc));
  }

  config(wc:any){
    let self = this;
    let onJoining = (id:string)=>{
      //request nickname to do
      let name = "Default "+ id;
      self.userService.addUser({id:id,nickname:name,peerId:id,online:true});
      self.messageService.addMessage({fromIdUser:"0", toIdUser:"0", content: "Default "+id+" is joining.", date : new Date()});
    }

    let onMessage = (id:string, data: string, isBroadcast:boolean)=>{
      let receive = JSON.parse(data);
      let type = receive.type;
      let data2 = receive.data;
      switch(type){
        case "message" :
          let toIdUser = isBroadcast ? self.userService.currentUserId : "0" ;
          console.log('data recu apres from json',Message.fromJSON(data2));
          self.messageService.addMessage(Message.fromJSON(data2));
          break;
        default : console.log("Not yet implemeted.");
      }
    }

    let onLeaving = (id:string)=>{
      self.userService.remUser(id);
      self.messageService.addMessage({fromIdUser:"0", toIdUser:"0", content: "Default "+id+" is leaving.", date : new Date()});
    };

    wc.onJoining = onJoining;
    wc.onLeave = onLeaving;
    wc.onMessage = onMessage;
  }
/**
  leave(){
    this.webChannel.leave();
    //TODO
  }**/

  //TOTEST : onJoining, onLeaving, onMessage ...
  onJoining(id:string){
    //request nickname to do
    let name = "Default "+ id;
    this.userService.addUser({id:id,nickname:name,peerId:id,online:true});
  }

  onLeaving(id:string){
    this.userService.remUser(id);
  }

  onMessage(id:string, data: string, isBroadcast: boolean){
    let toIdUser = isBroadcast ? "0" : this.userService.currentUserId ;

    this.messageService.addMessage({fromIdUser:id, toIdUser:toIdUser, content: data, date : new Date()});
  }

}
