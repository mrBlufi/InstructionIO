import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from "./service/Home.Service";
import { Tag } from "./model/Tag";
import { Category } from "./model/Category";
import { Language } from 'angular-l10n';
import { ActivatedRoute } from "@angular/router";
import { ThemeService } from "./service/Theme.Service";

@Component({
    selector: 'my-search',
    templateUrl: '/partial/searchComponent',
    styleUrls: ['css/blog-home.css','css/themes/themeIndexAndSearch.css']
})

export class SearchComponent implements OnInit {

    @Language() lang: string;
    tags: Array<Tag> = null;
    searchyQueryParams: any;
    @Input() theme: string;
    sub: any;

    constructor(private homeservice: HomeService, private _Activatedroute: ActivatedRoute, private themeservice: ThemeService) {
        this.theme = this.themeservice.getCookie('theme');
    }

    ngOnInit() {
        this.getTags();
        this.sub = this._Activatedroute.queryParams
            .subscribe(params => {
                this.searchyQueryParams = params['q'];
            }, err => console.log(err));
    }

    private getTags() {
        this.homeservice.getPopularTags().subscribe(data => {
            this.tags = data;
        }, err => console.log(err));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
