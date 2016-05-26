import { Component, Input } from '@angular/core';
import { Message } from './message';
import { UserService } from './user.service';

@Component({
  selector : 'message',
  templateUrl : 'app/message.component.html'
})
export class MessageComponent {
  @Input() message: Message;

  constructor(public userService: UserService){};

  senderNickname = function(){
    return this.userService.getNickname(this.message.fromIdUser);
  }

  receiverNickname = function(){
    if(this.message.toIdUser != 0){
      return this.userService.getNickname(this.message.toIdUser);
    }else return "";
  }

  currentUserId = function(){
    return this.userService.currentUserId;
  }
}
