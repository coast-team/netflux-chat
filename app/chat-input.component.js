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
var message_service_1 = require('./message.service');
var message_1 = require('././message');
var user_service_1 = require('./user.service');
var ChatInput = (function () {
    function ChatInput(messageService, userService) {
        this.messageService = messageService;
        this.userService = userService;
    }
    ;
    ChatInput.prototype.send = function () {
        if (this.type != "") {
            var chat = document.getElementById('chat');
            var atBottom = chat.scrollTop == (chat.scrollHeight - chat.clientHeight);
            var mes = new message_1.Message();
            mes.content = this.type;
            mes.fromIdUser = this.userService.currentUserId;
            mes.toIdUser = 0;
            mes.date = new Date();
            this.messageService.addMessage(mes);
            this.type = "";
            console.log('AtBottom', atBottom);
            setTimeout(function () { if (atBottom)
                chat.scrollTop = chat.scrollHeight; }, 0);
        }
    };
    ChatInput = __decorate([
        core_1.Component({
            selector: 'chat-input',
            templateUrl: 'app/chat-input.component.html'
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService, user_service_1.UserService])
    ], ChatInput);
    return ChatInput;
}());
exports.ChatInput = ChatInput;
//# sourceMappingURL=chat-input.component.js.map