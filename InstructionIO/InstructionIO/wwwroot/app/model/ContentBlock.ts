export class ContentBlock {
    constructor(Type: string, Content: string)
    {
        this.Type = Type;
        this.Content = Content;
    }
    public Id: number;
    public Content: string;
    public SteoId: number;
    public Type: string;
}