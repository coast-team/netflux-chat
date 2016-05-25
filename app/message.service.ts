import { Injectable, OnInit } from '@angular/core';
import { Message } from './message';
import { MESSAGES } from './mock-messages';

@Injectable()
export class MessageService {
  messages : Message[] = MESSAGES;





  getMessages(){
    return this.messages;
  }

  getLastMessage(){
    if(this.messages===undefined){
      return {fromIdUser:0,toIdUser:0,content:'Loading',date:new Date()};
    }
    return this.messages[this.messages.length-1];
  }

  addMessage(mes:Message){
    this.messages.push(mes);
  }
}
