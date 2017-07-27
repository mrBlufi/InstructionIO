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
const http_1 = require("@angular/http");
let HomeService = class HomeService {
    constructor(http) {
        this.http = http;
    }
    getPopularTags() {
        return this.http.get('https://localhost:44328/api/datahome/tag').map(res => (res).json());
    }
    getCategories() {
        return this.http.get('https://localhost:44328/api/datahome/categories').map(res => (res).json());
    }
    getInstructionsFull(sort, category, stepSkip) {
        return this.http.get('https://localhost:44328/api/datahome/instruction/' + sort + '/category/' + category + '/' + stepSkip).map(res => (res).json());
    }
    getInstructionsUser(stepSkip) {
        return this.http.get('https://localhost:44328/api/datahome/instruction/user/' + stepSkip).map(res => (res).json());
    }
};
HomeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HomeService);
exports.HomeService = HomeService;
//# sourceMappingURL=HomeService.js.map