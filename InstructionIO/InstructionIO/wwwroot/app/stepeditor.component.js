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
const ng2_dragula_1 = require("ng2-dragula");
const ContetnBlock_1 = require("./model/ContetnBlock");
const platform_browser_1 = require("@angular/platform-browser");
const http_1 = require("@angular/http");
const Step_1 = require("./model/Step");
const angular2_modal_1 = require("angular2-modal");
const bootstrap_1 = require("angular2-modal/plugins/bootstrap");
const videoModal_1 = require("./patrialComponent/videoModal");
let StepEditorComponent = class StepEditorComponent {
    constructor(modal, dragulaService, sanitizer, http) {
        this.modal = modal;
        this.dragulaService = dragulaService;
        this.sanitizer = sanitizer;
        this.http = http;
        this.step = new Step_1.Step('0');
        //dragulaService.setOptions(this.step.id, {
        //    moves: function (el: any, container: any, handle: any) {
        //        return !(handle.className.includes('delete'));
        //    }
        //});
        dragulaService.dropModel.subscribe((value) => {
            this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe((value) => {
            this.onRemoveModel(value.slice(1));
        });
    }
    onDropModel(args) {
        let [el, target, source] = args;
        // do something else
    }
    onRemoveModel(args) {
        let [el, source] = args;
        // do something else
    }
    cw(n) {
        console.log(n);
    }
    textBoxAdd() {
        let n = new ContetnBlock_1.ContentBlock('text'); //, this.sanitizer);
        this.step.contentBlock.push(n);
    }
    addPictureBox(url) {
        let n = new ContetnBlock_1.ContentBlock('img');
        n.content = url;
        this.step.contentBlock.push(n);
    }
    redirectToInput(eleme) {
        eleme.click();
    }
    loadTextBox(n) {
        console.log(n);
    }
    textBoxKeyup(n, block) {
        let _block = block;
        _block.content = n.srcElement.innerHTML;
    }
    videoBoxAdd(src) {
        let n = new ContetnBlock_1.ContentBlock('video');
        n.content = 'https://www.youtube.com/embed/' + src.slice(src.indexOf('/'));
        this.step.contentBlock.push(n);
    }
    videoBoxModal() {
        return this.modal.open(videoModal_1.CustomModal, angular2_modal_1.overlayConfigFactory({ src: "" }, bootstrap_1.BSModalContext)).then(resultPromise => {
            return resultPromise.result
                .then(() => this.videoBoxAdd(resultPromise.context.src));
        });
    }
    boxDelete(event) {
        this.step.contentBlock.splice(this.step.contentBlock.indexOf(event), 1);
    }
    saveFile(event) {
        let src;
        let elem = event.srcElement;
        let formData = new FormData();
        formData.append(elem.files[0].name, elem.files[0]);
        this.http.post('/api/StepEditor/Upload', formData).subscribe((data) => this.addPictureBox(data["_body"].replace(/"/g, "")));
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Step_1.Step)
], StepEditorComponent.prototype, "step", void 0);
StepEditorComponent = __decorate([
    core_1.Component({
        selector: 'my-stepEditor',
        templateUrl: '/partial/StepEditorComponent'
    }),
    __metadata("design:paramtypes", [bootstrap_1.Modal, ng2_dragula_1.DragulaService, platform_browser_1.DomSanitizer, http_1.Http])
], StepEditorComponent);
exports.StepEditorComponent = StepEditorComponent;
//# sourceMappingURL=stepeditor.component.js.map