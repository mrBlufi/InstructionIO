import { UserInfo } from "./UserInfo";
import { Category } from "./Category";
import { Step } from './Step';
import { Tag } from "./Tag";
import { Comment } from "./Comment";
import { RatingRelation } from "./RatingRelation";
import { TagsRelation } from "./TagsRelation";

export class Instruction {
    public id: number;
    public name: string;
    public previewImage: string;
    public previewText: string = 'insturction text prive';
    public author: UserInfo = new UserInfo();
    public createDate: Date = new Date(Date.now());
    public lastChangedDate: Date = new Date(Date.now());;
    public category: Category = new Category();
    public rating: number;
    public step: Array<Step>;
    public tagsRelation: Array<TagsRelation>;
    public comment: Array<Comment>;
    public ratingRelation: Array<RatingRelation>;
}