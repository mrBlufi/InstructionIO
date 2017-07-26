export class ContentBlock {
    constructor(public Type: string) {
    }

    private _id: number; // microsoft guidelines for contributors in typescript
    public Content: string;
    public SteoId: number;

    get id(): number {
        return this.id;
    }
}
