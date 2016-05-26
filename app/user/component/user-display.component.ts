import { Component, OnInit, Input } from '@angular/core';
import { UserComponent } from './user.component';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector : 'user-display',
  templateUrl : 'app/user/view/user-display.component.html',
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

  addUser(){
    var us = this.userService;
    BootstrapDialog.show({
            title: 'Add user',
            message: 'User name: <input type="text" class="form-control">',
            data: {'name':''},
            closable: true, // <-- Default value is false
            draggable: true, // <-- Default value is false
            buttons: [{
                        id: 'btn-ok',
                        label: 'OK',
                        cssClass: 'btn-primary',
                        autospin: false,
                        action: function(dialogRef){
                            let nom=dialogRef.getModalBody().find('input').val();
                            if(nom==='') nom = 'Default';
                            us.addUser({id:3,nickname:nom});
                            console.log('button action');
                            dialogRef.close();
                        }
                    }]
        });
    //this.userService.addUser({id:3,nickname:"UserAdded"});
  }
}
