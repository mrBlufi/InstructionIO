import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers, URLSearchParams } from '@angular/http';
import { Comment } from '../model/Comment'
@Injectable()
export class CommentService {

    constructor(private http: Http) {
    }

    getComment(id:number) {
        return this.http.get('/api/comment/instruction/' + id).map(res => (res).json());
    }

    addComment(obj: Comment,id:number) {
        const body = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('/api/comment/instruction/' + id + '/push/', body, { headers: headers });

    }

    delcomment(idC: number, idI: number) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        if (idC)
            return this.http.post('/api/comment/instruction/' + idI + '/del/', idC, { headers: headers });
    }

}