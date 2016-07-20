import { Component } from '@angular/core';
import { WebChannelService } from '../../webchannel.service';

@Component({
  selector : 'bot',
  templateUrl : 'app/bot/view/bot.component.html'
})
export class BotComponent {
  host: string
  port: string

  constructor(public wcs:WebChannelService){
    this.host = ''
    this.port = ''
  }

  addServer() {
    let wc = this.wcs.getWebChannel(this.wcs.getActiveChannel())
    wc.addBotServer(this.host, this.port).then(() => {
      console.log('Bot added')
    })
  }
}
