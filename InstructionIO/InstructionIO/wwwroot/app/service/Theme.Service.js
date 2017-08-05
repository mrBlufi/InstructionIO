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
const core_2 = require("angular2-cookie/core");
let ThemeService = class ThemeService {
    constructor(_cookieService) {
        this._cookieService = _cookieService;
        this.theme = 'light';
    }
    setcookie(value) {
        let key = 'theme';
        let opts = {
            expires: new Date('2030-07-19')
        };
        this.put(key, value, opts);
    }
    getCookie(key) {
        let cookie = this._cookieService.get(key);
        if (!cookie)
            return 'light';
        else
            return cookie;
    }
    put(key, value, options) {
        this._cookieService.put(key, value, options);
    }
};
ThemeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_2.CookieService])
], ThemeService);
exports.ThemeService = ThemeService;
//# sourceMappingURL=Theme.Service.js.map