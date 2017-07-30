import { UserInfo } from "./UserInfo";

export class Comment{
    public id: number;
    public author: UserInfo;
    public context: string;
    public datecreate: Date;
}
