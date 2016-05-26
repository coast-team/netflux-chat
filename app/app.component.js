"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var chat_display_component_1 = require('./chat-display.component');
var user_display_component_1 = require('./user-display.component');
var message_service_1 = require('./message.service');
var user_service_1 = require('./user.service');
var AppComponent = (function () {
    function AppComponent(messageService, userService) {
        this.messageService = messageService;
        this.userService = userService;
        this.lastMessage = function () {
            return this.messageService.getLastMessage();
        };
    }
    ;
    AppComponent.prototype.toggleUser = function (element) {
        console.log(element);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.component.html',
            directives: [chat_display_component_1.ChatDisplay, user_display_component_1.UserDisplay]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService, user_service_1.UserService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map