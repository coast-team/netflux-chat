import { Component, OnInit } from '@angular/core';
import { MessageComponent } from './message/component/message.component';
import { ChatInput } from './chat-input.component';
import { MessageService } from './message/service/message.service';
import { Message } from './message/model/message';

@Component({
  selector : 'chat-display',
  templateUrl : 'app/chat-display.component.html',
  //template : `<blockquote *ngFor="#message of messages">{{message.content}}</blockquote>`,
  directives : [MessageComponent, ChatInput]
})
export class ChatDisplay implements OnInit{
  messages: Message[];

  constructor(public messageService : MessageService){
    this.messages = messageService.messages.get();
  }

  ngOnInit(){
    this.getMessages();
    console.log('Messages chargés');
  }

  getMessages(){
    return this.messageService.getMessages();
  }
 }
