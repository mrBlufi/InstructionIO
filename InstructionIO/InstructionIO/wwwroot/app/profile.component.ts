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

    editDate(id: string) {
        let elem: HTMLElement = document.getElementById(id);
        elem.removeAttribute('disabled');
        elem.focus();
        elem.addEventListener('focusout', function () {
            elem.setAttribute('disabled', 'disabled');
        })
    }

    getMe() {
        this.http.get('https://localhost:44328/api/profile').map(res => (res).json())
        .subscribe(
            data => {
                this.user = data;
            }, err => console.log('Get me user error'));

    }

}