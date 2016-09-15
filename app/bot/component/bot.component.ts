import { Component } from '@angular/core';
import { WebChannelService } from '../../webchannel.service';

@Component({
  selector : 'bot',
  templateUrl : 'app/bot/view/bot.component.html'
})
export class BotComponent {
  botUrl: string

  constructor(public wcs:WebChannelService){
    this.botUrl = ''
  }

  addServer() {
    let wc = this.wcs.getWebChannel(this.wcs.getActiveChannel())
    wc.addBotServer(this.botUrl).then(() => {
      console.log('Bot added')
    })
  }
}
