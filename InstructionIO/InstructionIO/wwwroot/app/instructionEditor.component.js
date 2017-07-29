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
const ngx_swiper_wrapper_1 = require("ngx-swiper-wrapper");
const core_1 = require("@angular/core");
const ng2_dragula_1 = require("ng2-dragula");
const platform_browser_1 = require("@angular/platform-browser");
const http_1 = require("@angular/http");
let InstructionEditorComponent = class InstructionEditorComponent {
    constructor(dragulaService, sanitizer, http) {
        this.dragulaService = dragulaService;
        this.sanitizer = sanitizer;
        this.http = http;
        this.Steps = [1];
        this.mainSwiperConfig = {
            direction: 'horizontal',
            slidesPerView: '1',
            keyboardControl: true
        };
        this.miniSwiperConfig = {
            direction: 'horizontal',
            slidesPerView: '3',
            slideActiveClass: 'slide-activMini',
            centeredSlides: true,
            keyboardControl: true,
            containerModifierClass: 'miniSwiperContainer'
        };
        console.log(this.mainSwiper);
        dragulaService.setOptions('stepD', {
            moves: function (el, container, handle) {
                return !(handle.className.includes('delete'));
            }
        });
    }
    add() {
        this.Steps.push(Math.random() * 100);
        this.mainSwiper.update();
    }
    del() {
        this.mainSwiper.update();
        if (this.mainSwiper.isAtLast) {
            this.mainSwiper.prevSlide();
        }
        this.Steps.pop();
    }
    onIndexChange(event) {
        this.mainSwiper.setIndex(event);
        this.miniSwiper.setIndex(event);
    }
    ngOnDestroy() {
        this.dragulaService.destroy('stepD');
    }
};
__decorate([
    core_1.ViewChild('mainSwiper'),
    __metadata("design:type", ngx_swiper_wrapper_1.SwiperComponent)
], InstructionEditorComponent.prototype, "mainSwiper", void 0);
__decorate([
    core_1.ViewChild('miniSwiper'),
    __metadata("design:type", ngx_swiper_wrapper_1.SwiperComponent)
], InstructionEditorComponent.prototype, "miniSwiper", void 0);
InstructionEditorComponent = __decorate([
    core_1.Component({
        selector: 'instructionEditor',
        templateUrl: '/partial/InstructionEditorComponent'
    }),
    __metadata("design:paramtypes", [ng2_dragula_1.DragulaService, platform_browser_1.DomSanitizer, http_1.Http])
], InstructionEditorComponent);
exports.InstructionEditorComponent = InstructionEditorComponent;
//# sourceMappingURL=instructionEditor.component.js.map