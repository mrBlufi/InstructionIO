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
const platform_browser_1 = require("@angular/platform-browser");
require("rxjs/add/operator/map");
const angular_l10n_1 = require("angular-l10n");
const Role_Service_1 = require("./service/Role.Service");
const RoleData_1 = require("./model/RoleData");
const Profile_Service_1 = require("./service/Profile.Service");
let AppComponent = class AppComponent {
    constructor(titleService, locale, roleservice, profileservice) {
        this.titleService = titleService;
        this.locale = locale;
        this.roleservice = roleservice;
        this.profileservice = profileservice;
        this.theme = 'light';
        this.roleinfo = new RoleData_1.RoleData(-1, false, false);
        this.angularClientSideData = 'Angular';
        roleservice.getDataRole().subscribe(data => {
            this.roleinfo = data;
            if (this.roleinfo.id != -1) {
                profileservice.getProfileImage(this.roleinfo.id).subscribe(data => {
                    this.imageprofile = data["_body"];
                    console.log(this.imageprofile);
                });
            }
            console.log(this.roleinfo);
        });
    }
    settheme(theme) {
        this.theme = theme;
    }
    setTitle(newTitle) {
        this.titleService.setTitle(newTitle);
    }
    ngOnInit() { }
    selectLanguage(language) {
        this.locale.setCurrentLanguage(language);
    }
};
__decorate([
    angular_l10n_1.Language(),
    __metadata("design:type", String)
], AppComponent.prototype, "lang", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: '/partial/appComponent',
        styleUrls: ['css/site_nav.css', 'css/theme.css']
    }),
    __metadata("design:paramtypes", [platform_browser_1.Title, angular_l10n_1.LocaleService, Role_Service_1.RoleService, Profile_Service_1.ProfileService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map