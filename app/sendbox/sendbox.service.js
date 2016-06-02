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
var webchannel_service_1 = require('../webchannel.service');
var SendBox = (function () {
    function SendBox(wcs) {
        this.wcs = wcs;
    }
    SendBox.prototype.sendFormat = function (data, type, id) {
        var wc = this.wcs.getWebChannel(this.wcs.getActiveChannel());
        var toSend;
        toSend = JSON.stringify({ type: type, data: data });
        if (id === '0') {
            wc.send(toSend);
        }
        else {
            wc.sendTo(parseInt(id), toSend);
        }
    };
    SendBox = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [webchannel_service_1.WebChannelService])
    ], SendBox);
    return SendBox;
}());
exports.SendBox = SendBox;
//# sourceMappingURL=sendbox.service.js.map