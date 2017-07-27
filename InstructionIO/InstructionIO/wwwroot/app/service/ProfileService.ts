import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ProfileService {

    constructor(private http: Http) { }
   
    getDataProfile(userparams: string) {
        console.log(userparams);
        return this.http.get('https://localhost:44328/api/profile/user/' + userparams).map(res => (res).json());
    }

    getInstructions(userparams: string, stepSkip: number) {
        console.log(userparams);
        return this.http.get('https://localhost:44328/api/profile/instruction/user/' + userparams + '/' + stepSkip).map(res => (res).json());
    }

   
    
}