import { Component, OnInit, Input } from '@angular/core';
import { UserComponent } from './user.component';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { WebChannelService } from '../../webchannel.service';
declare var BootstrapDialog:any;

@Component({
  selector : 'user-display',
  templateUrl : 'app/user/view/user-display.component.html',
  directives : [UserComponent]
})
export class UserDisplay {
  users : User[];

  @Input() isHidden;

  constructor(public userService : UserService, public wcs:WebChannelService){};

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
    let wcs = this.wcs;
    let d = wcs.getAccessData(wcs.getActiveChannel())//.then((d)=>
    BootstrapDialog.show({
            title: 'Invite user',
            message: 'Are you sure to invite new users ?',
            closable: true, // <-- Default value is false
            draggable: true, // <-- Default value is false
            buttons: [{
                        id: 'btn-ok',
                        label: 'Yes',
                        cssClass: 'btn-primary',
                        autospin: false,
                        action: function(dialogRef){
                          BootstrapDialog.show({
                                  title: 'Invite user',
                                  message: 'Key: "'+d.key+'"<br>Signaling server : "'+d.url+'"',
                                  closable: true, // <-- Default value is false
                                  draggable: true, // <-- Default value is false
                                  buttons: [{
                                              id: 'btn-ok',
                                              label: 'OK',
                                              cssClass: 'btn-primary',
                                              autospin: false,
                                              action: function(dialogRef){
                                                  dialogRef.close();
                                              }
                                          }
                                        ]
                              });
                            dialogRef.close();
                        }
                    },
                    {
                        id: 'btn-cancel',
                        label: 'Cancel',
                        cssClass: 'btn-primary',
                        autospin: false,
                        action: function(dialogRef){
                            dialogRef.close();
                        }
                    }
                  ]
        });//);
  }
}
