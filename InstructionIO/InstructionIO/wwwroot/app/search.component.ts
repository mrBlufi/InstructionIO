import { Component, OnInit } from '@angular/core';
import { HomeService } from "./service/Home.Service";
import { Tag } from "./model/Tag";
import { Category } from "./model/Category";
import { Language } from 'angular-l10n';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'my-search',
    templateUrl: '/partial/searchComponent',
    styleUrls: ['css/blog-home.css', 'css/theme.css']
})

export class SearchComponent implements OnInit {
    @Language() lang: string;
    tags: Array<Tag> = null;
    searchyQueryParams: any;
    constructor(private homeservice: HomeService, private _Activatedroute: ActivatedRoute) {
    }

   
    sub: any;

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
            console.log(this.tags);
        }, err => console.log(err));
    }

    

    ngOnDestroy() {
        this.sub.unsubscribe();
    }



}
