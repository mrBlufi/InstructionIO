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
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
let InstructionService = class InstructionService {
    constructor(http) {
        this.http = http;
    }
    get(id) {
        let params = new http_2.URLSearchParams();
        if (id) {
            params.set('id', id);
        }
        return this.http.get('api/Instruction/get', { params: params }).map(res => (res).json());
    }
    update(instruction) {
        return this.http.post('api/Instruction/update', instruction);
    }
    create(instruction) {
        return this.http.post('api/Instruction/create', instruction);
    }
};
InstructionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], InstructionService);
exports.InstructionService = InstructionService;
//# sourceMappingURL=instruction.Service.js.map