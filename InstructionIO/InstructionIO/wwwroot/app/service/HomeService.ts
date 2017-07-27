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

    getInstructionsFull(sort: string, category: string, stepSkip: number) {
        return this.http.get('https://localhost:44328/api/datahome/instruction/' + sort + '/category/' + category + '/' + stepSkip).map(res => (res).json());
    }


    getInstructionsUser(stepSkip: number) {
        return this.http.get('https://localhost:44328/api/datahome/instruction/user/' + stepSkip).map(res => (res).json());
    }
}