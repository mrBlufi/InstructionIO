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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var HomeService = (function () {
    function HomeService(http) {
        this.http = http;
    }
    HomeService.prototype.getPopularTags = function () {
        return this.http.get('https://localhost:44328/api/datahome/tag').map(function (res) { return (res).json(); });
    };
    HomeService.prototype.getCategories = function () {
        return this.http.get('https://localhost:44328/api/datahome/categories').map(function (res) { return (res).json(); });
    };
    HomeService.prototype.getInstructionsFirst = function (sort, category, stepSkip) {
        return this.http.get('https://localhost:44328/api/datahome/instruction/' + sort + '/category/' + category + '/' + stepSkip).map(function (res) { return (res).json(); });
    };
    HomeService.prototype.getInstructionsScroll = function () {
        return this.http.get('https://localhost:44328/api/datahome/instruction/scroll').map(function (res) { return (res).json(); });
    };
    return HomeService;
}());
HomeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HomeService);
exports.HomeService = HomeService;
//# sourceMappingURL=HomeService.js.map