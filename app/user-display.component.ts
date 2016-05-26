import { Component, OnInit, Input } from '@angular/core';
import { UserComponent } from './user.component';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector : 'user-display',
  templateUrl : 'app/user-display.component.html',
  directives : [UserComponent]
})
export class UserDisplay {
  users : User[];

  @Input() isHidden;

  constructor(public userService : UserService){};

  ngOnInit(){
    this.getUsers();
    console.log('Users chargés');
  }

  getUsers(){
    this.users = this.userService.getUsers()
  }

  toggleUser(){
    this.isHidden = !this.isHidden;
  }
}
