import { Injectable, OnInit } from '@angular/core';
import { User } from '../model/user';
import { USERS } from '../mock-users';

@Injectable()
export class UserService{
  users : User[] = USERS;

  //default = 1 for starting
  currentUserId : number = 1;

  setCurrentUserId(id:number){
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

  getNickname(id:number){
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

  setNickname(id:number, nickname:string){
    function callback(v:User,i:number,a){
      if(v.id == id){
        v.nickname = nickname;
        return false;
      }
      return true;
    }
    this.users.every(callback);
  }
}
