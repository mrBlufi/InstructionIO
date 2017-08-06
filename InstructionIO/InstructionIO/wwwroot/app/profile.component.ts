import { Component, OnInit, OnDestroy, HostListener, Input } from '@angular/core';
import { UserInfo } from './model/UserInfo';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Instruction } from "./model/Instruction";
import { ProfileService } from "./service/Profile.Service";
import { Language } from 'angular-l10n';
import { RoleData } from "./model/RoleData";
import { UserStatistics } from "./model/UserStatistics";
import { RoleService } from "./service/Role.Service";
import { Http } from "@angular/http";
import { ThemeService } from "./service/Theme.Service";
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ModalCustom } from "./patrialComponent/deleteUserModal";
import { Overlay, overlayConfigFactory } from 'angular2-modal';

@Component({
    selector: 'my-profile',
    templateUrl: '/partial/profileComponent',
    styleUrls: ['css/ProfilePage.css', 'css/themes/themeProfile.css']
})

export class ProfileComponent implements OnInit, OnDestroy {

    @Language() lang: string;
    user: UserInfo = new UserInfo();
    roleinfo: RoleData = new RoleData(-1, false, false);
    userQueryParams: string = null;
    instructions: Array<Instruction> = null;
    sub: any;
    @Input() theme: string;
    statisticsuser: UserStatistics;

    constructor(public modal: Modal, private _Activatedroute: ActivatedRoute,
        private _router: Router, private _profileservice: ProfileService, private roleservice: RoleService, private http: Http, private themeservice: ThemeService) {
        this.theme = this.themeservice.getCookie('theme');
        roleservice.getDataRole().subscribe(data => {
            this.roleinfo = data;
        });
    }

    autogrow() {
        let textArea = document.getElementById("interestsBox")
        textArea.style.overflow = 'hidden';
        textArea.style.height = '0';
        textArea.style.height = textArea.scrollHeight + 'px';
    }

    deleteUserModal() {
        return this.modal.open(ModalCustom, overlayConfigFactory({ delete: false}, BSModalContext)).then(resultPromise => {
            return resultPromise.result
                .then(
                () => this.deluser(resultPromise.context.delete));
        });
    }
   
    deluser(tag: boolean) {
        if (tag) {
            this._profileservice.deleteUserById(this.user.id).subscribe(data => {
                this.user = null;
                this._router.navigate(['home']);
            });
        }
    }

    editDate(id: string) {
        let elem: HTMLElement = document.getElementById(id);
        elem.contentEditable = 'true';
        elem.removeAttribute('disabled');
        elem.focus();
        elem.addEventListener('focusout', function () {
            elem.setAttribute('disabled', 'disabled');
            elem.contentEditable = 'false';
        })
    }

    getDataUser() {
        this._profileservice.getDataProfile(this.userQueryParams).subscribe(
            data => {
                if (!data) {
                    this.user = null;
                    this._router.navigate(['home']);
                }
                this.user = data;
                this.getstatistics();
            }, err => console.log('Get me user error'));
    }

    getstatistics() {
        this._profileservice.getstatistics(this.userQueryParams).subscribe(data => {
            console.log(data);
            this.statisticsuser = data;
        });
    }

    ngOnInit() {
        this.sub = this._Activatedroute.queryParams
            .subscribe(params => {
                this.userQueryParams = params['user'];
                this.getDataUser();
            }, err => console.log(err));
    } 

    ngOnDestroy() {
        if (this.user) {
            this.user.interests = document.getElementById('interestsSpan').innerHTML;
            this._profileservice.setProfileData(this.user);
        }
        this.sub.unsubscribe();
    }

    parseDate(dateString: string): Date {
        if (dateString) {
            return new Date(dateString);
        } else {
            return null;
        }
    }

    @HostListener('window:beforeunload', ['$event'])
    public beforeUnload(event: any) {
        if (this.user) {
            this.user.interests = document.getElementById('interestsSpan').innerHTML;
            this._profileservice.setProfileData(this.user);
        }
    }

    redirectToInput(eleme: HTMLElement) {
        eleme.click();
    }

    saveFile(event: Event) {
        let src: string;
        let elem: HTMLInputElement = event.srcElement as HTMLInputElement;
        let formData: FormData = new FormData();
        formData.append(elem.files[0].name, elem.files[0]);
        this.http.post('/api/StepEditor/Upload', formData).subscribe(data => { this.user.avatar = data["_body"].replace(/"/g, "") });
    }
}