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
const Profile_Service_1 = require("./service/Profile.Service");
const angular_l10n_1 = require("angular-l10n");
const RoleData_1 = require("./model/RoleData");
const Role_Service_1 = require("./service/Role.Service");
const http_1 = require("@angular/http");
const Theme_Service_1 = require("./service/Theme.Service");
const bootstrap_1 = require("angular2-modal/plugins/bootstrap");
const deleteUserModal_1 = require("./patrialComponent/deleteUserModal");
const angular2_modal_1 = require("angular2-modal");
let ProfileComponent = class ProfileComponent {
    constructor(modal, _Activatedroute, _router, _profileservice, roleservice, http, themeservice) {
        this.modal = modal;
        this._Activatedroute = _Activatedroute;
        this._router = _router;
        this._profileservice = _profileservice;
        this.roleservice = roleservice;
        this.http = http;
        this.themeservice = themeservice;
        this.user = new UserInfo_1.UserInfo();
        this.roleinfo = new RoleData_1.RoleData(-1, false, false);
        this.userQueryParams = null;
        this.instructions = null;
        this.theme = this.themeservice.getCookie('theme');
        roleservice.getDataRole().subscribe(data => {
            this.roleinfo = data;
        });
    }
    autogrow() {
        let textArea = document.getElementById("interestsBox");
        textArea.style.overflow = 'hidden';
        textArea.style.height = '0';
        textArea.style.height = textArea.scrollHeight + 'px';
    }
    deleteUserModal() {
        return this.modal.open(deleteUserModal_1.ModalCustom, angular2_modal_1.overlayConfigFactory({ delete: false }, bootstrap_1.BSModalContext)).then(resultPromise => {
            return resultPromise.result
                .then(() => this.deluser(resultPromise.context.delete));
        });
    }
    deluser(tag) {
        if (tag) {
            this._profileservice.deleteUserById(this.user.id).subscribe(data => {
                this.user = null;
                this._router.navigate(['home']);
            });
        }
    }
    editDate(id) {
        let elem = document.getElementById(id);
        elem.contentEditable = 'true';
        elem.removeAttribute('disabled');
        elem.focus();
        elem.addEventListener('focusout', function () {
            elem.setAttribute('disabled', 'disabled');
            elem.contentEditable = 'false';
        });
    }
    getDataUser() {
        this._profileservice.getDataProfile(this.userQueryParams).subscribe(data => {
            if (!data) {
                this.user = null;
                this._router.navigate(['home']);
            }
            this.user = data;
            this.getstatistics();
        }, err => console.log('Get me user error'));
    }
    getstatistics() {
        this._profileservice.getstatistics(this.userQueryParams).subscribe(data => {
            this.statisticsuser = data;
        });
    }
    ngOnInit() {
        this.sub = this._Activatedroute.queryParams
            .subscribe(params => {
            this.userQueryParams = params['user'];
            this.getDataUser();
        }, err => console.log(err));
    }
    ngOnDestroy() {
        if (this.user && this.roleinfo.id != -1) {
            console.log(this.user.interests);
            this._profileservice.setProfileData(this.user);
        }
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
        if (this.user && this.roleinfo.id != -1) {
            this.user.interests = document.getElementById('interestsSpan').innerHTML;
            this._profileservice.setProfileData(this.user);
        }
    }
    redirectToInput(eleme) {
        eleme.click();
    }
    saveFile(event) {
        let src;
        let elem = event.srcElement;
        let formData = new FormData();
        formData.append(elem.files[0].name, elem.files[0]);
        this.http.post('/api/StepEditor/Upload', formData).subscribe(data => { this.user.avatar = data["_body"].replace(/"/g, ""); });
    }
};
__decorate([
    angular_l10n_1.Language(),
    __metadata("design:type", String)
], ProfileComponent.prototype, "lang", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ProfileComponent.prototype, "theme", void 0);
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
        styleUrls: ['css/ProfilePage.css', 'css/themes/themeProfile.css', 'css/themes/themeCommon.css']
    }),
    __metadata("design:paramtypes", [bootstrap_1.Modal, router_1.ActivatedRoute,
        router_1.Router, Profile_Service_1.ProfileService, Role_Service_1.RoleService, http_1.Http, Theme_Service_1.ThemeService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map