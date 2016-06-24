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
    // for(let i = this.messages.length-1; i>=0; i--){// pour chaque message de messages
    //   if(this.messages[i].date<=id.timestamp){  // si sa date est plus petite ou égale que celle du msg donné
    //     if(this.messages[i].date==id.timestamp && parseInt(this.messages[i].fromIdUser)!== parseInt(id.id)){ //alors si c'est la même et que le user est différent // otherwise msg is already in messages
    //       if(parseInt(this.messages[i].fromIdUser)>parseInt(msg.fromIdUser)){ // si l'id user du msg est plus petit,
    //         this.messages.splice(i+1,0,msg); // on le met après
    //       }else this.messages.splice(i,0,msg);// sinon avant car plus grand
    //     }else if(parseInt(this.messages[i].fromIdUser)!== parseInt(id.id)){
    //       let c = i;
    //       if(i<this.messages.length-1) c++;
    //       this.messages.splice(c,0,msg);
    //     }
    //     return;
    //   }
    // }
    for(let i = this.messages.length-1; i>=0; i--){
      if(this.messages[i].date < id.timestamp){
        if(i == this.messages.length-1){
          this.messages.push(msg);
          return;
        }
        else{
          this.messages.splice(i+1,0,msg);
          return;
        }
      }
      else{
        if(this.messages[i].date == id.timestamp){
          if(msg.fromIdUser > this.messages[i].fromIdUser){
            this.messages.splice(i+1,0,msg);
            return;
          }
          if(msg.fromIdUser < this.messages[i].fromIdUser){
            this.messages.splice(i,0,msg);
            return;
          }
          else return;
        }
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
