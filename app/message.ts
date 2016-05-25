export class Message{

  /**
  * Sender's id
  */
  fromIdUser : number;

  /**
  * receiver's id ; 0 mean all user
  */
  toIdUser : number;

  /**
  * message's content
  */
  content : string;

  /**
  * date
  */
  date : Date;

  constructor(){
    
  }
}
