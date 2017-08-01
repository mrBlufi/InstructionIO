import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import { LocaleService, Language } from 'angular-l10n';
import { RoleService } from "./service/Role.Service";
import { RoleData } from "./model/RoleData";
import { ProfileService } from "./service/Profile.Service";

@Component({
    selector: 'my-app',
    templateUrl: '/partial/appComponent',
    styleUrls: ['css/site_nav.css','css/theme.css']
})
export class AppComponent implements OnInit {
    searchQueryParams: any;
    public theme='light';
    roleinfo: RoleData = new RoleData(-1,false,false);
    imageprofile: any;
    public constructor(private titleService: Title, public locale: LocaleService, private roleservice: RoleService,private profileservice:ProfileService) {
        roleservice.getDataRole().subscribe(data => {
            this.roleinfo = data;
            if (this.roleinfo.id != -1) {
                profileservice.getProfileImage(this.roleinfo.id).subscribe(data => {
                    
                    this.imageprofile = data["_body"];
                    console.log(this.imageprofile);
                });
            }
            console.log(this.roleinfo);
        });
       
       
    }

    settheme(theme: string) {
        this.theme = theme;
}

    angularClientSideData = 'Angular';

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    @Language() lang: string;
    ngOnInit(): void { }

    selectLanguage(language: string): void {
        this.locale.setCurrentLanguage(language);
    }

}
