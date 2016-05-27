import { Component, OnInit } from '@angular/core';
import { ChatDisplay } from './chat-display.component';
import { UserDisplay } from './user/component/user-display.component';
import { MessageService } from './message/service/message.service';
import { UserService} from './user/service/user.service';

declare var BootstrapDialog:any;

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives : [ChatDisplay, UserDisplay]
})
export class AppComponent implements OnInit{
  constructor(public messageService:MessageService, public userService:UserService){};
  hideUserList = true;

  toggleUser(element){
    this.hideUserList = !this.hideUserList;
  }

  lastMessage= function(){
    return this.messageService.getLastMessage();
  }

  ngOnInit(){
    var us = this.userService;
    BootstrapDialog.show({
            title: 'Inscrivez-vous!',
            message: 'Your ID: <input id="ID" type="number" class="form-control"> <br> Your nickname: <input id="nickname" type="text" class="form-control">',
            closable: false, // <-- Default value is false
            draggable: true, // <-- Default value is false
            buttons: [{
                        id: 'btn-ok',
                        label: 'OK',
                        cssClass: 'btn-primary',
                        autospin: false,
                        action: function(dialogRef){
                            let nom=dialogRef.getModalBody().find('#nickname').val();
                            let id=dialogRef.getModalBody().find('#ID').val();
                            if(nom==='') nom = 'Default';
                            us.addUser({id:id,nickname:nom});
                            us.setCurrentUserId(id);
                            console.log('button action');
                            dialogRef.close();
                        }
                    }]
        });
  }
}
