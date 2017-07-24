import { Component } from '@angular/core';
import { DragulaService } from "ng2-dragula";
import { ContentBlock } from './model/ContentBlock';
import { TextBoxTemplate } from './patrialComponent/textBoxTemplate'

@Component({
    selector: 'my-stepEditor',
    templateUrl: '/partial/StepEditorComponent'
})
export class StepEditorComponent {
    public contentBlocks: ContentBlock[] = new Array();

    constructor(private dragulaService: DragulaService) {
        dragulaService.setOptions('textRow', {
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
        console.log(this.contentBlocks);
        // do something else
    }

    private onRemoveModel(args: any) {
        let [el, source] = args;
        console.log(this.contentBlocks);
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

    pictureBoxAdd() {
        let n: ContentBlock = new ContentBlock('picture');
        n.Content = 'https://i.stack.imgur.com/1pQk8.jpg';
        this.contentBlocks.push(n);
    }

    boxDelete(event: ContentBlock) {
        this.contentBlocks.splice(this.contentBlocks.indexOf(event), 1);
    }

}
