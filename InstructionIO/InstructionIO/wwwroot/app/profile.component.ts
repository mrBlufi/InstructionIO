import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { UserInfo } from './model/UserInfo';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Instruction } from "./model/Instruction";
import { ProfileService } from "./service/Profile.Service";
import { Language } from 'angular-l10n';
import { RoleData } from "./model/RoleData";
import { RoleService } from "./service/Role.Service";
import { Http } from "@angular/http";
import { ThemeService } from "./service/Theme.Service";
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ModalCustom } from "./patrialComponent/deleteUserModal";
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { CustomModal } from "./patrialComponent/videoModal";

@Component({
    selector: 'my-profile',
    templateUrl: '/partial/profileComponent',
    styleUrls: ['css/ProfilePage.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
    @Language() lang: string;
    user: UserInfo = new UserInfo();
    roleinfo: RoleData = new RoleData(-1, false, false);
    userQueryParams: string = null;
    instructions: Array<Instruction> = null;
    sub: any;

    constructor(public modal: Modal,private _Activatedroute: ActivatedRoute,
        private _router: Router, private _profileservice: ProfileService, private roleservice: RoleService, private http: Http, private themeservice: ThemeService) {
       
        roleservice.getDataRole().subscribe(data => {
            this.roleinfo = data;
            console.log(this.roleinfo);
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
                () => console.log('dasd'));
        });
    }
    videoBoxModal() {
        return this.modal.open(CustomModal, overlayConfigFactory({ src: "" }, BSModalContext)).then(resultPromise => {
            return resultPromise.result
                .then(
                () => console.log('dasd'));
        });
    }


    deluser(tag: boolean) {
        console.log(tag);
    }

    editDate(id: string) {
        this.autogrow();
        let elem: HTMLElement = document.getElementById(id);
        elem.removeAttribute('disabled');
        elem.focus();
        elem.addEventListener('focusout', function () {
            elem.setAttribute('disabled', 'disabled');
        })
    }

    getDataUser() {
        this._profileservice.getDataProfile(this.userQueryParams).subscribe(
            data => {
                this.user = data;
            }, err => console.log('Get me user error'));

    }
    

    ngOnInit() {
        let theme = this.themeservice.getTheme();
        console.log(theme);
        this.sub = this._Activatedroute.queryParams
            .subscribe(params => {
                this.userQueryParams = params['user'];
                this.getDataUser();
                
            }, err => console.log(err));
       
    }
    ngOnDestroy() {
        console.log('destroy and user', this.user);
        this._profileservice.setProfileData(this.user);
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
        this._profileservice.setProfileData(this.user);

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