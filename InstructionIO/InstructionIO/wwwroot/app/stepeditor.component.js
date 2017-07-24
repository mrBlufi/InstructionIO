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
var ng2_dragula_1 = require("ng2-dragula");
var ContentBlock_1 = require("./model/ContentBlock");
var StepEditorComponent = (function () {
    function StepEditorComponent(dragulaService) {
        var _this = this;
        this.dragulaService = dragulaService;
        this.contentBlocks = new Array();
        dragulaService.setOptions('textRow', {
            moves: function (el, container, handle) {
                return !(handle.className.includes('delete'));
            }
        });
        dragulaService.dropModel.subscribe(function (value) {
            _this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe(function (value) {
            _this.onRemoveModel(value.slice(1));
        });
    }
    StepEditorComponent.prototype.onDropModel = function (args) {
        var el = args[0], target = args[1], source = args[2];
        console.log(this.contentBlocks);
        // do something else
    };
    StepEditorComponent.prototype.onRemoveModel = function (args) {
        var el = args[0], source = args[1];
        console.log(this.contentBlocks);
        // do something else
    };
    StepEditorComponent.prototype.cw = function (n) {
        console.log(n);
    };
    StepEditorComponent.prototype.textBoxAdd = function () {
        var n = new ContentBlock_1.ContentBlock('text');
        n.Content = 'sssss';
        this.contentBlocks.push(n);
    };
    StepEditorComponent.prototype.pictureBoxAdd = function () {
        var n = new ContentBlock_1.ContentBlock('picture');
        n.Content = 'https://i.stack.imgur.com/1pQk8.jpg';
        this.contentBlocks.push(n);
    };
    StepEditorComponent.prototype.boxDelete = function (event) {
        this.contentBlocks.splice(this.contentBlocks.indexOf(event), 1);
    };
    StepEditorComponent = __decorate([
        core_1.Component({
            selector: 'my-stepEditor',
            templateUrl: '/partial/StepEditorComponent'
        }),
        __metadata("design:paramtypes", [ng2_dragula_1.DragulaService])
    ], StepEditorComponent);
    return StepEditorComponent;
}());
exports.StepEditorComponent = StepEditorComponent;
//# sourceMappingURL=stepeditor.component.js.map