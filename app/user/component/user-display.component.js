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
var user_component_1 = require('./user.component');
var user_service_1 = require('../service/user.service');
var webchannel_service_1 = require('../../webchannel.service');
var UserDisplay = (function () {
    function UserDisplay(userService, wcs) {
        this.userService = userService;
        this.wcs = wcs;
    }
    ;
    UserDisplay.prototype.ngOnInit = function () {
        this.getUsers();
        console.log('Users chargés');
    };
    UserDisplay.prototype.getUsers = function () {
        this.users = this.userService.getUsers();
    };
    UserDisplay.prototype.toggleUser = function () {
        this.isHidden = !this.isHidden;
    };
    UserDisplay.prototype.addUser = function () {
        var wcs = this.wcs;
        var d = wcs.getAccessData(wcs.getActiveChannel()); //.then((d)=>
        BootstrapDialog.show({
            title: 'Invite user',
            message: 'Are you sure to invite new users ?',
            closable: true,
            draggable: true,
            buttons: [{
                    id: 'btn-ok',
                    label: 'Yes',
                    cssClass: 'btn-primary',
                    autospin: false,
                    action: function (dialogRef) {
                        BootstrapDialog.show({
                            title: 'Invite user',
                            message: 'Key: ' + d.key + ' <br>Signaling server : ' + d.url,
                            closable: true,
                            draggable: true,
                            buttons: [{
                                    id: 'btn-ok',
                                    label: 'OK',
                                    cssClass: 'btn-primary',
                                    autospin: false,
                                    action: function (dialogRef) {
                                        dialogRef.close();
                                    }
                                }
                            ]
                        });
                        dialogRef.close();
                    }
                },
                {
                    id: 'btn-cancel',
                    label: 'Cancel',
                    cssClass: 'btn-primary',
                    autospin: false,
                    action: function (dialogRef) {
                        dialogRef.close();
                    }
                }
            ]
        }); //);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], UserDisplay.prototype, "isHidden", void 0);
    UserDisplay = __decorate([
        core_1.Component({
            selector: 'user-display',
            templateUrl: 'app/user/view/user-display.component.html',
            directives: [user_component_1.UserComponent]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, webchannel_service_1.WebChannelService])
    ], UserDisplay);
    return UserDisplay;
}());
exports.UserDisplay = UserDisplay;
//# sourceMappingURL=user-display.component.js.map