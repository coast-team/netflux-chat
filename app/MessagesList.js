"use strict";
var MessagesList = (function () {
    function MessagesList() {
        this.messages = [{ fromIdUser: "0", toIdUser: "-1", content: "Starting the app ...", date: -1 }];
    }
    MessagesList.prototype.append = function (msg) {
        this.messages.push(msg);
        return { timestamp: msg.date, id: msg.fromIdUser };
    };
    MessagesList.prototype.insert = function (id, msg) {
        console.log('appel à insert ! this.messages.length-1', this.messages.length - 1);
        console.log('msg dans insert : ', msg);
        for (var i = this.messages.length - 1; i >= 0; i--) {
            if (this.messages[i].date <= id.timestamp) {
                if (this.messages[i].date == id.timestamp && parseInt(this.messages[i].fromIdUser) != parseInt(id.id)) {
                    if (parseInt(this.messages[i].fromIdUser) > parseInt(msg.fromIdUser)) {
                        this.messages.splice(i + 1, 0, msg);
                    }
                    else
                        this.messages.splice(i, 0, msg);
                }
                else
                    this.messages.splice(i + 1, 0, msg);
                console.log('add message : ', msg);
                return;
            }
        }
    };
    MessagesList.prototype.get = function () {
        return this.messages;
    };
    MessagesList.prototype.getSince = function (parameter) {
        return this.messages.filter(function (val, i, arr) {
            return val.date >= parameter.timestamp;
        });
    };
    MessagesList.prototype.getStartForHistory = function () {
        return { timestamp: this.messages[this.messages.length - 1].date, id: this.messages[this.messages.length - 1].fromIdUser };
    };
    return MessagesList;
}());
exports.MessagesList = MessagesList;
var TimestampId = (function () {
    function TimestampId() {
    }
    return TimestampId;
}());
exports.TimestampId = TimestampId;
//# sourceMappingURL=MessagesList.js.map