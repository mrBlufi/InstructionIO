import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/map'

@Component({
    selector: 'my-app',
    templateUrl: '/partial/appComponent',
    styleUrls: ['css/AppStyle.css']
})
export class AppComponent {
    public constructor(private titleService: Title) { }

    angularClientSideData = 'Angular';

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }
}
