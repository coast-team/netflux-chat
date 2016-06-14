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
var UntagPipe = (function () {
    function UntagPipe() {
    }
    UntagPipe.prototype.transform = function (value) {
        var ret = value;
        if (ret != undefined)
            ret = ret.replace(/</g, '&lt;');
        if (ret != undefined)
            ret = ret.replace(/(\r\n|\n|\r)/gm, "<br />");
        return ret;
    };
    UntagPipe = __decorate([
        core_1.Pipe({ name: 'untag' }), 
        __metadata('design:paramtypes', [])
    ], UntagPipe);
    return UntagPipe;
}());
exports.UntagPipe = UntagPipe;
//# sourceMappingURL=untag.pipe.js.map