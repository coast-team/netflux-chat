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
      var chat = document.getElementById('chat');
      var atBottom = chat.scrollTop == (chat.scrollHeight - chat.clientHeight);
      var mes = new Message();
      mes.content = this.type;
      mes.fromIdUser = this.userService.currentUserId;
      mes.toIdUser = "0";
      mes.date = new Date();
      this.messageService.addMessage(mes);
      this.type = "";
      console.log('AtBottom',atBottom);
      setTimeout(()=>{if(atBottom) chat.scrollTop = chat.scrollHeight;},0);

    }
  }

}
