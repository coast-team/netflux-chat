import { Component } from '@angular/core';
import { ChatDisplay } from './chat-display.component';
import { UserDisplay } from './user-display.component';
import { MessageService } from './message.service';
import { UserService} from './user.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives : [ChatDisplay, UserDisplay]
})
export class AppComponent {
  constructor(public messageService:MessageService, public userService:UserService){};

  toggleUser(element){
    console.log(element);
  }

  lastMessage= function(){
    return this.messageService.getLastMessage();
  }
}
