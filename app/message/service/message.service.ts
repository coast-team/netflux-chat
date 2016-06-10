import { Injectable, NgZone } from '@angular/core';
import { Message } from '../model/message';
import { MESSAGES } from '../mock-messages';
import { UserService } from '../../user/service/user.service';
import { SendBox } from '../../sendbox/sendbox.service';

import { MessageManager } from '../../MessageManager';
import {MessagesList, TimestampId} from '../../MessagesList';


@Injectable()
export class MessageService{
  messages : MessageManager<TimestampId> = new MessagesList();
  zone: NgZone;
  focus=true;
  constructor(public userService : UserService, public sendbox: SendBox){
    this.zone = new NgZone({enableLongStackTrace: false});
    let self = this;
    document.body.onblur=(e)=>{self.focus=false};
    document.body.onfocus=(e)=>{self.focus=true};
  }

  getMessages(){
    return this.messages.get();
  }

  getLastMessage(){
    if(this.messages.get()[0]===undefined){
      return {fromIdUser:"0",toIdUser:"0",content:'Loading',date:new Date().getTime()};
    }
    return this.messages.get()[this.messages.get().length-1];
  }


  sendMessage(mes: Message){
    this.sendbox.sendFormat(mes,'message',"0");//0 = broadcast
    this.appendMessage(mes);
  }

  audio = new Audio();
  playAudio = true ;

  appendMessage(mes:Message){
    this.zone.run(()=>{
      var chat = document.getElementById('chat');
      var atBottom = chat.scrollTop == (chat.scrollHeight - chat.clientHeight);

      this.messages.append(mes);

      setTimeout(()=>{if(atBottom)chat.scrollTop = chat.scrollHeight;},0);
    });
  }

  insertMessage(mes:Message){
    this.zone.run(()=>{
      var chat = document.getElementById('chat');
      var atBottom = chat.scrollTop == (chat.scrollHeight - chat.clientHeight);

      this.messages.insert({timestamp:mes.date,id:mes.fromIdUser},mes);


      var audio = this.audio;
      if(audio.src === ''){
        audio.src = 'smb_pipe.ogg';
        audio.load();
      }

      if(this.playAudio && !this.focus){
        audio.play();
        this.playAudio = false;
        let self = this;
        setTimeout(()=>{self.playAudio = true; console.log('Can play music !')},30000);
      }

      setTimeout(()=>{if(atBottom)chat.scrollTop = chat.scrollHeight;},0);
    });
  }

  sendHistory(id:string,data:any){
    this.messages.getSince(data.parameter).forEach(
      (val,e,arr)=>{this.sendbox.sendFormat(val,'message',id);}
    );
  }

  queryForHistory(){
    let yesterday = (new Date()).valueOf() - 1000*60*60*24; // One day ago in timestamp
    this.sendbox.sendFormat({parameter:{timestamp: yesterday, id:"0"}},"queryForHistory","0");
  }

}
