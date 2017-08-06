import { DomSanitizer } from "@angular/platform-browser";

export class ContentBlock {

    constructor(type: string) {
        this.type = type;
    }

    public id: number = 0;
    public content: string = '';
    public type: string = '';
}
