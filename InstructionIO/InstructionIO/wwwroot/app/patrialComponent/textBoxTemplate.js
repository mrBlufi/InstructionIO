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
let TextBoxTemplate = class TextBoxTemplate {
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    onkeyUp() {
        let element = this.elementRef.nativeElement;
        console.log(element.innerHTML);
        this.textBox = element.innerHTML;
    }
    get getInnerHtml() {
        return this.textBox;
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextBoxTemplate.prototype, "textBox", void 0);
__decorate([
    core_1.HostListener("keypress"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TextBoxTemplate.prototype, "onkeyUp", null);
__decorate([
    core_1.HostBinding('innerHtml'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TextBoxTemplate.prototype, "getInnerHtml", null);
TextBoxTemplate = __decorate([
    core_1.Directive({
        selector: '[textBox]'
    }),
    __metadata("design:paramtypes", [core_1.Renderer, core_1.ElementRef])
], TextBoxTemplate);
exports.TextBoxTemplate = TextBoxTemplate;
//# sourceMappingURL=textBoxTemplate.js.map