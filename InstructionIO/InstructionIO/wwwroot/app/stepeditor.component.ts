﻿import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DragulaService } from "ng2-dragula";
import { ContentBlock } from './model/ContetnBlock';
import { SafeResourceUrl } from "@angular/platform-browser/src/platform-browser";
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from "rxjs/Observable";
import { RequestOptions, Http, Headers } from "@angular/http";
import { Step } from './model/Step';
import { Pipe, PipeTransform } from '@angular/core';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { CustomModal, VideoModalContext } from './patrialComponent/videoModal'
import { LocaleService, Language } from 'angular-l10n';

@Component({
    selector: 'my-stepEditor',
    templateUrl: '/partial/StepEditorComponent',
    styleUrls: ['css/themes/themeCommon.css']
})

export class StepEditorComponent {
    @Input() step: Step = new Step('0');
    @Input() theme: string;
    @Language() lang: string;
    constructor(public modal: Modal, private dragulaService: DragulaService,
        private sanitizer: DomSanitizer, private http: Http, public locale: LocaleService) {
        dragulaService.dropModel.subscribe((value: any) => {
            this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe((value: any) => {
            this.onRemoveModel(value.slice(1));
        });
    }

    private onDropModel(args: any) {
        let [el, target, source] = args;
    }

    private onRemoveModel(args: any) {
        let [el, source] = args;
    }

    textBoxAdd() {
        let n: ContentBlock = new ContentBlock('text');
        this.step.contentBlock.push(n);
    }

    addPictureBox(url: string) {
        let n: ContentBlock = new ContentBlock('img')
        n.content = url;
        this.step.contentBlock.push(n);
    }

    redirectToInput(eleme: HTMLElement) {
        eleme.click();
    }

    textBoxKeyup(n: KeyboardEvent, block: any) {
        let _block = block as ContentBlock;
        _block.content = n.srcElement.innerHTML;
    }

    videoBoxAdd(src: string) {
        let n: ContentBlock = new ContentBlock('video');
        n.content = 'https://www.youtube.com/embed/' + src.slice(src.lastIndexOf('=')+1);
        console.log(n);
        this.step.contentBlock.push(n);
    }

    videoBoxModal() {
        return this.modal.open(CustomModal, overlayConfigFactory({ src: "" }, BSModalContext)).then(resultPromise => {
            return resultPromise.result
                .then(
                () => {
                    console.log(resultPromise.context.src);
                    if (resultPromise.context.src.length > 10) {
                        this.videoBoxAdd(resultPromise.context.src)
                    }
                });
        });
    }
        
    boxDelete(event: ContentBlock) {
        this.step.contentBlock.splice(this.step.contentBlock.indexOf(event), 1);
    }

    saveFile(event: Event) {
        let src: string;
        let elem: HTMLInputElement = event.srcElement as HTMLInputElement;
        let formData: FormData = new FormData();
        if (elem.files.length > 0) {
            formData.append(elem.files[0].name, elem.files[0]);
            this.http.post('/api/StepEditor/Upload', formData).subscribe((data) => this.addPictureBox(data["_body"].replace(/"/g, "")));
        }
    }
}

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(url: any) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
