import { Component } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { LocaleService, Language } from 'angular-l10n';

export class DeleteInstructionModalContext extends BSModalContext {
    public delete: boolean = false;
}

@Component({
    selector: 'modal-content1',
    templateUrl: '/partial/DeleteInstructionModalComponent'
})

export class InstructionCustom implements CloseGuard, ModalComponent<DeleteInstructionModalContext> {

    context: DeleteInstructionModalContext;
    @Language() lang: string;

    constructor(public dialog: DialogRef<DeleteInstructionModalContext>) {
        this.context = dialog.context;
        dialog.setCloseGuard(this);
    }

    load(elem: boolean) {
        this.context.delete = elem;
        this.dialog.close();
    }

    modalClose() {
        this.dialog.close();
    }

    beforeDismiss(): boolean {
        return true;
    }

    beforeClose(): boolean {
        return false;
    }
}