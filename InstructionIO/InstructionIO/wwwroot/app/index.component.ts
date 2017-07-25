import { Component, OnInit } from '@angular/core';
import { HomeService } from "./service/HomeService";
import { Tag } from "./model/Tag";

@Component({
    selector: 'my-index',
    templateUrl: '/partial/indexComponent',
    styleUrls: ['css/blog-home.css']
})

export class IndexComponent implements OnInit {
    
    titleArray: string[] = ["Category1", "Category2", "Category3", "Category4", "Category5"];
    subcrib = this.titleArray[0];


    tags: Array<Tag> = null;
    constructor(private homeservice: HomeService) {

    }

    ngOnInit() {
            this.homeservice.getData()
            //.subscribe((data: Array<Tag>) => this.tags = data);

            .subscribe(
            data => {
                this.tags = data;
                console.log(this.tags);
            }, err => console.log('Get me user error'));
    }

}



