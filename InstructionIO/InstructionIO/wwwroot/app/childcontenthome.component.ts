import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/filter';
import { OnInit, Component } from '@angular/core';
import { IStarRatingOnClickEvent, IStarRatingOnRatingChangeEven, IStarRatingIOnHoverRatingChangeEvent } from "angular-star-rating/star-rating-struct";
import { HomeService } from "./service/HomeService";
import { Instruction } from "./model/Instruction";
import { ProfileService } from "./service/ProfileService";
import { Language } from 'angular-l10n';

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
        this.onRatingChangeResult = $event;
    };

    onHoverRatingChange = ($event: IStarRatingIOnHoverRatingChangeEvent) => {
        this.onHoverRatingChangeResult = $event;
    };

    sub: any;
    @Language() lang: string;
    categoryQueryParams: string=null;
    sortQueryParams: string = null;
    userQueryParams: string = null;
    instructions: Array<Instruction> = null;
    stepSkip = 0;
    constructor(private _Activatedroute: ActivatedRoute,
        private _router: Router, private homeservice: HomeService,private profileservice:ProfileService) {
    }
    ngOnInit() {
        this.sub = this._Activatedroute.queryParams
            .subscribe(params => {
                this.stepSkip = 0;
                this.categoryQueryParams = params['category'];
                this.sortQueryParams = params['sort'];
                this.userQueryParams = params['user'];
                console.log('useruser ', this.userQueryParams);
                this.getInstructions();
               
            }, err => console.log(err));
    }

    private getInstructions() {
        if (this.userQueryParams != null) {
            this.getInstructionsUser();
        } else {
            if (this.sortQueryParams == null) this.sortQueryParams = 'popular';
            if (this.categoryQueryParams == null) this.categoryQueryParams = 'Full';
            this.getInstructionsFullUser();
        }
    }


    getInstructionsFullUser() {
        this.homeservice.getInstructionsFull(this.sortQueryParams, this.categoryQueryParams, this.stepSkip).subscribe(data => {
            this.instructions = data;
            this.stepSkip += 1;
            console.log(this.instructions);
        }, err => console.log(err));
    }

    getInstructionsUser() {
        this.profileservice.getInstructions(this.userQueryParams, this.stepSkip).subscribe(data => {
            this.instructions = data;
            this.stepSkip += 1;
            console.log(this.instructions);
        }, err => console.log(err));
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    infinitydisable = false;
    onScroll() {
        if (this.userQueryParams != null) {
            this.getScrollUserData();
        } else {
            this.getScrollFullData();
        }
       
    }

    getScrollFullData() {
        if (this.infinitydisable) return;
        this.infinitydisable = true;
        console.log('scroll');
        this.homeservice.getInstructionsFull(this.sortQueryParams, this.categoryQueryParams, this.stepSkip).subscribe(data => {
            if (data.length == 0) {
                this.infinitydisable = false;
                return;
            }
            let instructionscroll = data;
            this.instructions = this.instructions.concat(instructionscroll);
            console.log(instructionscroll);
            this.stepSkip += 1;
            this.infinitydisable = false;
        }, err => console.log(err));

    }
    getScrollUserData() {
        if (this.infinitydisable) return;
        this.infinitydisable = true;
        console.log('scroll');
        this.profileservice.getInstructions(this.userQueryParams, this.stepSkip).subscribe(data => {
            if (data.length == 0) {
                this.infinitydisable = false;
                return;
            }
            let instructionscroll = data;
            this.instructions = this.instructions.concat(instructionscroll);
            console.log('instr1',this.instructions);
            this.stepSkip += 1;
            this.infinitydisable = false;
        }, err => console.log(err));

    }

}