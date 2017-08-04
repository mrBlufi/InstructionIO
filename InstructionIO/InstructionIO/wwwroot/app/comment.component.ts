import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Comment } from './model/Comment'
import { ProfileService } from "./service/Profile.Service";
import { Http } from '@angular/http';
import { Response, Headers, URLSearchParams } from '@angular/http';
import { RoleData } from "./model/RoleData";
import { Observable, Subscription } from 'rxjs/Rx';
import { RoleService } from "./service/Role.Service";
import { LocaleService, Language } from 'angular-l10n';

@Component({
    selector: 'comment',
    templateUrl: '/partial/commentComponent',
    styleUrls: ['css/comment.css']
})

export class CommentComponent {
    @Language() lang: string;
    @Input() comment: Comment[];
    roleinfo: RoleData = new RoleData(-1, false, false);
    constructor(private roleservice: RoleService, private http: Http) {
        roleservice.getDataRole().subscribe(data => {
            this.roleinfo = data;
            console.log(this.roleinfo);
        });
        this.getComment();
    }

    getComment() {
        this.http.get('/api/comment/test/comments').map(res => (res).json()).subscribe(date => {
            this.comments = date;
            console.log(this.comments);
        });
    }
    submit() {
        let com = new Comment();
        com.context = this.editorContent;
        com.datecreate = new Date(2017, 7, 31);
        this.addComment(com);
    }
    addComment(obj: Comment) {
        const body = JSON.stringify(obj);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('/api/comment/test/comments/post/', body, { headers: headers }).subscribe(
            (data) => {
                console.log('Response received');
                console.log(data);
                this.getComment();
            },
            (err) => { console.log('Error'); },
            () => console.log('Authentication Complete')
        );
        
    }


    delcomment(id: number) {
        console.log(id);
        if(id)
        this.http.get('/api/comment/test/comments/del/'+id).map(res => (res).json()).subscribe(date => {
            this.comments = date;
            console.log(this.comments);
        });
    }
    comments: Array<Comment>;
    public editorContent: string = 'Comment Text';

   
   
}
