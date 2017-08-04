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
    @Input() comment: Comment[] = new Array<Comment>();
    @Input() idInstruction: number;
    roleinfo: RoleData = new RoleData(-1, false, false);
    constructor(private roleservice: RoleService, private http: Http) {
        roleservice.getDataRole().subscribe(data => {
            this.roleinfo = data;
            console.log(this.roleinfo);
        });
    }
    submit() {
        let com = new Comment();
        com.context = this.editorContent;
        com.datecreate =new Date();
        this.addComment(com);
    }

    getComment() {
        this.http.get('/api/comment/instruction/' + this.idInstruction ).map(res => (res).json()).subscribe(date => {
            this.comment = date;
            console.log(this.comment);
        });
    }
    addComment(obj: Comment) {
        const body = JSON.stringify(obj);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('/api/comment/instruction/' + this.idInstruction + '/push/', body, { headers: headers }).subscribe(
            (data) => {
                console.log('push Complit');
                console.log(data);
                this.getComment();
            },
            (err) => { console.log('Error'); }
        );
        
    }


    delcomment(id: number) {
        

        let headers = new Headers({ 'Content-Type': 'application/json' });
       
        if (id)
            return this.http.post('/api/comment/instruction/' + this.idInstruction +'/del/', id, { headers: headers }).subscribe(
                (data) => {
                    console.log('push Complit');
                    console.log(data);
                    this.getComment();
                },
                (err) => { console.log('Error'); }
            );
           
    }
    public editorContent: string = 'Comment Text';

   
   
}
