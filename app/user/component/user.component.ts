import { Component, Input } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { EmojiPipe } from '../../emoji.pipe';
import { UntagPipe } from '../../untag.pipe';
import { MarkedPipe } from '../../marked.pipe';

declare var BootstrapDialog:any;

@Component({
  selector : 'user',
  templateUrl : 'app/user/view/user.component.html',
  pipes : [EmojiPipe,UntagPipe,MarkedPipe]
})
export class UserComponent {
  @Input() user : User;
  showId : boolean;

  constructor(public userService:UserService){
    this.showId = false;
  }

  currentUserId = function(){
    return this.userService.currentUserId;
  }

  popChangeNickname(){
    let self = this;
    BootstrapDialog.show({
            title: 'Let\'s change your nickname !',
            message: `
            Nickname : <input id="nickname" type="text" class="form-control" value='`+self.user.nickname+`'>`,
            closable: true, // <-- Default value is false
            draggable: true, // <-- Default value is false
            buttons: [{
                        id: 'btn-change',
                        label: 'Change !',
                        cssClass: 'btn-primary',
                        autospin: false,
                        action: function(dialogRef){
                          let name = dialogRef.getModalBody().find('#nickname').val();
                          if(name !=="") self.changeNickname(name.replace(/\s/g,'&nbsp;'));
                          console.log('button changeNickname');
                          dialogRef.close();
                        }
                    }
                  ]
        });
  }

  changeNickname(name:string){
    this.userService.setNickname({id:this.user.id,nickname:name});
  }

  private setStyles(){
    let user = this.userService.getUser(this.user.id);
    let colors = ["","",""];
    if(user != null && user.online) colors[2] = user.textColor;
    else if(user !=null) {
      colors[2] = '727272';
    }
    let styles = {
      'color' : '#'+colors[2]
    };
    return styles;
  }
}
