import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HomeService {

    constructor(private http: Http) { }

    getPopularTags() {
        return this.http.get('https://localhost:44328/api/datahome/tag').map(res => (res).json());
    }
    getCategories() {
        return this.http.get('https://localhost:44328/api/datahome/categories').map(res => (res).json());
    }

    getInstructions(sort: string, category: string) {
        console.log('https://localhost:44328/api/datahome/instruction/' + sort + '/category/' + category);
        return this.http.get('https://localhost:44328/api/datahome/instruction/' + sort + '/category/' + category).map(res => (res).json());
    }
}