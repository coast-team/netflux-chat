import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { USERS } from '../mock-users';
import { SendBox } from '../../sendbox/sendbox.service';

@Injectable()
export class UserService{
  users : User[] = USERS;

  constructor(public sendbox : SendBox){}

  //default = 1 for starting
  currentUserId : string = ""+1;

  setCurrentUserId(id:string){
    this.currentUserId = id;
  }

  getUsers(){
    return this.users;
  }

  addUser(user:User){
    let possedeUser = false;
    function callback(v:User,i:number,a){
      if(v.id == user.id){
        possedeUser = true;
        v.nickname = user.nickname;
        return false;
      }
      return true;
    }
    this.users.every(callback);
    if(!possedeUser){
      this.users.push(user);
    }
  }

  remUser(id:string){
    function callback(v:User,i:number,a){
      if(v.id == id){
        v.online=false;
        return false;
      }
      return true;
    }
    this.users.every(callback);
  }

  getNickname(id:string){
    var ret = "";
    function callback(v:User,i:number,a){
      if(v.id == id){
        ret = v.nickname;
        return false;
      }
      return true;
    }
    this.users.every(callback);
    return ret;
  }

  setNickname(data){
    let nickname = data.nickname;
    let id = data.id;

    let ok = false;

    function callback(v:User,i:number,a){
      if(v.id == id){
        v.nickname = nickname;
        ok = true;
        return false;
      }
      return true;
    }

    this.users.every(callback);

    if(ok){
      let data = {id:id, nickname:nickname};
      this.sendbox.sendFormat(data,"updateNickname","0");
      localStorage.setItem("netflux-chat-nickname",nickname);
    }
  }

  updateNickname(data:any){
    let nickname = data.nickname;
    let id = data.id;

    function callback(v:User,i:number,a){
      if(v.id == id){
        v.nickname = nickname;
        return false;
      }
      return true;
    }
    this.users.every(callback);
  }

  sendNickname(data:any){
    let sendingData = {id:this.currentUserId, nickname:this.getNickname(this.currentUserId)};
    this.sendbox.sendFormat(sendingData,"updateNickname",data.requester);
  }

  isOnline(id: string){
    var online : boolean;
    function callback(v:User,i:number,a){
      if(v.id == id){
        online = v.online;
        return false;
      }
      return true;
    }
    this.users.every(callback);
    return online;
  }


}
