import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import { OnInit, Component, Input } from '@angular/core';
import { IStarRatingOnClickEvent, IStarRatingOnRatingChangeEven, IStarRatingIOnHoverRatingChangeEvent } from "angular-star-rating/star-rating-struct";
import { HomeService } from "./service/Home.Service";
import { Instruction } from "./model/Instruction";
import { ProfileService } from "./service/Profile.Service";
import { Language } from 'angular-l10n';
import { RatingRelation } from "./model/RatingRelation";
import { RoleData } from "./model/RoleData";
import { RoleService } from "./service/Role.Service";

@Component({
    selector: 'child-content',
    templateUrl: '/partial/contentChildHomeComponent',
    styleUrls: ['css/blog-home.css', 'css/themes/themeChildContent.css', , 'css/themes/themeCommon.css']
})

export class ChildComponent implements OnInit {
    
    onClickResult: IStarRatingOnClickEvent;
    sub: any;
    @Language() lang: string;
    categoryQueryParams: string=null;
    sortQueryParams: string = null;
    userQueryParams: string = null;
    searchQueryParams: string = null;
    instructions: Array<Instruction> = null;
    stepSkip = 0;
    tagsearch: boolean = false;
    roleinfo: RoleData = new RoleData(-1, false, false);
    @Input() theme: string;

    constructor(private _Activatedroute: ActivatedRoute,
        private _router: Router, private homeservice: HomeService,
        private profileservice: ProfileService, private roleservice: RoleService) {
        roleservice.getDataRole().subscribe(data => {
            this.roleinfo = data;
        });
    }

    ngOnInit() {
        this.sub = this._Activatedroute.queryParams
            .subscribe(params => {
                this.stepSkip = 0;
                this.categoryQueryParams = params['category'];
                this.sortQueryParams = params['sort'];
                this.userQueryParams = params['user'];
                this.searchQueryParams = params['q']
                this.tagsearch = params['tag'];
                this.getInstructions();
            }, err => console.log(err));
    }

    onClick($event: IStarRatingOnClickEvent, idI: number) {
        this.onClickResult = $event;
        if (this.roleinfo.id != -1)
            this.homeservice.setRating(idI, this.roleinfo.id, $event.rating).subscribe(data => { console.log(data)});
    };

    private getInstructions() {
        if (this.searchQueryParams != null) {
            this.getInstructionsSearch();
        }
        else
        if (this.userQueryParams != null) {
            this.getInstructionsUser();
        }
        else
        {
            this.getInstructionsFullUser();
        }
    }

    setrating(ratingRelation: Array<RatingRelation>) {
        if (ratingRelation.length==0) return 0;
        let rating=0;
        for (var i = 0; i < ratingRelation.length; i++) {
            rating += ratingRelation[i].value;
        }
        return  rating / ratingRelation.length;
    }

    getInstructionsFullUser() {
        if (this.sortQueryParams == null) this.sortQueryParams = 'popular';
        if (this.categoryQueryParams == null) this.categoryQueryParams = 'Full';
        this.homeservice.getInstructionsFull(this.sortQueryParams, this.categoryQueryParams, this.stepSkip).subscribe(data => {
            this.instructions = data;
            this.stepSkip += 1;
        }, err => console.log(err));
    }

    getInstructionsUser() {
        this.profileservice.getInstructions(this.userQueryParams, this.stepSkip).subscribe(data => {
            this.instructions = data;
            this.stepSkip += 1;
        }, err => console.log(err));
    }

    getInstructionsSearch() {
        this.homeservice.getInstructionsSearch(this.searchQueryParams, this.stepSkip, this.tagsearch).subscribe(data => {
            this.instructions = data;
            this.stepSkip += 1;
        }, err => console.log(err));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    infinitydisable = false;
    onScroll() {
        if (this.searchQueryParams != null) {
            this.getScrollSearchData()
        }
        else
        if (this.userQueryParams != null) {
            this.getScrollUserData();
        } else {
            this.getScrollFullData();
        }
       
    }

    getScrollFullData() {
        if (this.infinitydisable) return;
        this.infinitydisable = true;
        this.homeservice.getInstructionsFull(this.sortQueryParams, this.categoryQueryParams, this.stepSkip).subscribe(data => {
            if (!data) {
                this.infinitydisable = false;
                return;
            }
            let instructionscroll = data;
            this.instructions = this.instructions.concat(instructionscroll);
            this.stepSkip += 1;
            this.infinitydisable = false;
        }, err => console.log(err));
    }

    getScrollUserData() {
        if (this.infinitydisable) return;
        this.infinitydisable = true;
        this.profileservice.getInstructions(this.userQueryParams, this.stepSkip).subscribe(data => {
            if (!data) {
                this.infinitydisable = false;
                return;
            }
            let instructionscroll = data;
            this.instructions = this.instructions.concat(instructionscroll);
            this.stepSkip += 1;
            this.infinitydisable = false;
        }, err => console.log(err));
    }

    getScrollSearchData() {
        if (this.infinitydisable) return;
        this.infinitydisable = true;
        this.homeservice.getInstructionsSearch(this.searchQueryParams, this.stepSkip,this.tagsearch).subscribe(data => {
            if (!data) {
                
                this.infinitydisable = false;
                return;
            }
            let instructionscroll = data;
            this.instructions = this.instructions.concat(instructionscroll);
            this.stepSkip += 1;
            this.infinitydisable = false;
        }, err => console.log(err));
    }
}