import { Component, Input } from '@angular/core';
import {Comment} from './model/Comment'

@Component({
    selector: 'comment',
    templateUrl: '/partial/commentComponent',
    styleUrls: ['css/comment.css']
})

export class CommentComponent {

    @Input() comment: Comment[];
    public editorContent: string = 'My Document\'s Title';
}
