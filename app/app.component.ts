import { Component, OnInit } from '@angular/core';
import { ChatDisplay } from './chat-display.component';
import { UserDisplay } from './user/component/user-display.component';
import { MessageService } from './message/service/message.service';
import { UserService} from './user/service/user.service';
import { MediatorService } from './mediator/mediator.service';
import { EmojiPipe } from './emoji.pipe';
import { UntagPipe } from './untag.pipe';
import { MarkedPipe } from './marked.pipe';

declare var BootstrapDialog:any;

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives : [ChatDisplay, UserDisplay],
  pipes : [EmojiPipe, UntagPipe,MarkedPipe]
})
export class AppComponent implements OnInit{
  constructor(public messageService:MessageService, public userService:UserService, public mediator: MediatorService){};
  hideUserList = true;

  toggleUser(element){
    this.hideUserList = !this.hideUserList;
  }

  lastMessage= function(){
    return this.messageService.getLastMessage();
  }

  lastSender = function(){
    return this.userService.getNickname(this.lastMessage().fromIdUser);
  }

  lastDate = function(){
    return new Date(this.lastMessage().date).toLocaleString() ;
  }

  ngOnInit(){
    var us = this.userService;
    var med = this.mediator;
    BootstrapDialog.show({
            title: 'Sign in!',
            message: `
            Signaling address : <input id="sig" type="text" class="form-control" placeholder="Let empty if default one exists. (this URL:8000)">
            If joining, key: <input id="key" type="text" class="form-control">`,
            closable: false, // <-- Default value is false
            draggable: true, // <-- Default value is false
            buttons: [{
                        id: 'btn-create',
                        label: 'Create',
                        cssClass: 'btn-primary',
                        autospin: false,
                        action: function(dialogRef){
                          let sig = dialogRef.getModalBody().find('#sig').val();
                          if(sig ==="") med.create();
                          else med.create(sig);
                          console.log('button create');
                          dialogRef.close();
                        }
                    },
                    {
                        id: 'btn-join',
                        label: 'Join',
                        cssClass: 'btn-primary',
                        autospin: false,
                        action: function(dialogRef){
                          let key=dialogRef.getModalBody().find('#key').val();
                          let sig = dialogRef.getModalBody().find('#sig').val();
                          if(sig ==="") med.join(key);
                          else med.join(key,sig);
                          console.log('button join');
                          dialogRef.close();
                                }
                            }
                  ]
        });
  }


}
