export class User {

  /**
  * user's id
  */
  id : string;

  /**
  * user's nickname
  */
  nickname : string;

  /**
  * id for netflux
  */
  peerId : string;

  /**
  * remove a user change it offline, it let us keep old messages and keep sense 
  */
  online = true;

  //avatar ... later
}
