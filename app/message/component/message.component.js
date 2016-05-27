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
var message_1 = require('../model/message');
var user_service_1 = require('../../user/service/user.service');
var MessageComponent = (function () {
    function MessageComponent(userService) {
        this.userService = userService;
        this.senderNickname = function () {
            return this.userService.getNickname(this.message.fromIdUser);
        };
        this.receiverNickname = function () {
            if (this.message.toIdUser != "0") {
                return this.userService.getNickname(this.message.toIdUser);
            }
            else
                return "";
        };
        this.currentUserId = function () {
            return this.userService.currentUserId;
        };
    }
    ;
    MessageComponent.prototype.senderIsOnline = function () {
        return this.userService.isOnline(this.message.fromIdUser);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', message_1.Message)
    ], MessageComponent.prototype, "message", void 0);
    MessageComponent = __decorate([
        core_1.Component({
            selector: 'message',
            templateUrl: 'app/message/view/message.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], MessageComponent);
    return MessageComponent;
}());
exports.MessageComponent = MessageComponent;
//# sourceMappingURL=message.component.js.map