import { Injectable, OnInit } from '@angular/core';
import { User } from '../model/user';
import { USERS } from '../mock-users';

@Injectable()
export class UserService{
  users : User[] = USERS;

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

  setNickname(id:string, nickname:string){
    function callback(v:User,i:number,a){
      if(v.id == id){
        v.nickname = nickname;
        return false;
      }
      return true;
    }
    this.users.every(callback);
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
