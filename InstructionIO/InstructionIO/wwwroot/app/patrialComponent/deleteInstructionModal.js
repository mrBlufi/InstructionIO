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
const angular2_modal_1 = require("angular2-modal");
const bootstrap_1 = require("angular2-modal/plugins/bootstrap");
const angular_l10n_1 = require("angular-l10n");
class DeleteInstructionModalContext extends bootstrap_1.BSModalContext {
    constructor() {
        super(...arguments);
        this.delete = false;
    }
}
exports.DeleteInstructionModalContext = DeleteInstructionModalContext;
let InstructionCustom = class InstructionCustom {
    constructor(dialog) {
        this.dialog = dialog;
        this.context = dialog.context;
        dialog.setCloseGuard(this);
    }
    load(elem) {
        this.context.delete = elem;
        this.dialog.close();
    }
    modalClose() {
        this.dialog.close();
    }
    beforeDismiss() {
        return true;
    }
    beforeClose() {
        return false;
    }
};
__decorate([
    angular_l10n_1.Language(),
    __metadata("design:type", String)
], InstructionCustom.prototype, "lang", void 0);
InstructionCustom = __decorate([
    core_1.Component({
        selector: 'modal-content1',
        templateUrl: '/partial/DeleteInstructionModalComponent'
    }),
    __metadata("design:paramtypes", [angular2_modal_1.DialogRef])
], InstructionCustom);
exports.InstructionCustom = InstructionCustom;
//# sourceMappingURL=deleteInstructionModal.js.map