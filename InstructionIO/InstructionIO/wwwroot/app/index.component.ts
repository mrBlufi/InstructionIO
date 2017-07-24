import { Component } from '@angular/core';

@Component({
    selector: 'my-index',
    templateUrl: '/partial/indexComponent',
    styleUrls: ['css/blog-home.css']
})

export class IndexComponent {
    
    titleArray: string[] = ["Category1", "Category2", "Category3", "Category4", "Category5"];

    open(): void {
        console.log('Open');
    }

}



