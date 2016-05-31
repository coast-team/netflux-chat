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
var chat_display_component_1 = require('./chat-display.component');
var user_display_component_1 = require('./user/component/user-display.component');
var message_service_1 = require('./message/service/message.service');
var user_service_1 = require('./user/service/user.service');
var mediator_service_1 = require('./mediator/mediator.service');
var AppComponent = (function () {
    function AppComponent(messageService, userService, mediator) {
        this.messageService = messageService;
        this.userService = userService;
        this.mediator = mediator;
        this.hideUserList = true;
        this.lastMessage = function () {
            return this.messageService.getLastMessage();
        };
    }
    ;
    AppComponent.prototype.toggleUser = function (element) {
        this.hideUserList = !this.hideUserList;
    };
    AppComponent.prototype.ngOnInit = function () {
        var us = this.userService;
        var med = this.mediator;
        BootstrapDialog.show({
            title: 'Sign in!',
            message: "If joining, key: <input id=\"key\" type=\"text\" class=\"form-control\">",
            closable: false,
            draggable: true,
            buttons: [{
                    id: 'btn-create',
                    label: 'Create',
                    cssClass: 'btn-primary',
                    autospin: false,
                    action: function (dialogRef) {
                        //let nom=dialogRef.getModalBody().find('#nickname').val();
                        //let id=dialogRef.getModalBody().find('#ID').val();
                        //if(nom==='') nom = 'Default';
                        med.create();
                        console.log('button create');
                        dialogRef.close();
                    }
                },
                {
                    id: 'btn-join',
                    label: 'Join',
                    cssClass: 'btn-primary',
                    autospin: false,
                    action: function (dialogRef) {
                        var key = dialogRef.getModalBody().find('#key').val();
                        //let id=dialogRef.getModalBody().find('#ID').val();
                        //if(nom==='') nom = 'Default';
                        med.join(key);
                        console.log('button join');
                        dialogRef.close();
                    }
                }
            ]
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.component.html',
            directives: [chat_display_component_1.ChatDisplay, user_display_component_1.UserDisplay]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService, user_service_1.UserService, mediator_service_1.MediatorService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map