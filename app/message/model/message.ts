export class Message{

  /**
  * Sender's id
  */
  fromIdUser : string;

  /**
  * receiver's id ; 0 mean all user
  */
  toIdUser : string;

  /**
  * message's content
  */
  content : string;

  /**
  * date
  */
  date : number;

  constructor(fromIdUser:string,toIdUser:string,content:string,date:number){
    this.fromIdUser = fromIdUser;
    this.toIdUser = toIdUser;
    this.content = content;
    this.date = date;
  }

  static fromJSON(data:any){
    return new Message(data.fromIdUser, data.toIdUser, data.content, data.date);
  }
}
