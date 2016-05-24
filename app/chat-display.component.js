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
var message_component_1 = require('./message.component');
var chat_input_component_1 = require('./chat-input.component');
var message_service_1 = require('./message.service');
var ChatDisplay = (function () {
    function ChatDisplay(messageService) {
        this.messageService = messageService;
    }
    ChatDisplay.prototype.ngOnInit = function () {
        this.getMessages();
        console.log('Messages chargés');
    };
    ChatDisplay.prototype.getMessages = function () {
        var _this = this;
        this.messageService.getMessages().then(function (messages) { return _this.messages = messages; }).then(function () { return console.log(_this.messages); });
    };
    ChatDisplay = __decorate([
        core_1.Component({
            selector: 'chat-display',
            templateUrl: 'app/chat-display.component.html',
            //template : `<blockquote *ngFor="#message of messages">{{message.content}}</blockquote>`,
            directives: [message_component_1.MessageComponent, chat_input_component_1.ChatInput]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService])
    ], ChatDisplay);
    return ChatDisplay;
}());
exports.ChatDisplay = ChatDisplay;
//# sourceMappingURL=chat-display.component.js.map