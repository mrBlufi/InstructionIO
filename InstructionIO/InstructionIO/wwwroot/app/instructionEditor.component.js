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
const instruction_Service_1 = require("./service/instruction.Service");
const http_1 = require("@angular/http");
const Instruction_1 = require("./model/Instruction");
const Step_1 = require("./model/Step");
let InstructionEditorComponent = class InstructionEditorComponent {
    constructor(dragulaService, sanitizer, http, _instructionservice) {
        this.dragulaService = dragulaService;
        this.sanitizer = sanitizer;
        this.http = http;
        this._instructionservice = _instructionservice;
        this.Inst = new Instruction_1.Instruction();
        this.mainSwiperConfig = {
            direction: 'horizontal',
            slidesPerView: '1',
            keyboardControl: true
        };
        this.miniSwiperConfig = {
            direction: 'horizontal',
            slidesPerView: '3',
            centeredSlides: true,
            keyboardControl: true,
            slideActiveClass: 'slide-activMini',
            slideClass: 'slide-mini',
            containerModifierClass: 'miniSwiperContainer'
        };
        console.log(this.Inst);
        dragulaService.setOptions('stepD', {
            moves: function (el, container, handle) {
                return !(handle.className.includes('delete'));
            }
        });
    }
    cw(n) {
        console.log(n);
    }
    add() {
        this.Inst.step.push(new Step_1.Step(this.Inst.step[this.Inst.step.length - 1].id + 1));
        this.mainSwiper.update();
    }
    del() {
        this.mainSwiper.update();
        if (this.mainSwiper.isAtLast) {
            this.mainSwiper.prevSlide();
        }
    }
    onIndexChange(event) {
        this.mainSwiper.setIndex(event);
        this.miniSwiper.setIndex(event);
    }
    ngOnInit() {
        this._instructionservice.get('99').subscribe(data => {
            this.Inst = data;
        }, err => console.log(err));
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
    __metadata("design:paramtypes", [ng2_dragula_1.DragulaService, platform_browser_1.DomSanitizer, http_1.Http, instruction_Service_1.InstructionService])
], InstructionEditorComponent);
exports.InstructionEditorComponent = InstructionEditorComponent;
//# sourceMappingURL=instructionEditor.component.js.map