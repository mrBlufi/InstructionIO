import { UserInfo } from "./UserInfo";
import { Category } from "./Category";

export class Instruction {
    id: number;
    name: string;
    author: UserInfo;
    createDate: string;
    lastChangeDate: string;
    category: Category;
    rating: number;

}