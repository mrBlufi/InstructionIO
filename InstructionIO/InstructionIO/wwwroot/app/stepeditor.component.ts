import { Component } from '@angular/core';
import { DragulaService } from "ng2-dragula";
import { ContentBlock } from './model/ContentBlock'


@Component({
    selector: 'my-stepEditor',
    templateUrl: '/partial/StepEditorComponent'
})
export class StepEditorComponent {
    public ContentBlocks: ContentBlock[];
    constructor(private dragulaService: DragulaService) {
        this.ContentBlocks.push(new ContentBlock('text','asdfsdf'));
        dragulaService.setOptions('textRow', {
            moves: function (el: any, container: any, handle: any) {
                return !(handle.className.includes('delete'));
            }
        });
    }

    boxDelete(event: MouseEvent) {
        event.srcElement.parentElement.parentElement.remove();
    }
}
