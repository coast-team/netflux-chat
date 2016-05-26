import { Injectable, OnInit } from '@angular/core';
import { User } from './user';
import { USERS } from './mock-users';

@Injectable()
export class UserService{
  users : User[] = USERS;

  //default = 1 for starting
  currentUserId : number = 1;


  getUsers(){
    return this.users;
  }

  addUser(user:User){
    this.users.push(user);
  }


  getNickname(id:number){
    /*var ret = "";
    for(var user User in this.users){
      if(user.id == id){
        ret = user.nickname;
        break;
      }
    }
    return ret;*/
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

}
