import { Component, Input, OnInit } from '@angular/core';
import { DragulaService } from "ng2-dragula";
import { ContentBlock } from './model/ContetnBlock';
import { SafeResourceUrl } from "@angular/platform-browser/src/platform-browser";
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from "rxjs/Observable";
import { RequestOptions, Http, Headers } from "@angular/http";
import { Step } from './model/Step';
import { SafeHtml } from './tools/safeHtml';
import { Pipe, PipeTransform } from '@angular/core';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { CustomModal, CustomModalContext } from './patrialComponent/videoModal'


@Component({
    selector: 'my-stepEditor',
    templateUrl: '/partial/StepEditorComponent'
})
export class StepEditorComponent {
    @Input() step: Step = new Step('0');

    randomString(): string {
        return (Math.random() * 100).toString();
    }

    constructor(public modal: Modal,private dragulaService: DragulaService, private sanitizer: DomSanitizer, private http: Http) {
        //dragulaService.setOptions(this.step.id, {
        //    moves: function (el: any, container: any, handle: any) {
        //        return !(handle.className.includes('delete'));
        //    }
        //});
        dragulaService.dropModel.subscribe((value: any) => {
            this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe((value: any) => {
            this.onRemoveModel(value.slice(1));
        });
    }

    private onDropModel(args: any) {
        let [el, target, source] = args;
        // do something else
    }

    private onRemoveModel(args: any) {
        let [el, source] = args;
        // do something else
    }
    
    cw(n: any) {
        console.log(n);
    }

    textBoxAdd() {
        let n: ContentBlock = new ContentBlock('text', this.sanitizer);
        this.step.contentBlock.push(n);
    }

    addPictureBox(url: string) {
        let n: ContentBlock = new ContentBlock('img', this.sanitizer);
        n.content = url;
        this.step.contentBlock.push(n);
    }

    redirectToInput(eleme: HTMLElement) {
        eleme.click();
    }

    videoBoxAdd(input: HTMLInputElement) {
        let n: ContentBlock = new ContentBlock('video', this.sanitizer);
        n.content = input.value.replace('watch?v=', 'embed/');
        this.step.contentBlock.push(n);
    }

    videoBoxModal() {
        return this.modal.open(CustomModal, overlayConfigFactory({ num1: 2, num2: 3 }, BSModalContext));
    }

    boxDelete(event: ContentBlock) {
        this.step.contentBlock.splice(this.step.contentBlock.indexOf(event), 1);
    }

    saveFile(event: Event) {
        let src: string;
        let elem: HTMLInputElement = event.srcElement as HTMLInputElement;
        let formData: FormData = new FormData();
        formData.append(elem.files[0].name, elem.files[0]);
        this.http.post('/api/StepEditor/Upload', formData).subscribe((data) => this.addPictureBox(data["_body"].replace(/"/g,"")));
    }
}
