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
  date : Date;

  constructor(){

  }
}
