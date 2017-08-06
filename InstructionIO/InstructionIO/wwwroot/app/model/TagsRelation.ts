import { Tag } from "./Tag";

export class TagsRelation {
    constructor(tag: Tag) {
        this.tag = tag;
    }
    public id: number;
    public tag: Tag;
}