import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import { LocaleService, Language } from 'angular-l10n';

@Component({
    selector: 'my-app',
    templateUrl: '/partial/appComponent',
    styleUrls: ['css/site_nav.css']
})
export class AppComponent implements OnInit {
    searchQueryParams: any;

    public constructor(private titleService: Title, public locale: LocaleService) {

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
