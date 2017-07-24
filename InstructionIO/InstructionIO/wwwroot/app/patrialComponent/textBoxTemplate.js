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
var TextBoxTemplate = (function () {
    function TextBoxTemplate(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    Object.defineProperty(TextBoxTemplate.prototype, "getTextContent", {
        get: function () {
            console.log(this.textBox + '  s');
            return this.textBox;
        },
        enumerable: true,
        configurable: true
    });
    TextBoxTemplate.prototype.onkeyUp = function () {
        var element = this.elementRef.nativeElement;
        console.log(element.innerHTML);
        this.textBox = element.innerHTML;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TextBoxTemplate.prototype, "textBox", void 0);
    __decorate([
        core_1.HostBinding("innerHTML"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], TextBoxTemplate.prototype, "getTextContent", null);
    __decorate([
        core_1.HostListener("keypress"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TextBoxTemplate.prototype, "onkeyUp", null);
    TextBoxTemplate = __decorate([
        core_1.Directive({
            selector: '[textBox]'
        }),
        __metadata("design:paramtypes", [core_1.Renderer, core_1.ElementRef])
    ], TextBoxTemplate);
    return TextBoxTemplate;
}());
exports.TextBoxTemplate = TextBoxTemplate;
//# sourceMappingURL=textBoxTemplate.js.map