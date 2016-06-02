"use strict";
var Message = (function () {
    function Message(fromIdUser, toIdUser, content, date) {
        this.fromIdUser = fromIdUser;
        this.toIdUser = toIdUser;
        this.content = content;
        this.date = date;
    }
    Message.fromJSON = function (data) {
        return new Message(data.fromIdUser, data.toIdUser, data.content, data.date);
    };
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=message.js.map