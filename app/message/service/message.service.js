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
var user_service_1 = require('../../user/service/user.service');
var sendbox_service_1 = require('../../sendbox/sendbox.service');
var MessagesList_1 = require('../../MessagesList');
var MessageService = (function () {
    function MessageService(userService, sendbox) {
        this.userService = userService;
        this.sendbox = sendbox;
        this.messages = new MessagesList_1.MessagesList();
        this.focus = true;
        this.audio = new Audio();
        this.playAudio = true;
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
        var self = this;
        document.body.onblur = function (e) { self.focus = false; };
        document.body.onfocus = function (e) { self.focus = true; };
    }
    MessageService.prototype.getMessages = function () {
        return this.messages.get();
    };
    MessageService.prototype.getLastMessage = function () {
        if (this.messages.get()[0] === undefined) {
            return { fromIdUser: "0", toIdUser: "0", content: 'Loading', date: new Date().getTime() };
        }
        return this.messages.get()[this.messages.get().length - 1];
    };
    MessageService.prototype.sendMessage = function (mes) {
        var id = mes.toIdUser;
        this.sendbox.sendFormat(mes, 'message', id); //0 = broadcast
        this.appendMessage(mes);
    };
    MessageService.prototype.appendMessage = function (mes) {
        var _this = this;
        this.zone.run(function () {
            var chat = document.getElementById('chat');
            var atBottom = chat.scrollTop == (chat.scrollHeight - chat.clientHeight);
            _this.messages.append(mes);
            setTimeout(function () { if (atBottom)
                chat.scrollTop = chat.scrollHeight; }, 0);
        });
    };
    MessageService.prototype.insertMessage = function (mes) {
        var _this = this;
        this.zone.run(function () {
            var chat = document.getElementById('chat');
            var atBottom = chat.scrollTop == (chat.scrollHeight - chat.clientHeight);
            _this.messages.insert({ timestamp: mes.date, id: mes.fromIdUser }, mes);
            var audio = _this.audio;
            if (audio.src === '') {
                audio.src = 'smb_pipe.ogg';
                audio.load();
            }
            if (_this.playAudio && !_this.focus) {
                audio.play();
                _this.playAudio = false;
                var self_1 = _this;
                setTimeout(function () { self_1.playAudio = true; console.log('Can play music !'); }, 30000);
            }
            setTimeout(function () { if (atBottom)
                chat.scrollTop = chat.scrollHeight; }, 0);
        });
    };
    MessageService.prototype.sendHistory = function (id, data) {
        var _this = this;
        this.messages.getSince(data.parameter).forEach(function (val, e, arr) { if (val.fromIdUser != '0')
            _this.sendbox.sendFormat(val, 'message', id); } //condition avoid chat-app messages
        );
    };
    MessageService.prototype.queryForHistory = function () {
        var yesterday = (new Date()).valueOf() - 1000 * 60 * 60 * 24; // One day ago in timestamp
        this.sendbox.sendFormat({ parameter: { timestamp: yesterday, id: "0" } }, "queryForHistory", "0");
    };
    MessageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [user_service_1.UserService, sendbox_service_1.SendBox])
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map