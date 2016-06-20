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
var sendbox_service_1 = require('../../sendbox/sendbox.service');
var UserService = (function () {
    function UserService(sendbox) {
        this.sendbox = sendbox;
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
    UserService.prototype.getUsersForWhisp = function () {
        var tab = [];
        this.users.forEach(function (v, i, t) { tab.push(v.nickname + "~" + v.id); });
        return tab;
    };
    UserService.prototype.addUser = function (user) {
        var possedeUser = false;
        function callback(v, i, a) {
            if (v.id == user.id) {
                possedeUser = true;
                v.nickname = user.nickname;
                v = user;
                v.online = true;
                console.log('update user : ', v, ' to ', user);
                return false;
            }
            return true;
        }
        this.users.every(callback);
        if (!possedeUser) {
            console.log('adding new user : ', user);
            this.users.push(user);
        }
    };
    UserService.prototype.removeUser = function (id) {
        function callback(v, i, a) {
            if (v.id == id) {
                v.online = false;
                return false;
            }
            return true;
        }
        this.users.every(callback);
        console.log("Le user : ", this.users);
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
    UserService.prototype.setNickname = function (data) {
        var nickname = data.nickname;
        nickname = nickname.replace(/\s/g, '&nbsp;');
        nickname = nickname.replace(new RegExp('/', 'g'), '&#47;');
        nickname = nickname.replace(/~/g, '&#126;');
        nickname = nickname.replace(/(^#{1,6})&nbsp;/g, '$1 ');
        var id = data.id;
        var ok = false;
        function callback(v, i, a) {
            if (v.id == id) {
                v.nickname = nickname;
                ok = true;
                return false;
            }
            return true;
        }
        this.users.every(callback);
        if (ok) {
            var data_1 = { id: id, nickname: nickname };
            this.sendbox.sendFormat(data_1, "updateNickname", "0");
            localStorage.setItem("netflux-chat-nickname", nickname);
        }
    };
    UserService.prototype.updateNickname = function (data) {
        var nickname = data.nickname;
        var id = data.id;
        function callback(v, i, a) {
            if (v.id == id) {
                v.nickname = nickname;
                return false;
            }
            return true;
        }
        this.users.every(callback);
    };
    UserService.prototype.getIdFromPeerId = function (peerId) {
        var id = '';
        function callback(v, i, a) {
            if (v.peerId == peerId) {
                id = v.id;
                return false;
            }
            return true;
        }
        this.users.every(callback);
        return id;
    };
    UserService.prototype.getUser = function (id) {
        var ret = null;
        function callback(v, i, a) {
            if (v.id == id) {
                ret = v;
                return false;
            }
            return true;
        }
        this.users.every(callback);
        return ret;
    };
    UserService.prototype.getUserFromPeerId = function (id) {
        var ret = null;
        function callback(v, i, a) {
            if (v.peerId == id) {
                ret = v;
                return false;
            }
            return true;
        }
        this.users.every(callback);
        return ret;
    };
    UserService.prototype.sendNickname = function (data) {
        var sendingData = { id: this.currentUserId, nickname: this.getNickname(this.currentUserId) };
        this.sendbox.sendFormat(sendingData, "updateNickname", data.requester);
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
    UserService.prototype.queryForUsers = function () {
        this.sendbox.sendFormat({ requester: this.getUser(this.currentUserId).peerId }, "queryForUsers", '0');
    };
    UserService.prototype.sendUsers = function (data) {
        var _this = this;
        this.users.forEach(function (val, i, arr) {
            _this.sendbox.sendFormat(val, "userInfos", data.requester);
            console.log('sending data : user ', val, ' to ', data);
        });
    };
    UserService.prototype.sendUserInfos = function () {
        var sendingData = this.getUser(this.currentUserId);
        this.sendbox.sendFormat(sendingData, "userInfos", '0');
    };
    UserService.prototype.getColors = function (id) {
        var tab;
        function callback(v, i, a) {
            if (v.id == id) {
                tab = [v.backgroundColor, v.whispColor, v.textColor];
                return false;
            }
            return true;
        }
        this.users.every(callback);
        return tab;
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [sendbox_service_1.SendBox])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map