import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Route } from '@angular/router'
import { Instruction } from "../model/Instruction";
import { Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class InstructionService {

    constructor(private http: Http) { }

    get(id?: string) {
        let params: URLSearchParams = new URLSearchParams();
        if (id) {
            params.set('id', id);
        }
        return this.http.get('api/Instruction/get', { params: params }).map(res => (res).json());
    }

    getfull(id?: string) {
        let params: URLSearchParams = new URLSearchParams();
        if (id) {
            params.set('id', id);
        }
        return this.http.get('api/Instruction/getfull', { params: params }).map(res => (res).json());
    }

    update(instruction: Instruction): Observable<Response> {
        return this.http.post('api/Instruction/update', instruction); 
    }

    create(instruction: Instruction): Observable<Response> {
        return this.http.post('api/Instruction/create', instruction);
    }

    tags(mask?: string) {
        let params: URLSearchParams = new URLSearchParams();
        if (mask) {
            params.set('mask', mask);
        }
        return this.http.get('api/Instruction/tags', { params: params }).map(res => (res).json());
    }
}