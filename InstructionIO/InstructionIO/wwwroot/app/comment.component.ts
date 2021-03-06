﻿import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Comment } from './model/Comment'
import { ProfileService } from "./service/Profile.Service";
import { Http } from '@angular/http';
import { Response, Headers, URLSearchParams } from '@angular/http';
import { RoleData } from "./model/RoleData";
import { Observable, Subscription } from 'rxjs/Rx';
import { RoleService } from "./service/Role.Service";
import { LocaleService, Language } from 'angular-l10n';
import { CommentService } from "./service/Comment.Service";

@Component({
    selector: 'comment',
    templateUrl: '/partial/commentComponent',
    styleUrls: ['css/comment.css', 'css/themes/themeComment.css' , 'css/themes/themeCommon.css']
})

export class CommentComponent {

    @Language() lang: string;
    @Input() comment: Comment[] = new Array<Comment>();
    @Input() idInstruction: number;
    @Input() theme: string;
    roleinfo: RoleData = new RoleData(-1, false, false);
    public editorContent: string = 'Comment Text';  

    constructor(private roleservice: RoleService, private http: Http,private commentservice:CommentService) {
        roleservice.getDataRole().subscribe(data => {
            this.roleinfo = data;
        });
    }
    submit() {
        let com = new Comment();
        com.context = this.editorContent;
        com.datecreate =new Date();
        this.addComment(com);
    }

    getComment() {
        this.commentservice.getComment(this.idInstruction).subscribe(date => {
            this.comment = date;
        });
    }

    addComment(obj: Comment) {
        this.commentservice.addComment(obj, this.idInstruction).subscribe(
            (data) => {
                this.getComment();
            },
            (err) => { console.log('Error'); }
        ); 
    }

    delcomment(id: number) {
        this.commentservice.delcomment(id, this.idInstruction).subscribe(
            (data) => {
                this.getComment();
            },
            (err) => { console.log('Error'); }
        );       
    }
}
