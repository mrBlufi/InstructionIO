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
const Instruction_1 = require("./model/Instruction");
const instruction_Service_1 = require("./service/instruction.Service");
const ngx_swiper_wrapper_1 = require("ngx-swiper-wrapper");
const router_1 = require("@angular/router");
let InstructionView = class InstructionView {
    constructor(_instructionservice, _ActivatedRoute, router) {
        this._instructionservice = _instructionservice;
        this._ActivatedRoute = _ActivatedRoute;
        this.router = router;
        this.instruction = new Instruction_1.Instruction();
        this.mainViewSiper = {
            direction: 'horizontal',
            slidesPerView: '1',
            keyboardControl: true,
            slideActiveClass: 'slide_activMain'
        };
        this.miniSwiperConfig = {
            direction: 'horizontal',
            slidesPerView: '3',
            centeredSlides: true,
            keyboardControl: false,
            slideActiveClass: 'slide_activMin',
            slideDuplicateClass: 'slide-mini',
            slideVisibleClass: 'slide-miniV'
        };
    }
    onIndexChange(event) {
        this.mainSwiper.setIndex(event);
        this.miniSwiper.setIndex(event);
        console.log('kek');
    }
    goToEdit() {
        this.router.navigate(['instructioneditor'], { queryParams: { 'id': this._id } });
    }
    ngOnInit() {
        let sub = this._ActivatedRoute.queryParams.subscribe(parmas => {
            this._id = parmas['id'];
        });
        this._instructionservice.get(this._id).subscribe(data => {
            this.instruction = data;
        }, err => console.log(err));
    }
};
__decorate([
    core_1.ViewChild('mainSwiper'),
    __metadata("design:type", ngx_swiper_wrapper_1.SwiperComponent)
], InstructionView.prototype, "mainSwiper", void 0);
__decorate([
    core_1.ViewChild('miniSwiper'),
    __metadata("design:type", ngx_swiper_wrapper_1.SwiperComponent)
], InstructionView.prototype, "miniSwiper", void 0);
InstructionView = __decorate([
    core_1.Component({
        selector: 'InstructionView',
        templateUrl: '/partial/InstructionView',
        styleUrls: ['./css/instructionView.css', 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.0/css/swiper.min.css']
    }),
    __metadata("design:paramtypes", [instruction_Service_1.InstructionService,
        router_1.ActivatedRoute, router_1.Router])
], InstructionView);
exports.InstructionView = InstructionView;
//# sourceMappingURL=instructionview.component.js.map