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
const http_2 = require("@angular/http");
let ProfileService = class ProfileService {
    constructor(http) {
        this.http = http;
    }
    getDataProfile(userparams) {
        console.log(userparams);
        return this.http.get('https://localhost:44328/api/profile/user/' + userparams).map(res => (res).json());
    }
    getInstructions(userparams, stepSkip) {
        console.log(userparams);
        return this.http.get('https://localhost:44328/api/profile/instruction/user/' + userparams + '/' + stepSkip).map(res => (res).json());
    }
    setProfileData(obj) {
        const body = JSON.stringify(obj);
        let headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        return this.http.post('https://localhost:44328/api/profile/user/update', body, { headers: headers }).subscribe((data) => {
            console.log('Response received');
            console.log(data);
        }, (err) => { console.log('Error'); }, () => console.log('Authentication Complete'));
    }
};
ProfileService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=Profile.Service.js.map