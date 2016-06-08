import {Message} from './message/model/message';

export interface MessageManager<T>{

  /** add a message for local usage **/
  append(msg:Message):T;

  /** insert the message in the right place using id **/
  insert(id:T,msg:Message):void;

  /** return the ordered message list **/
  get():Message[];

  /** return the messages that appeared after the parameter **/
  getSince(parameter:T):Message[];

  /** return the parameter needed for getSince(T) **/
  getStartForHistory():T;

}
