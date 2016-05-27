import { Component, Input } from '@angular/core';
import { Message } from '../model/message';
import { UserService } from '../../user/service/user.service';

@Component({
  selector : 'message',
  templateUrl : 'app/message/view/message.component.html'
})
export class MessageComponent {
  @Input() message: Message;

  constructor(public userService: UserService){};

  senderNickname = function(){
    return this.userService.getNickname(this.message.fromIdUser);
  }

  receiverNickname = function(){
    if(this.message.toIdUser != "0"){
      return this.userService.getNickname(this.message.toIdUser);
    }else return "";
  }

  currentUserId = function(){
    return this.userService.currentUserId;
  }

  senderIsOnline(){
    return this.userService.isOnline(this.message.fromIdUser);
  }
}
