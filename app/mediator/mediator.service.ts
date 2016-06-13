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

  create(sigAddress : string = 'ws://sigver-coastteam.rhcloud.com:8000'){ // ws://'+location.hostname+':8000
    let wc = new netflux.WebChannel({signaling: sigAddress});
    let self = this;
    let f = (obj)=>{
      console.log('obj : ',obj);
      self.key = obj.key;
      alert('key = ' + self.key);
      self.wcs.setActiveChannel(self.wcs.addWebChannel(wc,self.key,sigAddress));
    };
    wc.openForJoining().then(f);

    //define webChannel.onJoining and others ...
    this.config(wc);
    // ************ //
    let pseudo = localStorage.getItem("netflux-chat-nickname");
    if(pseudo === null) pseudo = 'Default '+wc.myId;
    let id = localStorage.getItem("netflux-chat-id");
    if(id === null){
      id = wc.myId;
      localStorage.setItem("netflux-chat-id",id);
    }

    this.userService.setCurrentUserId(id);

    this.userService.addUser(new User(id,wc.myId,pseudo));
    this.messageService.appendMessage({fromIdUser : "0",toIdUser : "0", content : "Welcome to the chat !", date :new Date().getTime()});

    console.log('WC créé.');
  }

  join(key:string, sigAddress : string = 'ws://sigver-coastteam.rhcloud.com:8000'){//default address ws://192.168.0.102:8081
    let wc = new netflux.WebChannel({signaling: sigAddress});
    this.key=key;

    this.config(wc);


    let self = this;
    wc.join(key).then(function () {

        let pseudo = localStorage.getItem("netflux-chat-nickname");
        if(pseudo === null) pseudo = 'Default '+wc.myId;
        let id = localStorage.getItem("netflux-chat-id");
        if(id === null){
          id = wc.myId;
          localStorage.setItem("netflux-chat-id",id);
        }

        self.userService.setCurrentUserId(id);
        self.userService.addUser(new User(id,wc.myId,pseudo));
        wc.channels.forEach(function(value) {
          //onJoining(value.peerId) need to define onJoining
          wc.onJoining(value.peerId);
        })
        self.messageService.queryForHistory();
        self.userService.queryForUsers();
        self.userService.sendUserInfos();
      });
    this.wcs.setActiveChannel(this.wcs.addWebChannel(wc,key,sigAddress));
  }

  config(wc:any){
    let self = this;


    let onJoining = (id:string)=>{/**
      self.userService.addUser({id:id,nickname:"Default "+id,peerId:id,online:true});

      wc.sendTo(parseInt(id),JSON.stringify({type:"requestNickname",data:{requester:wc.myId}}));
      **/
    }

    let onMessage = (id:string, data: string, isBroadcast:boolean)=>{
      let receive = JSON.parse(data);
      let type = receive.type;
      let data2 = receive.data;
      console.log('data recu ',data2);
      switch(type){
        case "message" ://{fromIdUser:string (id), toIdUser:string (id, 0 if broadcast), content:string, date:Date}
          self.messageService.insertMessage(Message.fromJSON(data2));
          break;
        case "updateNickname": // {id:string, nickname:string}
          self.userService.updateNickname(data2);
          break;
        case "requestNickname":// {requester: string}
          self.userService.sendNickname(data2);
          console.log('Working on requestNickname');
          break;
        case "queryForHistory":
          self.messageService.sendHistory(id,data2);
          break;
        case "userInfos":
          self.userService.addUser(data2);
          break;
        case "queryForUsers":
          self.userService.sendUsers(data2);
          break;
        default : console.log("Not yet implemeted.");
      }
    }

    let onLeaving = (id:string)=>{
      self.userService.removeUser(id);
      console.log('Onleaving(id) : ',id);
    };
    let onClose = (id:string)=>{
      self.userService.removeUser(id);
      console.log('OnClose(id) : ',id);
    }

    wc.onJoining = onJoining;
    wc.onLeaving = onLeaving;
    wc.onMessage = onMessage;
    wc.onClose = onClose;
  }
/**
  leave(){
    this.webChannel.leave();
    //TODO
  }**/
}
