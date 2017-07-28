import { Component, OnInit } from '@angular/core';
import { UserInfo } from './model/UserInfo';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Instruction } from "./model/Instruction";
import { ProfileService } from "./service/ProfileService";
import { Language } from 'angular-l10n';

@Component({
    selector: 'my-profile',
    templateUrl: '/partial/profileComponent',
    styleUrls: ['css/ProfilePage.css']
})
export class ProfileComponent implements OnInit {
    @Language() lang: string;
    user: UserInfo = new UserInfo(0, 'FirstName', 'LastName', new Date(), '', 'sadasda');

    constructor(private _Activatedroute: ActivatedRoute,
        private _router: Router, private _profileservice: ProfileService) {
        
    }

   
    editDate(id: string) {
        let elem: HTMLElement = document.getElementById(id);
        elem.removeAttribute('disabled');
        elem.focus();
        elem.addEventListener('focusout', function () {
            elem.setAttribute('disabled', 'disabled');
        })
    }

    getDataUser(){
        this._profileservice.getDataProfile(this.userQueryParams).subscribe(
            data => {
                this.user = data;
            }, err => console.log('Get me user error'));

    }
    userQueryParams: string = null;
    instructions: Array<Instruction> = null;
    sub: any;

    ngOnInit() {
        this.sub = this._Activatedroute.queryParams
            .subscribe(params => {
                this.userQueryParams = params['user'];
                this.getDataUser();
                console.log('Query params ', this.userQueryParams)
            }, err => console.log(err));
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    
}