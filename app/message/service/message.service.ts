import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { MESSAGES } from '../mock-messages';
import { UserService } from '../../user/service/user.service';
import { SendBox } from '../../sendbox/sendbox.service';


@Injectable()
export class MessageService {
  messages : Message[] = MESSAGES;

  constructor(public userService : UserService, public sendbox: SendBox){}



  getMessages(){
    return this.messages;
  }

  getLastMessage(){
    if(this.messages===undefined){
      return {fromIdUser:"0",toIdUser:"0",content:'Loading',date:new Date()};
    }
    return this.messages[this.messages.length-1];
  }


  sendMessage(mes: Message){
    this.sendbox.sendFormat(mes.content,'message');
    this.addMessage(mes);
  }

  audio = new Audio();

  addMessage(mes:Message){
    this.messages.push(mes);
    if(mes.fromIdUser !== this.userService.currentUserId){
      var audio = this.audio;
      if(audio.src === ''){
        audio.src = 'SuperMarioBros.ogg';
        audio.load();
      }
      audio.play();
      setTimeout(()=>{audio.pause();},300);
      console.log('audio : ', audio);
    }

    var chat = document.getElementById('chat');
    var atBottom = chat.scrollTop == (chat.scrollHeight - chat.clientHeight);
    console.log('scrollTop : ', chat.scrollTop);
    console.log('scrollHeight : ', chat.scrollHeight);
    console.log('clientHeight : ', chat.clientHeight);
    setTimeout(()=>{if(atBottom)chat.scrollTop = chat.scrollHeight;},0);

  }
}
