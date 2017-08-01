import { Safe } from '../tools/safeOn'
import { DomSanitizer } from "@angular/platform-browser";

export class ContentBlock {

    //safe: Safe;

    //constructor(type: string, private sanitizer: DomSanitizer) {
    //    this.type = type;
    //    this.safe = new Safe(sanitizer);
    //}

    constructor(type: string) {
        this.type = type;
    }

    public id: number;
    public content: any;
    public type: string;

    //get content(): any {
    //    return this.type == 'text' ? this.safe.safeOnHtml(this._content) : this.safe.safeOnUrl(this._content);
    //}
    //set content(content: any) {
    //    this._content = content;
    //}
}
