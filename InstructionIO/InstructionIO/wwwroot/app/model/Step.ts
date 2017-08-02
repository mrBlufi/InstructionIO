import { ContentBlock } from './ContetnBlock'

export class Step {

    constructor(id?: string) {
        this.id = id;
    }

    public id: string = '';
    public number: number = 0;
    public subtitle: string = "";
    public contentBlock: ContentBlock[] = new Array<ContentBlock>();
}