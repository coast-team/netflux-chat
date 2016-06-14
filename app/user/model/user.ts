declare var ColorScheme:any;
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
  online :boolean;


  backgroundColor : string;

  whispColor : string;

  textColor : string;

  constructor(id:string,peerId:string,nickname:string){
    this.id = id;
    this.peerId = peerId;
    this.nickname = nickname;
    this.online = true;

    let rdm = function(min:number,max:number,step:number){
      return min + (step * Math.floor(Math.random()*(max-min)/step) );
    }

    let scheme = new ColorScheme;
    let hue = rdm(0,360,1);
    scheme.web_safe(true)
          .from_hue(hue) //random number between 0 and 360 with step
          .scheme('contrast')
          .variation('light');
    let colors = scheme.colors();
    console.log('colors : ', colors);

    let bg = rdm(0,3,1);
    let whisp = rdm(0,3,1);
    while(whisp == bg){
      whisp = rdm(0,3,1);
    }

    //let possible = [0,3,4,7];//avoid 1,2,5 and 6 that are white with 'light' scheme or too dark
    this.backgroundColor = colors[bg];
    this.textColor = colors[7];
    this.whispColor = colors[whisp];
  }

  getColors(){
    return [this.backgroundColor,this.whispColor,this.textColor];
  }
}
