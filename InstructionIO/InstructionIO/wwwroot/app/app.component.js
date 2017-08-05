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
const Theme_Service_1 = require("./service/Theme.Service");
const router_1 = require("@angular/router");
let AppComponent = class AppComponent {
    constructor(titleService, locale, roleservice, profileservice, themeservice, router) {
        this.titleService = titleService;
        this.locale = locale;
        this.roleservice = roleservice;
        this.profileservice = profileservice;
        this.themeservice = themeservice;
        this.router = router;
        this.roleinfo = new RoleData_1.RoleData(-1, false, false);
        this.angularClientSideData = 'Angular';
        roleservice.getDataRole().subscribe(data => {
            this.roleinfo = data;
            this.getImageProfile();
            console.log(this.roleinfo);
        });
        this.theme = this.themeservice.getCookie('theme');
        this.router.events.subscribe((val) => {
            if (val instanceof router_1.NavigationEnd) {
                //update the shared data when this page is being navigated to
                this.theme = this.themeservice.getCookie('theme');
            }
        });
    }
    enterClick() {
        this.router.navigate(['search'], { queryParams: { 'q': this.searchQueryParams } });
    }
    getImageProfile() {
        if (this.roleinfo.id != -1) {
            this.profileservice.getProfileImage(this.roleinfo.id).subscribe(data => {
                this.imageprofile = data["_body"];
                console.log(this.imageprofile);
            });
        }
    }
    settheme(theme) {
        this.themeservice.setcookie(theme);
        window.location.reload();
    }
    setTitle(newTitle) {
        this.titleService.setTitle(newTitle);
    }
    ngOnInit() {
    }
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
        styleUrls: ['css/site_nav.css', 'css/themes/themeapp.css', 'css/appcomponent.css']
    }),
    __metadata("design:paramtypes", [platform_browser_1.Title, angular_l10n_1.LocaleService,
        Role_Service_1.RoleService, Profile_Service_1.ProfileService,
        Theme_Service_1.ThemeService, router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map