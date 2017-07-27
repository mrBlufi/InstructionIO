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
    stepSkip = 0;
    constructor(private _Activatedroute: ActivatedRoute,
        private _router: Router, private homeservice: HomeService) {
    }
    ngOnInit() {
        console.log(Date.now);
        this.sub = this._Activatedroute.queryParams
            .subscribe(params => {
                this.stepSkip = 0;
                this.categoryQueryParams = params['category'];
                this.sortQueryParams = params['sort'];
                this.getInstructions();
                console.log('Query params ', params)
            }, err => console.log(err));
    }

    private getInstructions() {
        if (this.sortQueryParams == null) this.sortQueryParams = 'popular';
        if (this.categoryQueryParams == null) this.categoryQueryParams = 'Full';
        this.homeservice.getInstructionsFirst(this.sortQueryParams, this.categoryQueryParams, this.stepSkip).subscribe(data => {
            this.instructions = data;
            this.stepSkip +=1;
            console.log(this.instructions);
        }, err => console.log(err));
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    infinitydisable = false;
    onScroll() {
        if (this.infinitydisable) return;
        this.infinitydisable = true;
        console.log('scroll');
        this.homeservice.getInstructionsFirst(this.sortQueryParams, this.categoryQueryParams, this.stepSkip).subscribe(data => {
            if (data.length == 0) {
                this.infinitydisable = false;
                return;
            }
            var instructionscroll = data;
            console.log(instructionscroll);
            this.stepSkip +=1;
            for (var i = 0; i < instructionscroll.length; i++) {
                this.instructions.push(instructionscroll[i]);
            }
            this.infinitydisable = false;
        }, err => console.log(err));
        
    }

}