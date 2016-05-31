import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { MessageService } from './message/service/message.service';
import { UserService } from './user/service/user.service';
import { MediatorService } from './mediator/mediator.service';
import { SendBox } from './sendbox/sendbox.service';
import { WebChannelService } from './webchannel.service';

bootstrap(AppComponent,[MessageService, UserService, MediatorService, SendBox, WebChannelService]);
