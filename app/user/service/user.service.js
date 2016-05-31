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
var mock_users_1 = require('../mock-users');
var UserService = (function () {
    function UserService() {
        this.users = mock_users_1.USERS;
        //default = 1 for starting
        this.currentUserId = "" + 1;
    }
    UserService.prototype.setCurrentUserId = function (id) {
        this.currentUserId = id;
    };
    UserService.prototype.getUsers = function () {
        return this.users;
    };
    UserService.prototype.addUser = function (user) {
        var possedeUser = false;
        function callback(v, i, a) {
            if (v.id == user.id) {
                possedeUser = true;
                v.nickname = user.nickname;
                return false;
            }
            return true;
        }
        this.users.every(callback);
        if (!possedeUser) {
            this.users.push(user);
        }
    };
    UserService.prototype.remUser = function (id) {
        function callback(v, i, a) {
            if (v.id == id) {
                v.online = false;
                return false;
            }
            return true;
        }
        this.users.every(callback);
    };
    UserService.prototype.getNickname = function (id) {
        var ret = "";
        function callback(v, i, a) {
            if (v.id == id) {
                ret = v.nickname;
                return false;
            }
            return true;
        }
        this.users.every(callback);
        return ret;
    };
    UserService.prototype.setNickname = function (id, nickname) {
        function callback(v, i, a) {
            if (v.id == id) {
                v.nickname = nickname;
                return false;
            }
            return true;
        }
        this.users.every(callback);
    };
    UserService.prototype.isOnline = function (id) {
        var online;
        function callback(v, i, a) {
            if (v.id == id) {
                online = v.online;
                return false;
            }
            return true;
        }
        this.users.every(callback);
        return online;
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map