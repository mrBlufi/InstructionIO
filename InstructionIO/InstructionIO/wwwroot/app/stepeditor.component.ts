import { Component } from '@angular/core';
import { DragulaService } from "ng2-dragula";


@Component({
    selector: 'my-stepEditor',
    templateUrl: '/partial/StepEditorComponent'
})
export class StepEditorComponent {
    constructor(private dragulaService: DragulaService) {
        dragulaService.setOptions('textRow', {
            moves: function (el: any, container: any, handle: any) {
                return !(handle.className.includes('delete'));
            }
        });
    }

    boxDelete(event: any) {
        console.log(event);
    }
}
