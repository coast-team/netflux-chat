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
var message_service_1 = require('../message/service/message.service');
var user_service_1 = require('../user/service/user.service');
var message_1 = require('../message/model/message');
var webchannel_service_1 = require('../webchannel.service');
var core_1 = require('@angular/core');
var MediatorService = (function () {
    function MediatorService(userService, messageService, wcs) {
        this.userService = userService;
        this.messageService = messageService;
        this.wcs = wcs;
    }
    ;
    MediatorService.prototype.create = function (sigAddress) {
        var _this = this;
        if (sigAddress === void 0) { sigAddress = 'ws://' + location.hostname + ':8000'; }
        var wc = new netflux.WebChannel({ signaling: sigAddress });
        var f = function (obj) {
            console.log('obj : ', obj);
            _this.key = obj.key;
            alert('key = ' + _this.key);
        };
        wc.openForJoining().then(f);
        //define webChannel.onJoining and others ...
        this.config(wc);
        // ************ //
        this.userService.setCurrentUserId(wc.myId);
        this.userService.addUser({ id: wc.myId, peerId: wc.myId, nickname: 'Default ' + wc.myId, online: true });
        this.wcs.setActiveChannel(this.wcs.addWebChannel(wc));
        console.log('WC créé.');
    };
    MediatorService.prototype.join = function (key, sigAddress) {
        if (sigAddress === void 0) { sigAddress = 'ws://' + location.hostname + ':8000'; }
        var wc = new netflux.WebChannel({ signaling: sigAddress });
        this.key = key;
        this.config(wc);
        var self = this;
        wc.join(key).then(function () {
            self.userService.setCurrentUserId(wc.myId);
            self.userService.addUser({ id: wc.myId, peerId: wc.myId, nickname: 'Default ' + wc.myId, online: true });
            wc.channels.forEach(function (value) {
                //onJoining(value.peerId) need to define onJoining
                self.onJoining(value.peerId);
                console.log('Ajout du user : ', value.peerId);
            });
        });
        this.wcs.setActiveChannel(this.wcs.addWebChannel(wc));
    };
    MediatorService.prototype.config = function (wc) {
        var self = this;
        var onJoining = function (id) {
            //request nickname to do
            var name = "Default " + id;
            self.userService.addUser({ id: id, nickname: name, peerId: id, online: true });
            self.messageService.addMessage({ fromIdUser: "0", toIdUser: "0", content: "Default " + id + " is joining.", date: new Date() });
        };
        var onMessage = function (id, data, isBroadcast) {
            var receive = JSON.parse(data);
            var type = receive.type;
            var data2 = receive.data;
            switch (type) {
                case "message":
                    var toIdUser = isBroadcast ? self.userService.currentUserId : "0";
                    console.log('data recu apres from json', message_1.Message.fromJSON(data2));
                    self.messageService.addMessage(message_1.Message.fromJSON(data2));
                    break;
                default: console.log("Not yet implemeted.");
            }
        };
        var onLeaving = function (id) {
            self.userService.remUser(id);
            self.messageService.addMessage({ fromIdUser: "0", toIdUser: "0", content: "Default " + id + " is leaving.", date: new Date() });
        };
        wc.onJoining = onJoining;
        wc.onLeave = onLeaving;
        wc.onMessage = onMessage;
    };
    /**
      leave(){
        this.webChannel.leave();
        //TODO
      }**/
    //TOTEST : onJoining, onLeaving, onMessage ...
    MediatorService.prototype.onJoining = function (id) {
        //request nickname to do
        var name = "Default " + id;
        this.userService.addUser({ id: id, nickname: name, peerId: id, online: true });
    };
    MediatorService.prototype.onLeaving = function (id) {
        this.userService.remUser(id);
    };
    MediatorService.prototype.onMessage = function (id, data, isBroadcast) {
        var toIdUser = isBroadcast ? "0" : this.userService.currentUserId;
        this.messageService.addMessage({ fromIdUser: id, toIdUser: toIdUser, content: data, date: new Date() });
    };
    MediatorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [user_service_1.UserService, message_service_1.MessageService, webchannel_service_1.WebChannelService])
    ], MediatorService);
    return MediatorService;
}());
exports.MediatorService = MediatorService;
//# sourceMappingURL=mediator.service.js.map