﻿import { Component, OnInit } from '@angular/core';
import { HomeService } from "./service/HomeService";
import { Tag } from "./model/Tag";
import { Category } from "./model/Category";

@Component({
    selector: 'my-index',
    templateUrl: '/partial/indexComponent',
    styleUrls: ['css/blog-home.css']
})

export class IndexComponent implements OnInit {
    
    tags: Array<Tag> = null;
    categories: Array<Category> = null;
    categoryQueryParams: any;
    constructor(private homeservice: HomeService) {
        this.categoryQueryParams = 'Full';
    }

    ngOnInit() {
        this.getTags();
        this.getCategories();

    }

    private getTags() {
        this.homeservice.getPopularTags().subscribe(data => {
            this.tags = data;
            console.log(this.tags);
        }, err => console.log(err));
    }

    private getCategories() {
        this.homeservice.getCategories().subscribe(data => {
            this.categories = data;
            console.log(this.categories);
        }, err => console.log(err));
        
        
    }

    

}
