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
var WebChannelService = (function () {
    function WebChannelService() {
        this.webChannels = [];
        this.keys = [];
        this.urls = [];
    }
    WebChannelService.prototype.addWebChannel = function (channel, key, url) {
        this.webChannels.push(channel);
        this.keys.push(key);
        this.urls.push(url);
        return this.webChannels.length - 1;
    };
    WebChannelService.prototype.getWebChannel = function (id) {
        return this.webChannels[id];
    };
    WebChannelService.prototype.getAccessData = function (id) {
        return { key: this.keys[id], url: this.urls[id] };
        /**
        if(!this.webChannels[id].isOpen()){
           console.log('OpenForJoining');
           return this.webChannels[id].openForJoining();
         }
        else{
          console.log('getAccess');
          return Promise.resolve(this.webChannels[id].getAccess());
        }
        **/
    };
    WebChannelService.prototype.setActiveChannel = function (id) {
        this.activeChannel = id;
    };
    WebChannelService.prototype.getActiveChannel = function () {
        return this.activeChannel;
    };
    WebChannelService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], WebChannelService);
    return WebChannelService;
}());
exports.WebChannelService = WebChannelService;
//# sourceMappingURL=webchannel.service.js.map