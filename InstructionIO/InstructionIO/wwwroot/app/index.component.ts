import { Component, OnInit, Input,OnDestroy  } from '@angular/core';
import { HomeService } from "./service/Home.Service";
import { Tag } from "./model/Tag";
import { Category } from "./model/Category";
import { Language } from 'angular-l10n';
import { ActivatedRoute } from "@angular/router";
import { ThemeService } from "./service/Theme.Service";

@Component({
    selector: 'my-index',
    templateUrl: '/partial/indexComponent',
    styleUrls: ['css/blog-home.css', 'css/themes/themeIndexAndSearch.css', , 'css/themes/themeCommon.css']
})

export class IndexComponent implements OnInit {
    
    @Language() lang: string;
    tags: Array<Tag> = null;
    categories: Array<Category> = null;
    categoryQueryParams: any;
    @Input() theme: string;
    constructor(private homeservice: HomeService, private route: ActivatedRoute,private themeservice:ThemeService) {
        this.categoryQueryParams = 'Full';
    }

    ngOnInit() {
        this.theme = this.themeservice.getCookie('theme');
        this.getTags();
        this.getCategories();
    }

    private getTags() {
        this.homeservice.getPopularTags().subscribe(data => {
            this.tags = data;
        }, err => console.log(err));
    }

    private getCategories() {
        this.homeservice.getCategories().subscribe(data => {
            this.categories = data;
        }, err => console.log(err));
    }
}
