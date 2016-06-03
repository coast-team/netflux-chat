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
var user_1 = require('../model/user');
var user_service_1 = require('../service/user.service');
var emoji_pipe_1 = require('../../emoji.pipe');
var untag_pipe_1 = require('../../untag.pipe');
var UserComponent = (function () {
    function UserComponent(userService) {
        this.userService = userService;
        this.currentUserId = function () {
            return this.userService.currentUserId;
        };
    }
    UserComponent.prototype.popChangeNickname = function () {
        var self = this;
        BootstrapDialog.show({
            title: 'Let\'s change your nickname !',
            message: "\n            Nickname : <input id=\"nickname\" type=\"text\" class=\"form-control\" value='" + self.user.nickname + "'>",
            closable: true,
            draggable: true,
            buttons: [{
                    id: 'btn-change',
                    label: 'Change !',
                    cssClass: 'btn-primary',
                    autospin: false,
                    action: function (dialogRef) {
                        var name = dialogRef.getModalBody().find('#nickname').val();
                        if (name !== "")
                            self.changeNickname(name);
                        console.log('button changeNickname');
                        dialogRef.close();
                    }
                }
            ]
        });
    };
    UserComponent.prototype.changeNickname = function (name) {
        this.userService.setNickname({ id: this.user.id, nickname: name });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', user_1.User)
    ], UserComponent.prototype, "user", void 0);
    UserComponent = __decorate([
        core_1.Component({
            selector: 'user',
            templateUrl: 'app/user/view/user.component.html',
            pipes: [emoji_pipe_1.EmojiPipe, untag_pipe_1.UntagPipe]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map