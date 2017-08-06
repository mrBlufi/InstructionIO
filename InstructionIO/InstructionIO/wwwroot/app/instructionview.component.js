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
const Home_Service_1 = require("./service/Home.Service");
const Role_Service_1 = require("./service/Role.Service");
const RoleData_1 = require("./model/RoleData");
const Theme_Service_1 = require("./service/Theme.Service");
let InstructionView = class InstructionView {
    constructor(_instructionservice, _ActivatedRoute, homeservice, roleservice, themeservice, router) {
        this._instructionservice = _instructionservice;
        this._ActivatedRoute = _ActivatedRoute;
        this.homeservice = homeservice;
        this.roleservice = roleservice;
        this.themeservice = themeservice;
        this.router = router;
        this.instruction = new Instruction_1.Instruction();
        this.roleinfo = new RoleData_1.RoleData(-1, false, false);
        this.mainViewSiper = {
            direction: 'horizontal',
            slidesPerView: '1',
            keyboardControl: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev'
        };
        this.miniSwiperConfig = {
            direction: 'horizontal',
            slidesPerView: '5',
            centeredSlides: true,
            keyboardControl: false,
            slideActiveClass: 'slide-activMini',
            slideDuplicateClass: 'slide-mini',
            slideVisibleClass: 'slide-miniV'
        };
        this.theme = this.themeservice.getCookie('theme');
        roleservice.getDataRole().subscribe(data => {
            this.roleinfo = data;
        });
    }
    onClick($event, idI) {
        this.onClickResult = $event;
        if (this.roleinfo.id != -1)
            this.homeservice.setRating(idI, this.roleinfo.id, $event.rating);
    }
    ;
    setrating(ratingRelation) {
        if (!ratingRelation || ratingRelation.length == 0)
            return 0;
        let rating = 0;
        for (var i = 0; i < ratingRelation.length; i++) {
            rating += ratingRelation[i].value;
        }
        return rating / ratingRelation.length;
    }
    onIndexChange(event) {
        this.mainSwiper.setIndex(event);
        this.miniSwiper.setIndex(event);
    }
    goToEdit() {
        this.router.navigate(['instructioneditor'], { queryParams: { 'id': this._id } });
    }
    ngOnInit() {
        let sub = this._ActivatedRoute.queryParams.subscribe(parmas => {
            this._id = parmas['id'];
        });
        this._instructionservice.getfull(this._id).subscribe(data => {
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
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InstructionView.prototype, "theme", void 0);
InstructionView = __decorate([
    core_1.Component({
        selector: 'InstructionView',
        templateUrl: '/partial/InstructionView',
        styleUrls: ['./css/instructionView.css', 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.0/css/swiper.min.css', 'css/themes/themeInstructionView.css']
    }),
    __metadata("design:paramtypes", [instruction_Service_1.InstructionService,
        router_1.ActivatedRoute, Home_Service_1.HomeService,
        Role_Service_1.RoleService, Theme_Service_1.ThemeService, router_1.Router])
], InstructionView);
exports.InstructionView = InstructionView;
//# sourceMappingURL=instructionview.component.js.map