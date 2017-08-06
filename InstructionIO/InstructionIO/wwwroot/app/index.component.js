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
const Home_Service_1 = require("./service/Home.Service");
const angular_l10n_1 = require("angular-l10n");
const router_1 = require("@angular/router");
const Theme_Service_1 = require("./service/Theme.Service");
let IndexComponent = class IndexComponent {
    constructor(homeservice, route, themeservice) {
        this.homeservice = homeservice;
        this.route = route;
        this.themeservice = themeservice;
        this.tags = null;
        this.categories = null;
        this.categoryQueryParams = 'Full';
    }
    ngOnInit() {
        this.theme = this.themeservice.getCookie('theme');
        this.getTags();
        this.getCategories();
    }
    ngOnDestroy() {
    }
    getTags() {
        this.homeservice.getPopularTags().subscribe(data => {
            this.tags = data;
            console.log(this.tags);
        }, err => console.log(err));
    }
    getCategories() {
        this.homeservice.getCategories().subscribe(data => {
            this.categories = data;
        }, err => console.log(err));
    }
};
__decorate([
    angular_l10n_1.Language(),
    __metadata("design:type", String)
], IndexComponent.prototype, "lang", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], IndexComponent.prototype, "theme", void 0);
IndexComponent = __decorate([
    core_1.Component({
        selector: 'my-index',
        templateUrl: '/partial/indexComponent',
        styleUrls: ['css/blog-home.css', 'css/themes/themeIndexAndSearch.css']
    }),
    __metadata("design:paramtypes", [Home_Service_1.HomeService, router_1.ActivatedRoute, Theme_Service_1.ThemeService])
], IndexComponent);
exports.IndexComponent = IndexComponent;
//# sourceMappingURL=index.component.js.map