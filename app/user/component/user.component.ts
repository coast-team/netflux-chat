import { Component, Input } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector : 'user',
  templateUrl : 'app/user/view/user.component.html'
})
export class UserComponent {
  @Input() user : User;

  constructor(public userService:UserService){}

  currentUserId = function(){
    return this.userService.currentUserId;
  }
}
