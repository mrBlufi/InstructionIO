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
let SearchComponent = class SearchComponent {
    constructor(homeservice, _Activatedroute, themeservice) {
        this.homeservice = homeservice;
        this._Activatedroute = _Activatedroute;
        this.themeservice = themeservice;
        this.tags = null;
        this.theme = this.themeservice.getCookie('theme');
    }
    ngOnInit() {
        this.getTags();
        this.sub = this._Activatedroute.queryParams
            .subscribe(params => {
            this.searchyQueryParams = params['q'];
        }, err => console.log(err));
    }
    getTags() {
        this.homeservice.getPopularTags().subscribe(data => {
            this.tags = data;
        }, err => console.log(err));
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
};
__decorate([
    angular_l10n_1.Language(),
    __metadata("design:type", String)
], SearchComponent.prototype, "lang", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SearchComponent.prototype, "theme", void 0);
SearchComponent = __decorate([
    core_1.Component({
        selector: 'my-search',
        templateUrl: '/partial/searchComponent',
        styleUrls: ['css/blog-home.css', 'css/themes/themeIndexAndSearch.css']
    }),
    __metadata("design:paramtypes", [Home_Service_1.HomeService, router_1.ActivatedRoute, Theme_Service_1.ThemeService])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map