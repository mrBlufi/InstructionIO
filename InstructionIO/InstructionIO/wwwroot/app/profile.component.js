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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const UserInfo_1 = require("./model/UserInfo");
const router_1 = require("@angular/router");
require("rxjs/add/operator/filter");
const ProfileService_1 = require("./service/ProfileService");
const angular_l10n_1 = require("angular-l10n");
let ProfileComponent = class ProfileComponent {
    constructor(_Activatedroute, _router, _profileservice) {
        this._Activatedroute = _Activatedroute;
        this._router = _router;
        this._profileservice = _profileservice;
        this.user = new UserInfo_1.UserInfo(0, 'FullName', new Date(2012, 12, 12), '', '', '');
        this.userQueryParams = null;
        this.instructions = null;
    }
    editDate(id) {
        let elem = document.getElementById(id);
        elem.removeAttribute('disabled');
        elem.focus();
        elem.addEventListener('focusout', function () {
            elem.setAttribute('disabled', 'disabled');
        });
    }
    getDataUser() {
        this._profileservice.getDataProfile(this.userQueryParams).subscribe(data => {
            this.user = data;
        }, err => console.log('Get me user error'));
    }
    ngOnInit() {
        this.sub = this._Activatedroute.queryParams
            .subscribe(params => {
            this.userQueryParams = params['user'];
            this.getDataUser();
            console.log('Query params ', this.userQueryParams);
        }, err => console.log(err));
    }
    ngOnDestroy() {
        console.log('destroy and user', this.user);
        this._profileservice.setProfileData(this.user);
        this.sub.unsubscribe();
    }
    parseDate(dateString) {
        if (dateString) {
            return new Date(dateString);
        }
        else {
            return null;
        }
    }
    beforeUnload(event) {
        this._profileservice.setProfileData(this.user);
    }
};
__decorate([
    angular_l10n_1.Language(),
    __metadata("design:type", String)
], ProfileComponent.prototype, "lang", void 0);
__decorate([
    core_1.HostListener('window:beforeunload', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfileComponent.prototype, "beforeUnload", null);
ProfileComponent = __decorate([
    core_1.Component({
        selector: 'my-profile',
        templateUrl: '/partial/profileComponent',
        styleUrls: ['css/ProfilePage.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router, ProfileService_1.ProfileService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map