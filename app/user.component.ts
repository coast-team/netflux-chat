import { Component, Input } from '@angular/core';
import {User} from './user';

@Component({
  selector : 'user',
  templateUrl : 'app/user.component.html'
})
export class UserComponent {
  @Input() user : User;
}
