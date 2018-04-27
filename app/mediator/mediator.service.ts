import { MessageService } from '../message/service/message.service';
import { UserService } from '../user/service/user.service';
import { User } from '../user/model/user';
import { Message } from '../message/model/message';
import { WebChannelService } from '../webchannel.service';
import { Injectable } from '@angular/core';
import { WebGroup, WebGroupState } from 'netflux/dist/esm/index.browser';

declare var BootstrapDialog:any;

const webGroupConfig = {
  signalingURL: 'wss://signaling.netflux.coedit.re',
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302'
    }
  ]
}

@Injectable()
export class MediatorService{
  constructor(public userService : UserService, public messageService : MessageService, public wcs:WebChannelService){};

  key: string;

  create(sigAddress : string = 'ws://sigver-coastteam.rhcloud.com:8000'){ // ws://'+location.hostname+':8000
    let wc = new WebGroup(webGroupConfig);
    let self = this;
    wc.onStateChange = (state: WebGroupState) => {
      if (state === (WebGroupState as any).JOINED) {
        self.key = wc.key;
        BootstrapDialog.show({
            title: 'Chat infos',
            message: 'Key: "'+self.key+'"<br>Signaling server : "'+sigAddress+'"',
            closable: true, // <-- Default value is false
            draggable: true, // <-- Default value is false
            buttons: [{
                        id: 'btn-ok',
                        label: 'OK',
                        cssClass: 'btn-primary',
                        autospin: false,
                        action: function(dialogRef){
                            dialogRef.close();
                        }
                    }
                  ]
        });
        self.wcs.setActiveChannel(self.wcs.addWebChannel(wc,self.key,sigAddress));
      } else if (state === (WebGroupState as any).LEFT) {
        (id: number)=>{
          self.userService.removeUser(self.userService.getIdFromPeerId(id + ''));
          console.log('OnClose(id) : ',self.userService.getIdFromPeerId(id + ''));
        }
      }
    }

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

    this.userService.addUser(new User(id,wc.myId + '',pseudo));
    this.messageService.appendMessage({fromIdUser : "0",toIdUser : "0", content : "Welcome to the chat !", date :new Date().getTime()});
    wc.join()
    console.log('WC créé.');
  }

  join(key:string, sigAddress : string = 'ws://sigver-coastteam.rhcloud.com:8000'){//default address ws://192.168.0.102:8081
    let wc = new WebGroup(webGroupConfig);
    this.key=key;

    this.config(wc);


    let self = this;
    wc.onStateChange = (state: WebGroupState) => {
      if (state === (WebGroupState as any).JOINED) {
        let pseudo = localStorage.getItem("netflux-chat-nickname");
        if(pseudo === null) pseudo = 'Default '+wc.myId;
        let id = localStorage.getItem("netflux-chat-id");
        if(id === null){
          id = wc.myId;
          localStorage.setItem("netflux-chat-id",id);
        }

        self.userService.setCurrentUserId(id);
        self.userService.addUser(new User(id,wc.myId + '',pseudo));
        /**
        wc.channels.forEach(function(value) {
          //onJoining(value.peerId) need to define onJoining
          wc.onJoining(value.peerId);
        })**/
        self.messageService.queryForHistory();
        self.userService.queryForUsers();
        self.userService.sendUserInfos();
        self.wcs.setActiveChannel(self.wcs.addWebChannel(wc,self.key,sigAddress));
      } else if (state === (WebGroupState as any).LEFT) {
        (id: number)=>{
          self.userService.removeUser(self.userService.getIdFromPeerId(id + ''));
          console.log('OnClose(id) : ',self.userService.getIdFromPeerId(id + ''));
        }
      }
    };
    wc.join(key)
  }

  config(wc: WebGroup){
    let self = this;
    let onJoining = (id: number)=>{
      /**
      self.userService.addUser({id:id,nickname:"Default "+id,peerId:id,online:true});

      wc.sendTo(parseInt(id),JSON.stringify({type:"requestNickname",data:{requester:wc.myId}}));
      **/
    }

    let onMessage = (id: number, data: string, isBroadcast:boolean)=>{
      let receive = JSON.parse(data);
      let type = receive.type;
      let data2 = receive.data;
      console.log('data recu ',data2);
      switch(type){
        case "message" ://{fromIdUser:string (id), toIdUser:string (id, 0 if broadcast), content:string, date:number}
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
          self.messageService.sendHistory(id + '',data2);
          break;
        case "userInfos": // {{id: "3180763113", peerId: 3180763113, nickname: "Thomas :smiley_cat:", online: true}}
          self.userService.addUser(data2);
          break;
        case "queryForUsers":
          self.userService.sendUsers(data2);
          break;
        default : console.log("Not yet implemeted.");
      }
    }

    let onLeaving = (id: number)=>{
      self.userService.removeUser(self.userService.getIdFromPeerId(id + ''));
      console.log('Onleaving(id) : ',self.userService.getIdFromPeerId(id + ''));
    };

    wc.onMemberJoin = onJoining;
    wc.onMemberLeave = onLeaving;
    wc.onMessage = onMessage;
  }

  leave(){
    let wc = this.wcs.getWebChannel(this.wcs.getActiveChannel());
    wc.leave();
  }
}
