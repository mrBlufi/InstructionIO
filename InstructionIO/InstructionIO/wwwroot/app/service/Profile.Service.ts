﻿import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserInfo } from "../model/UserInfo";
import { Response, Headers, URLSearchParams } from '@angular/http';

@Injectable()
export class ProfileService {

    constructor(private http: Http) { }

    getDataProfile(userparams: string) {
        console.log(userparams);
        return this.http.get('/api/profile/user/' + userparams).map(res => (res).json());
    }

    getProfileImage(userparams: number) {
        return this.http.get('/api/profile/userimage/' + userparams);
    }

    getInstructions(userparams: string, stepSkip: number) {
        console.log(userparams);
        return this.http.get('/api/profile/instruction/user/' + userparams + '/' + stepSkip).map(res => (res).json());
    }

    setProfileData(obj: UserInfo) {
        const body = JSON.stringify(obj);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('/api/profile/user/update', body, { headers: headers }).subscribe(
            (data) => {
                console.log('Response received');
                console.log(data);
            },
            (err) => { console.log('Error'); },
            () => console.log('Authentication Complete')
        );

    }


    deleteUserById(id: number) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('/api/profile/deleteuser', id, { headers: headers });
    }

    getstatistics(id: string) {
        
        return this.http.get('/api/profile/getstatistics/' + id).map(res => (res).json());
    }



}