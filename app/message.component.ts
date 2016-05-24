import { Component, Input } from '@angular/core';
import { Message } from './message';

@Component({
  selector : 'message',
  templateUrl : 'app/message.component.html'
})
export class MessageComponent {
  @Input() message: Message;
}
