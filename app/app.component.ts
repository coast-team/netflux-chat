import { Component, OnInit } from '@angular/core';
import { ChatDisplay } from './chat-display.component';
import { UserDisplay } from './user/component/user-display.component';
import { MessageService } from './message/service/message.service';
import { UserService} from './user/service/user.service';
import { MediatorService } from './mediator/mediator.service';

declare var BootstrapDialog:any;

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives : [ChatDisplay, UserDisplay]
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

  ngOnInit(){
    var us = this.userService;
    var med = this.mediator;
    BootstrapDialog.show({
            title: 'Sign in!',
            message: `If joining, key: <input id="key" type="text" class="form-control">`,
            closable: false, // <-- Default value is false
            draggable: true, // <-- Default value is false
            buttons: [{
                        id: 'btn-create',
                        label: 'Create',
                        cssClass: 'btn-primary',
                        autospin: false,
                        action: function(dialogRef){
                            //let nom=dialogRef.getModalBody().find('#nickname').val();
                            //let id=dialogRef.getModalBody().find('#ID').val();
                            //if(nom==='') nom = 'Default';
                            med.create();
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
                                    //let id=dialogRef.getModalBody().find('#ID').val();
                                    //if(nom==='') nom = 'Default';
                                    med.join(key);
                                    console.log('button join');
                                    dialogRef.close();
                                }
                            }
                  ]
        });
  }
}
