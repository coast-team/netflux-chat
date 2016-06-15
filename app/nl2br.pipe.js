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
var nl2brPipe = (function () {
    function nl2brPipe() {
    }
    nl2brPipe.prototype.transform = function (value) {
        var ret = value;
        if (ret != undefined)
            ret = ret.replace(/([^(</p>)])(\r\n|\n|\r)/gm, "$1<br />");
        return ret;
    };
    nl2brPipe = __decorate([
        core_1.Pipe({ name: 'nl2br' }), 
        __metadata('design:paramtypes', [])
    ], nl2brPipe);
    return nl2brPipe;
}());
exports.nl2brPipe = nl2brPipe;
//# sourceMappingURL=nl2br.pipe.js.map