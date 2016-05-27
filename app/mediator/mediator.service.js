"use strict";
var MediatorService = (function () {
    function MediatorService(userService, messageService) {
        this.userService = userService;
        this.messageService = messageService;
    }
    ;
    MediatorService.prototype.create = function (sigAddress) {
        if (sigAddress === void 0) { sigAddress = 'ws://192.168.0.102:8081'; }
        this.webChannel = new netflux.WebChannel({ signaling: sigAddress });
        this.key = this.webChannel.openForJoining();
        //define webChannel.onJoining and others ...
    };
    MediatorService.prototype.join = function (key, sigAddress) {
        if (sigAddress === void 0) { sigAddress = 'ws://192.168.0.102:8081'; }
        this.webChannel = new netflux.WebChannel({ signaling: sigAddress });
        this.key = key;
        //define webChannel.onJoining and others ...
        this.webChannel.join(key)
            .then(function (wc) {
            this.webChannel.channels.forEach(function (value) {
                //onJoining(value.peerId) need to define onJoining
            });
        });
    };
    MediatorService.prototype.leave = function () {
        this.webChannel.leave();
        //TODO
    };
    //TODO : onJoining, onLeaving, onMessage ...
    MediatorService.prototype.onJoining = function (id) {
        //request nickname
        var name = "Default " + this.userService.users.length;
        this.userService.addUser({ id: id, nickname: name, peerId: id, online: true });
    };
    MediatorService.prototype.onLeaving = function (id) {
    };
    MediatorService.prototype.onMessage = function (id, msg) {
    };
    return MediatorService;
}());
exports.MediatorService = MediatorService;
//# sourceMappingURL=mediator.service.js.map