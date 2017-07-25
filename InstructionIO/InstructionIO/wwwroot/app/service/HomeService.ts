import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HomeService {

    constructor(private http: Http) { }

    getData() {
        return this.http.get('https://localhost:44328/api/datahome/tag').map(res => (res).json());
    }
}