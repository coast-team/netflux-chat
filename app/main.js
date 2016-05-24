"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
var message_service_1 = require('./message.service');
var user_service_1 = require('./user.service');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [message_service_1.MessageService, user_service_1.UserService]);
//# sourceMappingURL=main.js.map