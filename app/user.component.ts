import { Component, Input } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector : 'user',
  templateUrl : 'app/user.component.html'
})
export class UserComponent {
  @Input() user : User;

  constructor(public userService:UserService){}

  currentUserId = function(){
    return this.userService.currentUserId;
  }
}
