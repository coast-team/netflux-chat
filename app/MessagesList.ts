import {MessageManager} from './MessageManager';
import {Message} from './message/model/message';

export class MessagesList implements MessageManager<TimestampId>{

  messages : Message[];

  constructor(){
    this.messages = [{fromIdUser : "0",toIdUser : "0", content : "Starting the app ...", date :-1}];
  }

  append(msg:Message){
    this.messages.push(msg);
    return {timestamp : msg.date, id : msg.fromIdUser} ;
  }

  insert(id:TimestampId,msg:Message){
    for(let i = this.messages.length-1; i>=0; i--){
      if(this.messages[i].date<=id.timestamp){
        if(this.messages[i].date==id.timestamp && parseInt(this.messages[i].fromIdUser)!= parseInt(id.id)){ // otherwise msg is already in messages
          if(parseInt(this.messages[i].fromIdUser)>parseInt(msg.fromIdUser)){
            this.messages.splice(i+1,0,msg);
          }else this.messages.splice(i,0,msg);
        }else this.messages.splice(i+1,0,msg);
        return;
      }
    }
  }

  get(){
    return this.messages;
  }

  getSince(parameter:TimestampId){
    return this.messages.filter((val,i,arr)=>{
      return val.date>=parameter.timestamp;
    });
  }

  getStartForHistory(){
    return {timestamp:this.messages[this.messages.length-1].date,id:this.messages[this.messages.length-1].fromIdUser};
  }

}

export class TimestampId {
  timestamp : number;
  id : string;
}
