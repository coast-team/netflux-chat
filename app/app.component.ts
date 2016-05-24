import { Component } from '@angular/core';
import { ChatDisplay } from './chat-display.component';
import { UserDisplay } from './user-display.component';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives : [ChatDisplay, UserDisplay]
})
export class AppComponent {
  toggleUser(element){
    console.log(element);
  }
}
