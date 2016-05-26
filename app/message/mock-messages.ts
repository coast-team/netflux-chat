import { Message } from './model/message';

export var MESSAGES: Message[] = [
  {fromIdUser : 1,toIdUser : 2, content : "Hello, how are you?", date : new Date("2016-05-23T14:48:00")},
  {fromIdUser : 1,toIdUser : 0, content : "Hello every one!", date : new Date("2016-05-23T14:48:12")},
  {fromIdUser : 3,toIdUser : 0, content : "Hi!", date : new Date("2016-05-23T14:48:42")},
  {fromIdUser : 2,toIdUser : 1, content : "Not too bad, and you?", date : new Date("2016-05-23T14:51:00")},
  {fromIdUser : 3,toIdUser : 0, content : " Who know something about Lorem Ipsum?", date : new Date("2016-05-23T14:53:00")},
  {fromIdUser : 1,toIdUser : 0,
   content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lectus tortor, maximus nec ullamcorper sit amet, ultricies nec lorem. Maecenas nec ullamcorper nulla. Vestibulum tempus ligula imperdiet hendrerit pulvinar. Donec fringilla diam ac commodo sodales. In eget vehicula urna. Nam feugiat eu diam quis vestibulum. Ut vel lobortis dui, a pretium leo.",
   date : new Date("2016-05-23T15:02:00")},
  {fromIdUser : 3,toIdUser : 0, content : "Wow!", date : new Date("2016-05-23T15:02:45")}
];
