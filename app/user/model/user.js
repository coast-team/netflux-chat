"use strict";
var User = (function () {
    function User(id, peerId, nickname) {
        this.id = id;
        this.peerId = peerId;
        this.nickname = nickname;
        this.online = true;
        var rdm = function (min, max, step) {
            return min + (step * Math.floor(Math.random() * (max - min) / step));
        };
        var scheme = new ColorScheme;
        var hue = rdm(0, 360, 1);
        scheme.web_safe(true)
            .from_hue(hue) //random number between 0 and 360 with step
            .scheme('contrast')
            .variation('light');
        var colors = scheme.colors();
        console.log('colors : ', colors);
        var bg = rdm(0, 3, 1);
        var whisp = rdm(0, 3, 1);
        while (whisp == bg) {
            whisp = rdm(0, 3, 1);
        }
        //let possible = [0,3,4,7];//avoid 1,2,5 and 6 that are white with 'light' scheme or too dark
        this.backgroundColor = colors[bg];
        this.textColor = colors[7];
        this.whispColor = colors[whisp];
    }
    User.prototype.getColors = function () {
        return [this.backgroundColor, this.whispColor, this.textColor];
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map