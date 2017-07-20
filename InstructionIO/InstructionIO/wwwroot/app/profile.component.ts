import { Component } from '@angular/core';
import { Http, Response } from '@angular/http'
import { UserInfo } from './model/UserInfo'
import { NgFor } from '@angular/common';


@Component({
    selector: 'my-profile',
    templateUrl: '/partial/profileComponent'
})
export class ProfileComponent {
    user: UserInfo;

    constructor(public http: Http) {
        this.getMe();
    }

    getMe() {
        this.http.get('https://localhost:44328/api/profile').map(res => (res).json())
        .subscribe(
            data => {
                this.user = data;
                console.log(this.user);
            }, err => console.log('Get me user error'));

    }

}