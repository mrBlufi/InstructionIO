import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/filter';
import { OnInit, Component } from '@angular/core';
import { IStarRatingOnClickEvent, IStarRatingOnRatingChangeEven, IStarRatingIOnHoverRatingChangeEvent } from "angular-star-rating/star-rating-struct";
import { HomeService } from "./service/HomeService";
import { Instruction } from "./model/Instruction";

@Component({
    selector: 'child-content',
    templateUrl: '/partial/contentChildHomeComponent',
    styleUrls: ['css/blog-home.css']
})


export class ChildComponent implements OnInit {


    onClickResult: IStarRatingOnClickEvent;
    onHoverRatingChangeResult: IStarRatingIOnHoverRatingChangeEvent;
    onRatingChangeResult: IStarRatingOnRatingChangeEven;

    onClick = ($event: IStarRatingOnClickEvent) => {
        //console.log('onClick $event: ', $event);
        this.onClickResult = $event;
    };

    onRatingChange = ($event: IStarRatingOnRatingChangeEven) => {
        //console.log('onRatingUpdated $event: ', $event);
        this.onRatingChangeResult = $event;
    };

    onHoverRatingChange = ($event: IStarRatingIOnHoverRatingChangeEvent) => {
        //console.log('onHoverRatingChange $event: ', $event);
        this.onHoverRatingChangeResult = $event;
    };

    public stringarray: string[] = ["1", "2", "3"];
    sub: any;
    categoryQueryParams: string=null;
    sortQueryParams: string=null;
    instructions: Array<Instruction> = null;
    constructor(private _Activatedroute: ActivatedRoute,
        private _router: Router, private homeservice: HomeService) {
    }
    ngOnInit() {
        this.sub = this._Activatedroute.queryParams
            .subscribe(params => {
                this.categoryQueryParams = params['category'];
                this.sortQueryParams = params['sort'];
                this.getInstructions();
                console.log('Query params ', params)
            });
    }

    private getInstructions() {
        if (this.sortQueryParams == null) this.sortQueryParams = 'full';
        if (this.categoryQueryParams == null) this.categoryQueryParams = 'Full';
        this.homeservice.getInstructions(this.sortQueryParams, this.categoryQueryParams).subscribe(data => {
            this.instructions = data;
            console.log(this.instructions);
        }, err => console.log(err));
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}