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
const Step_1 = require("./model/Step");
const angular_l10n_1 = require("angular-l10n");
let StepView = class StepView {
    constructor(locale) {
        this.locale = locale;
        this.step = new Step_1.Step('0');
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Step_1.Step)
], StepView.prototype, "step", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], StepView.prototype, "theme", void 0);
__decorate([
    angular_l10n_1.Language(),
    __metadata("design:type", String)
], StepView.prototype, "lang", void 0);
StepView = __decorate([
    core_1.Component({
        selector: 'stepView',
        templateUrl: '/partial/StepComponent',
        styleUrls: ['css/themes/themeStepView.css', 'css/themes/themeCommon.css']
    }),
    __metadata("design:paramtypes", [angular_l10n_1.LocaleService])
], StepView);
exports.StepView = StepView;
//# sourceMappingURL=stepView.component.js.map