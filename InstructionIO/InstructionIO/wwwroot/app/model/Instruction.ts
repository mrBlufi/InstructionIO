import { UserInfo } from "./UserInfo";
import { Category } from "./Category";
import { Step } from './Step';
import { Tag } from "./Tag";

export class Instruction {
    public id: number;
    public name: string;
    public author: UserInfo;
    public createDate: Date;
    public lastChangedDate: Date;
    public category: Category;
    public rating: number;
    public step: Step[];
    public tag: Tag[];
}