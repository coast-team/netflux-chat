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
var mock_messages_1 = require('../mock-messages');
var user_service_1 = require('../../user/service/user.service');
var sendbox_service_1 = require('../../sendbox/sendbox.service');
var MessageService = (function () {
    function MessageService(userService, sendbox) {
        this.userService = userService;
        this.sendbox = sendbox;
        this.messages = mock_messages_1.MESSAGES;
        this.audio = new Audio();
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
    }
    MessageService.prototype.getMessages = function () {
        return this.messages;
    };
    MessageService.prototype.getLastMessage = function () {
        if (this.messages === undefined) {
            return { fromIdUser: "0", toIdUser: "0", content: 'Loading', date: new Date() };
        }
        return this.messages[this.messages.length - 1];
    };
    MessageService.prototype.sendMessage = function (mes) {
        this.sendbox.sendFormat(mes, 'message', "0"); //0 = broadcast
        this.addMessage(mes);
    };
    MessageService.prototype.addMessage = function (mes) {
        var _this = this;
        this.zone.run(function () {
            var chat = document.getElementById('chat');
            var atBottom = chat.scrollTop == (chat.scrollHeight - chat.clientHeight);
            //console.log('scrollTop : ', chat.scrollTop);
            //console.log('scrollHeight : ', chat.scrollHeight);
            //console.log('clientHeight : ', chat.clientHeight);
            _this.messages.push(mes);
            if (mes.fromIdUser !== _this.userService.currentUserId) {
                var audio = _this.audio;
                if (audio.src === '') {
                    audio.src = 'SuperMarioBros.ogg';
                    audio.load();
                }
                audio.play();
                setTimeout(function () { audio.pause(); }, 300);
            }
            setTimeout(function () { if (atBottom)
                chat.scrollTop = chat.scrollHeight; }, 0);
        });
    };
    MessageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [user_service_1.UserService, sendbox_service_1.SendBox])
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map