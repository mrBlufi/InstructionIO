import { UserInfo } from '../UserInfo'

export class CommentFull {
    public id: number;
    public author: UserInfo;
    public context: string;
    public dateCreate: Date;
}