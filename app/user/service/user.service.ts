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

  getUsersForWhisp(){
    let tab = [];
    this.users.forEach((v,i,t)=>{tab.push(v.nickname+"~"+v.id)});
    return tab;
  }

  addUser(user:User){
    let possedeUser = false;
    function callback(v:User,i:number,a){
      if(v.id == user.id){
        possedeUser = true;
        v.nickname = user.nickname;
        v.id = user.id;
        // add other if needed
        v.peerId = user.peerId;
        v.online = true;

        console.log('update user : ',v,' to ',user);
        return false;
      }
      return true;
    }
    this.users.every(callback);
    if(!possedeUser){
      console.log('adding new user : ',user);
      this.users.push(user);
    }
  }

  removeUser(id:string){
    function callback(v:User,i:number,a){
      if(v.id == id){
        v.online=false;
        return false;
      }
      return true;
    }
    this.users.every(callback);
    console.log("Le user : ", this.users);
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
    nickname = nickname.replace(/\s/g,'&nbsp;');
    nickname = nickname.replace(new RegExp('/','g'),'&#47;');
    nickname = nickname.replace(/~/g,'&#126;');
    nickname = nickname.replace(/(^#{1,6})&nbsp;/g,'$1 ');
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

  getIdFromPeerId(peerId : string):string{
    let id = '';

    function callback(v:User,i:number,a){
      if(v.peerId == peerId){
        id = v.id;
        return false;
      }
      return true;
    }

    this.users.every(callback);
    return id;
  }

  getUser(id:string):User{
    var ret = null;
    function callback(v:User,i:number,a){
      if(v.id == id){
        ret = v;
        return false;
      }
      return true;
    }
    this.users.every(callback);
    return ret;
  }

  getUserFromPeerId(id:string):User{
    var ret = null;
    function callback(v:User,i:number,a){
      if(v.peerId == id){
        ret = v;
        return false;
      }
      return true;
    }
    this.users.every(callback);
    return ret;
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

  queryForUsers(){
    this.sendbox.sendFormat({requester:this.getUser(this.currentUserId).peerId},"queryForUsers",'0');
  }

  sendUsers(data){
    this.users.forEach(
      (val,i,arr)=>{
        this.sendbox.sendFormat(val,"userInfos",data.requester);
        console.log('sending data : user ',val,' to ', data);
      }
    )
  }

  sendUserInfos(){
    let sendingData = this.getUser(this.currentUserId);
    this.sendbox.sendFormat(sendingData,"userInfos",'0');
  }

  getColors(id:string){
    var tab : string[];
    function callback(v:User,i:number,a){
      if(v.id == id){
        tab = [v.backgroundColor,v.whispColor,v.textColor];
        return false;
      }
      return true;
    }
    this.users.every(callback);
    return tab;
  }
}
