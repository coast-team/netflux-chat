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
Object.defineProperty(exports, "__esModule", { value: true });
var message_service_1 = require("../message/service/message.service");
var user_service_1 = require("../user/service/user.service");
var user_1 = require("../user/model/user");
var message_1 = require("../message/model/message");
var webchannel_service_1 = require("../webchannel.service");
var core_1 = require("@angular/core");
var index_browser_1 = require("netflux/dist/esm/index.browser");
var webGroupConfig = {
    signalingURL: 'wss://signaling.netflux.coedit.re',
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302'
        }
    ]
};
var MediatorService = (function () {
    function MediatorService(userService, messageService, wcs) {
        this.userService = userService;
        this.messageService = messageService;
        this.wcs = wcs;
    }
    ;
    MediatorService.prototype.create = function (sigAddress) {
        if (sigAddress === void 0) { sigAddress = 'ws://sigver-coastteam.rhcloud.com:8000'; }
        var wc = new index_browser_1.WebGroup(webGroupConfig);
        var self = this;
        wc.onStateChange = function (state) {
            if (state === index_browser_1.WebGroupState.JOINED) {
                self.key = wc.key;
                BootstrapDialog.show({
                    title: 'Chat infos',
                    message: 'Key: "' + self.key + '"<br>Signaling server : "' + sigAddress + '"',
                    closable: true,
                    draggable: true,
                    buttons: [{
                            id: 'btn-ok',
                            label: 'OK',
                            cssClass: 'btn-primary',
                            autospin: false,
                            action: function (dialogRef) {
                                dialogRef.close();
                            }
                        }
                    ]
                });
                self.wcs.setActiveChannel(self.wcs.addWebChannel(wc, self.key, sigAddress));
            }
            else if (state === index_browser_1.WebGroupState.LEFT) {
                (function (id) {
                    self.userService.removeUser(self.userService.getIdFromPeerId(id + ''));
                    console.log('OnClose(id) : ', self.userService.getIdFromPeerId(id + ''));
                });
            }
        };
        //define webChannel.onJoining and others ...
        this.config(wc);
        // ************ //
        var pseudo = localStorage.getItem("netflux-chat-nickname");
        if (pseudo === null)
            pseudo = 'Default ' + wc.myId;
        var id = localStorage.getItem("netflux-chat-id");
        if (id === null) {
            id = wc.myId;
            localStorage.setItem("netflux-chat-id", id);
        }
        this.userService.setCurrentUserId(id);
        this.userService.addUser(new user_1.User(id, wc.myId + '', pseudo));
        this.messageService.appendMessage({ fromIdUser: "0", toIdUser: "0", content: "Welcome to the chat !", date: new Date().getTime() });
        wc.join();
        console.log('WC créé.');
    };
    MediatorService.prototype.join = function (key, sigAddress) {
        if (sigAddress === void 0) { sigAddress = 'ws://sigver-coastteam.rhcloud.com:8000'; }
        var wc = new index_browser_1.WebGroup(webGroupConfig);
        this.key = key;
        this.config(wc);
        var self = this;
        wc.onStateChange = function (state) {
            if (state === index_browser_1.WebGroupState.JOINED) {
                var pseudo = localStorage.getItem("netflux-chat-nickname");
                if (pseudo === null)
                    pseudo = 'Default ' + wc.myId;
                var id = localStorage.getItem("netflux-chat-id");
                if (id === null) {
                    id = wc.myId;
                    localStorage.setItem("netflux-chat-id", id);
                }
                self.userService.setCurrentUserId(id);
                self.userService.addUser(new user_1.User(id, wc.myId + '', pseudo));
                /**
                wc.channels.forEach(function(value) {
                  //onJoining(value.peerId) need to define onJoining
                  wc.onJoining(value.peerId);
                })**/
                self.messageService.queryForHistory();
                self.userService.queryForUsers();
                self.userService.sendUserInfos();
                self.wcs.setActiveChannel(self.wcs.addWebChannel(wc, self.key, sigAddress));
            }
            else if (state === index_browser_1.WebGroupState.LEFT) {
                (function (id) {
                    self.userService.removeUser(self.userService.getIdFromPeerId(id + ''));
                    console.log('OnClose(id) : ', self.userService.getIdFromPeerId(id + ''));
                });
            }
        };
        wc.join(key);
    };
    MediatorService.prototype.config = function (wc) {
        var self = this;
        var onJoining = function (id) {
            /**
            self.userService.addUser({id:id,nickname:"Default "+id,peerId:id,online:true});
      
            wc.sendTo(parseInt(id),JSON.stringify({type:"requestNickname",data:{requester:wc.myId}}));
            **/
        };
        var onMessage = function (id, data, isBroadcast) {
            var receive = JSON.parse(data);
            var type = receive.type;
            var data2 = receive.data;
            console.log('data recu ', data2);
            switch (type) {
                case "message"://{fromIdUser:string (id), toIdUser:string (id, 0 if broadcast), content:string, date:number}
                    self.messageService.insertMessage(message_1.Message.fromJSON(data2));
                    break;
                case "updateNickname":// {id:string, nickname:string}
                    self.userService.updateNickname(data2);
                    break;
                case "requestNickname":// {requester: string}
                    self.userService.sendNickname(data2);
                    console.log('Working on requestNickname');
                    break;
                case "queryForHistory":
                    self.messageService.sendHistory(id + '', data2);
                    break;
                case "userInfos":// {{id: "3180763113", peerId: 3180763113, nickname: "Thomas :smiley_cat:", online: true}}
                    self.userService.addUser(data2);
                    break;
                case "queryForUsers":
                    self.userService.sendUsers(data2);
                    break;
                default: console.log("Not yet implemeted.");
            }
        };
        var onLeaving = function (id) {
            self.userService.removeUser(self.userService.getIdFromPeerId(id + ''));
            console.log('Onleaving(id) : ', self.userService.getIdFromPeerId(id + ''));
        };
        wc.onMemberJoin = onJoining;
        wc.onMemberLeave = onLeaving;
        wc.onMessage = onMessage;
    };
    MediatorService.prototype.leave = function () {
        var wc = this.wcs.getWebChannel(this.wcs.getActiveChannel());
        wc.leave();
    };
    MediatorService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [user_service_1.UserService, message_service_1.MessageService, webchannel_service_1.WebChannelService])
    ], MediatorService);
    return MediatorService;
}());
exports.MediatorService = MediatorService;
//# sourceMappingURL=mediator.service.js.map