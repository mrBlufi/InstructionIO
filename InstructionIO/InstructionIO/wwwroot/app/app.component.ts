import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import { LocaleService, Language } from 'angular-l10n';
import { RoleService } from "./service/Role.Service";
import { RoleData } from "./model/RoleData";
import { ProfileService } from "./service/Profile.Service";
import { ThemeService } from "./service/Theme.Service";
import { Router, NavigationEnd } from "@angular/router";

@Component({
    selector: 'my-app',
    templateUrl: '/partial/appComponent',
    styleUrls: ['css/site_nav.css', 'css/themes/themeapp.css', 'css/appcomponent.css','css/themes/themeCommon.css']
})

export class AppComponent implements OnInit {

    searchQueryParams: any;
    public theme: string;
    roleinfo: RoleData = new RoleData(-1,false,false);
    imageprofile: any;
    @Language() lang: string;

    public constructor(private titleService: Title, public locale: LocaleService,
        private roleservice: RoleService, private profileservice: ProfileService,
        private themeservice: ThemeService, private router: Router)
    {
        roleservice.getDataRole().subscribe(data => {
            this.roleinfo = data;
            this.getImageProfile();
        });
        this.theme = this.themeservice.getCookie('theme');
    }

    enterClick() {
        this.router.navigate(['search'], { queryParams: { 'q': this.searchQueryParams } });
    }

    getImageProfile() {
        if (this.roleinfo.id != -1) {
            this.profileservice.getProfileImage(this.roleinfo.id).subscribe(data => {
                this.imageprofile = data["_body"];
            });
        }
    }

    settheme(theme: string) {
        this.themeservice.setcookie(theme);
        window.location.reload();
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    ngOnInit(): void {
    }

    selectLanguage(language: string): void {
        this.locale.setCurrentLanguage(language);
    }
}
