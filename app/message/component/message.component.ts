import { Component, Input } from '@angular/core';
import { Message } from '../model/message';
import { UserService } from '../../user/service/user.service';
import { EmojiPipe } from '../../emoji.pipe';
import { UntagPipe } from '../../untag.pipe';
import { MarkedPipe } from '../../marked.pipe';

@Component({
  selector : 'message',
  templateUrl : 'app/message/view/message.component.html',
  pipes : [EmojiPipe,UntagPipe,MarkedPipe]
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

  getLocaleDate(){
    return new Date(+this.message.date).toLocaleString();
  }

  private setStyles(){
    let colors = this.userService.getColors(this.message.fromIdUser);
    let styles = {
      //'background-color':this.message.toIdUser=='0' ? '#'+colors[0] : '#'+colors[1],
      'color' : '#'+colors[2]
    };
    return styles;
  }
}
