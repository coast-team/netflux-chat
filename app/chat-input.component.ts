import { Component } from '@angular/core';
import { MessageService } from './message/service/message.service';
import { Message } from './message/model/message';
import { UserService } from './user/service/user.service';

@Component({
  selector : 'chat-input',
  templateUrl : 'app/chat-input.component.html'
})
export class ChatInput {
  type: string;

  constructor(public messageService:MessageService, public userService : UserService){};
  send(){
    if(this.type!=""){
      var mes = Message.fromJSON({fromIdUser:this.userService.currentUserId,toIdUser:"0",content:this.type,date:Date.now()});
      this.messageService.sendMessage(mes);
      this.type = "";
    }
  }

}
