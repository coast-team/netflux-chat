"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
var message_service_1 = require('./message/service/message.service');
var user_service_1 = require('./user/service/user.service');
var mediator_service_1 = require('./mediator/mediator.service');
var sendbox_service_1 = require('./sendbox/sendbox.service');
var webchannel_service_1 = require('./webchannel.service');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [message_service_1.MessageService, user_service_1.UserService, mediator_service_1.MediatorService, sendbox_service_1.SendBox, webchannel_service_1.WebChannelService]);
//# sourceMappingURL=main.js.map