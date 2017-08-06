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
const router_1 = require("@angular/router");
const ng2_dragula_1 = require("ng2-dragula");
const platform_browser_1 = require("@angular/platform-browser");
const instruction_Service_1 = require("./service/instruction.Service");
const Home_Service_1 = require("./service/Home.Service");
const http_1 = require("@angular/http");
const Instruction_1 = require("./model/Instruction");
const Step_1 = require("./model/Step");
const TagsRelation_1 = require("./model/TagsRelation");
const Theme_Service_1 = require("./service/Theme.Service");
let InstructionEditorComponent = class InstructionEditorComponent {
    constructor(dragulaService, sanitizer, http, _instructionservice, _homeservice, _ActivatedRoute, router, themeservice) {
        this.dragulaService = dragulaService;
        this.sanitizer = sanitizer;
        this.http = http;
        this._instructionservice = _instructionservice;
        this._homeservice = _homeservice;
        this._ActivatedRoute = _ActivatedRoute;
        this.router = router;
        this.themeservice = themeservice;
        this.Inst = new Instruction_1.Instruction();
        this.tagsArray = new Array();
        this.instvalidate = new InstructionValidate();
        this.viewS = true;
        this.mainSwiperConfig = {
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
            slideActiveClass: 'slide-activMini'
        };
        this.requestAutocompleteItems = (text) => {
            console.log(text);
            return this._instructionservice.tags(text);
        };
        this.theme = this.themeservice.getCookie('theme');
        dragulaService.setOptions('stepD', {
            moves: function (el, container, handle) {
                return !(handle.className.includes('delete'));
            }
        });
    }
    validate() {
        let state = true;
        this.instvalidate = new InstructionValidate();
        if (this.Inst.name == null) {
            this.instvalidate.Name = true;
            state = false;
        }
        if (this.tagsArray.length == 0) {
            this.instvalidate.Tag = true;
            state = false;
        }
        if (this.Inst.category == null) {
            this.instvalidate.Category = true;
            state = false;
        }
        if (this.Inst.previewText.length <= 15) {
            this.instvalidate.PrevievText = true;
            state = false;
        }
        return state;
    }
    nn(event) {
        this.viewS = !this.viewS;
        if (this.viewS) {
            event.srcElement.classList.add('glyphicon-eye-open');
            event.srcElement.classList.remove('glyphicon-eye-close');
        }
        else {
            event.srcElement.classList.add('glyphicon-eye-close');
            event.srcElement.classList.remove('glyphicon-eye-open');
        }
    }
    removeStep(step) {
        this.Inst.step.splice(this.Inst.step.indexOf(step), 1);
        if (!this.miniSwiper.isAtLast)
            this.miniSwiper.prevSlide();
    }
    add() {
        console.log(this.Inst);
        this.Inst.step.push(new Step_1.Step());
        this.mainSwiper.update();
    }
    save() {
        if (this.validate()) {
            if (this.Inst.id == 0)
                this.saveInst();
            else
                this.updateInst();
        }
    }
    onIndexChange(event) {
        this.mainSwiper.setIndex(event);
        this.miniSwiper.setIndex(event);
    }
    ngOnInit() {
        let sub = this._ActivatedRoute.queryParams.subscribe(parmas => {
            this._id = parmas['id'];
        });
        this._instructionservice.get(this._id).subscribe(data => {
            this.Inst = data;
            for (let tagrRelation of this.Inst.tagsRelation) {
                this.tagsArray.push(tagrRelation.tag);
            }
        }, err => console.log(err));
        this._homeservice.getCategories().subscribe(data => {
            this.categories = data;
        }, err => console.log(err));
    }
    ngOnDestroy() {
        this.dragulaService.destroy('stepD');
    }
    saveInst() {
        for (let tag of this.tagsArray) {
            console.log(tag);
            this.Inst.tagsRelation.push(new TagsRelation_1.TagsRelation(tag));
        }
        console.log(this.Inst);
        this._instructionservice.create(this.Inst).subscribe(data => {
            this.router.navigate(['instruction'], { queryParams: { 'id': data['_body'] } });
        });
    }
    updateInst() {
        this._instructionservice.update(this.Inst).subscribe(data => {
            this.router.navigate(['instruction'], { queryParams: { 'id': data['_body'] } });
        });
    }
    saveFile(event) {
        let src;
        let elem = event.srcElement;
        let formData = new FormData();
        formData.append(elem.files[0].name, elem.files[0]);
        this.http.post('/api/StepEditor/Upload', formData).subscribe((data) => {
            this.Inst.previewImage = data["_body"].replace(/"/g, "");
        });
    }
    previwKeyup(n) {
        this.Inst.previewText = n.srcElement.innerHTML;
    }
    redirectToInput(eleme) {
        eleme.click();
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
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InstructionEditorComponent.prototype, "theme", void 0);
InstructionEditorComponent = __decorate([
    core_1.Component({
        selector: 'instructionEditor',
        templateUrl: '/partial/InstructionEditorComponent',
        styleUrls: ['css/themes/themeInstructionEditor.css']
    }),
    __metadata("design:paramtypes", [ng2_dragula_1.DragulaService, platform_browser_1.DomSanitizer, http_1.Http, instruction_Service_1.InstructionService, Home_Service_1.HomeService,
        router_1.ActivatedRoute, router_1.Router, Theme_Service_1.ThemeService])
], InstructionEditorComponent);
exports.InstructionEditorComponent = InstructionEditorComponent;
class InstructionValidate {
    constructor() {
        this.Name = false;
        this.Tag = false;
        this.Category = false;
        this.PrevievText = false;
    }
}
//# sourceMappingURL=instructionEditor.component.js.map