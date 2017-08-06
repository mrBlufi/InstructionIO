import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HomeService {

    constructor(private http: Http) { }

    getPopularTags() {
        return this.http.get('/api/datahome/tag').map(res => (res).json());
    }

    getCategories() {
        return this.http.get('/api/datahome/categories').map(res => (res).json());
    }

    getInstructionsFull(sort: string, category: string, stepSkip: number) {
        return this.http.get('/api/datahome/instruction/' + sort + '/category/' + category + '/' + stepSkip).map(res => (res).json());
    }

    getInstructionsUser(stepSkip: number) {
        return this.http.get('/api/datahome/instruction/user/' + stepSkip).map(res => (res).json());
    }

    getInstructionsSearch(stepSkip: string, page: number, tag: boolean) {
        return this.http.get('/api/datahome/instruction/search/' + stepSkip+'/'+page+'/'+tag).map(res => (res).json());
    }

    setRating(idI: number, idU: number, rating: number) {
        return this.http.get('/api/datahome/instruction/setrating/'+idI+'/'+idU+'/'+rating);
    }
}