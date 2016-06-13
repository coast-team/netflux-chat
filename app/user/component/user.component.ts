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

  constructor(public userService:UserService){}

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
                          if(name !=="") self.changeNickname(name);
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
    let colors = this.userService.getColors(this.user.id);
    let styles = {
      //'background-color':'#'+colors[0],
      'color' : '#'+colors[2]
    };
    return styles;
  }
}
