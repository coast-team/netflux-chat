import { Injectable } from '@angular/core';
import { User } from './user';
import { USERS } from './mock-users';

@Injectable()
export class UserService{
  users : User[];
  getUsers(){/*
    if(this.users==null){
      this.users = Promise.resolve(USERS);
    }
    return this.users;*/
    return Promise.resolve(USERS);
  }

/*
  getNickname(id:number){
    users.foreach( (v,i,a)=>{if(v.id==id) return v.nickname});
  }
*/
}
