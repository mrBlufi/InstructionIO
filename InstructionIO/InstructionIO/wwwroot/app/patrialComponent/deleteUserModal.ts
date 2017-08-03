import { Component } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

export class DeleteUserModalContext extends BSModalContext {
    public delete: boolean=false;
}

@Component({
    selector: 'modal-content1',
    templateUrl: '/partial/DeleteUserModalComponent'
})

export class ModalCustom implements CloseGuard, ModalComponent<DeleteUserModalContext> {
    context: DeleteUserModalContext;

    constructor(public dialog: DialogRef<DeleteUserModalContext>) {
        this.context = dialog.context;
        dialog.setCloseGuard(this);
    }

    load(elem: boolean) {
        console.log(elem);
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