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
const ContentBlock_1 = require("./model/ContentBlock");
const platform_browser_1 = require("@angular/platform-browser");
const http_1 = require("@angular/http");
let StepEditorComponent = class StepEditorComponent {
    constructor(dragulaService, sanitizer, http) {
        this.dragulaService = dragulaService;
        this.sanitizer = sanitizer;
        this.http = http;
        this.contentBlocks = new Array();
        this.stepName = this.randomString();
        dragulaService.setOptions(this.stepName, {
            moves: function (el, container, handle) {
                return !(handle.className.includes('delete'));
            }
        });
        dragulaService.dropModel.subscribe((value) => {
            this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe((value) => {
            this.onRemoveModel(value.slice(1));
        });
    }
    randomString() {
        return (Math.random() * 100).toString();
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
        let n = new ContentBlock_1.ContentBlock('text');
        n.Content = 'sssss';
        this.contentBlocks.push(n);
    }
    addPictureBox(url) {
        let n = new ContentBlock_1.ContentBlock('picture');
        n.Content = url;
        this.contentBlocks.push(n);
    }
    redirectToInput() {
        document.getElementById('fileInput').click();
    }
    videoBoxAdd(input) {
        let n = new ContentBlock_1.ContentBlock('video');
        n.Content = input.value.replace('watch?v=', 'embed/');
        this.contentBlocks.push(n);
    }
    boxDelete(event) {
        this.contentBlocks.splice(this.contentBlocks.indexOf(event), 1);
    }
    safeOn(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    saveFile(input) {
        let res;
        let formData = new FormData();
        formData.append(input.files[0].name, input.files[0]);
        console.info(formData);
        this.http.post('http://localhost:57640/api/StepEditor/Upload', formData).subscribe((data) => this.addPictureBox(data["_body"].replace(/"/g, "")));
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], StepEditorComponent.prototype, "stepName", void 0);
StepEditorComponent = __decorate([
    core_1.Component({
        selector: 'my-stepEditor',
        templateUrl: '/partial/StepEditorComponent'
    }),
    __metadata("design:paramtypes", [ng2_dragula_1.DragulaService, platform_browser_1.DomSanitizer, http_1.Http])
], StepEditorComponent);
exports.StepEditorComponent = StepEditorComponent;
//# sourceMappingURL=stepeditor.component.js.map