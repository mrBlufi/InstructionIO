import { Component, Input } from '@angular/core';
import { DragulaService } from "ng2-dragula";
import { ContentBlock } from './model/ContentBlock';
import { SafeResourceUrl } from "@angular/platform-browser/src/platform-browser";
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from "rxjs/Observable";
import { RequestOptions, Http, Headers } from "@angular/http";


@Component({
    selector: 'my-stepEditor',
    templateUrl: '/partial/StepEditorComponent'
})
export class StepEditorComponent {
    public contentBlocks: ContentBlock[] = new Array();
    @Input() stepName: string;

    randomString(): string {
        return (Math.random() * 100).toString();
    }

    constructor(private dragulaService: DragulaService, private sanitizer: DomSanitizer, private http: Http) {
        this.stepName = this.randomString();
        dragulaService.setOptions(this.stepName, {
            moves: function (el: any, container: any, handle: any) {
                return !(handle.className.includes('delete'));
            }
        });
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
        let n: ContentBlock = new ContentBlock('text');
        n.Content = 'sssss';
        this.contentBlocks.push(n);
    }

    addPictureBox(url: string) {
        let n: ContentBlock = new ContentBlock('picture');
        n.Content = url;
        this.contentBlocks.push(n);
    }

    redirectToInput() {
        document.getElementById('fileInput').click();
    }

    videoBoxAdd(input: HTMLInputElement) {
        let n: ContentBlock = new ContentBlock('video');
        n.Content = input.value.replace('watch?v=', 'embed/');
        this.contentBlocks.push(n);
    }

    boxDelete(event: ContentBlock) {
        this.contentBlocks.splice(this.contentBlocks.indexOf(event), 1);
    }

    safeOn(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    saveFile(input: HTMLInputElement) {
        let res: any;
        let formData: FormData = new FormData();
        formData.append(input.files[0].name, input.files[0]);
        console.info(formData);
        this.http.post('http://localhost:57640/api/StepEditor/Upload', formData).subscribe((data) => this.addPictureBox(data["_body"].replace(/"/g,"")));
    }
}
