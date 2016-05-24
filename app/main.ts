import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { MessageService } from './message.service';
import { UserService } from './user.service';

bootstrap(AppComponent,[MessageService, UserService]);
