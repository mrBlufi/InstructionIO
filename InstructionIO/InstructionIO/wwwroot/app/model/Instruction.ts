import { UserInfo } from "./UserInfo";
import { Category } from "./Category";

export class Instruction {
    id: number;
    name: string;
    author: UserInfo;
    createDate: Date;
    lastChangedDate: Date;
    category: Category;
    rating: number;

}