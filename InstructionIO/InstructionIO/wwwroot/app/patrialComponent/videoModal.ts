import { Component } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { LocaleService, Language } from 'angular-l10n';
export class VideoModalContext extends BSModalContext {
    public src: string;
}

@Component({
    selector: 'modal-content',
    templateUrl: '/partial/VideoModalComponent'
})

export class CustomModal implements CloseGuard, ModalComponent<VideoModalContext> {
    context: VideoModalContext;
    @Language() lang: string;
    constructor(public dialog: DialogRef<VideoModalContext>) {
        this.context = dialog.context;
        dialog.setCloseGuard(this);
    }

    load(elem: HTMLElement) {
        console.log(elem);
        let input: HTMLInputElement = elem as HTMLInputElement;
        this.context.src = input.value;
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