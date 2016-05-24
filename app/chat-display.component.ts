import { Component, OnInit } from '@angular/core';
import { MessageComponent } from './message.component';
import { ChatInput } from './chat-input.component';
import { MessageService } from './message.service';
import { Message } from './message';

@Component({
  selector : 'chat-display',
  templateUrl : 'app/chat-display.component.html',
  //template : `<blockquote *ngFor="#message of messages">{{message.content}}</blockquote>`,
  directives : [MessageComponent, ChatInput]
})
export class ChatDisplay implements OnInit{
  messages: Message[];

  constructor(public messageService : MessageService){}

  ngOnInit(){
    this.getMessages();
    console.log('Messages chargés');
  }

  getMessages(){
    this.messageService.getMessages().then(messages => this.messages = messages).then( () => console.log(this.messages));
  }
 }
