import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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

    update(instruction: Instruction) {
        this.http.post('api/Instruction/update', instruction).subscribe(); 
    }

    create(instruction: Instruction) {
        this.http.post('api/Instruction/create', instruction).subscribe();
    }
}