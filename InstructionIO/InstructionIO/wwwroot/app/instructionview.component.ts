import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Instruction } from './model/Instruction'
import { InstructionService } from "./service/instruction.Service";
import { UserInfo } from "./model/UserInfo"
import { StepView } from './stepView.component'
import { SwiperConfigInterface, SwiperComponent, SwiperEvents } from "ngx-swiper-wrapper";
import { Router, ActivatedRoute } from '@angular/router';
import { IStarRatingOnClickEvent, IStarRatingOnRatingChangeEven, IStarRatingIOnHoverRatingChangeEvent } from "angular-star-rating/star-rating-struct";
import { HomeService } from "./service/Home.Service";
import { RoleService } from "./service/Role.Service";
import { RoleData } from "./model/RoleData";
import { RatingRelation } from "./model/RatingRelation";
import { ThemeService } from "./service/Theme.Service";
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { InstructionCustom } from "./patrialComponent/deleteInstructionModal";
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { LocaleService, Language } from 'angular-l10n';

@Component({
    selector: 'InstructionView',
    templateUrl: '/partial/InstructionView',
    styleUrls: ['css/instructionView.css' , 'css/themes/themeCommon.css', 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.0/css/swiper.min.css', 'css/themes/themeInstructionView.css']
})

export class InstructionView {

    @ViewChild('mainSwiper') mainSwiper: SwiperComponent;
    @ViewChild('miniSwiper') miniSwiper: SwiperComponent;
    instruction: Instruction = new Instruction();
    _id: string;
    onClickResult: IStarRatingOnClickEvent;
    @Language() lang: string;

    roleinfo: RoleData = new RoleData(-1, false, false);
    @Input() theme: string;
    constructor(public locale: LocaleService,public modal: Modal,private _instructionservice: InstructionService,
        private _ActivatedRoute: ActivatedRoute, private homeservice: HomeService,
        private roleservice: RoleService,private themeservice:ThemeService,private router:Router) {
        this.theme = this.themeservice.getCookie('theme');
        roleservice.getDataRole().subscribe(data => {
            this.roleinfo = data;
        });
    }

    onClick($event: IStarRatingOnClickEvent, idI: number) {
        this.onClickResult = $event;
        if (this.roleinfo.id != -1)
            this.homeservice.setRating(idI, this.roleinfo.id, $event.rating);
    };

    deleteInstructionModal() {
        return this.modal.open(InstructionCustom, overlayConfigFactory({ delete: false }, BSModalContext)).then(resultPromise => {
            return resultPromise.result
                .then(
                () => this.delinstruction(resultPromise.context.delete));
        });
    }

    delinstruction(tag: boolean) {
        if (tag) {
            this._instructionservice.deleteInstruction(this.instruction.id).subscribe(data => {
                this.router.navigate(['home']);
            });
        }
    }

    mainViewSiper: SwiperConfigInterface = {
        direction: 'horizontal',
        slidesPerView: '1',
        keyboardControl: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
    };

    miniSwiperConfig: SwiperConfigInterface = {
        direction: 'horizontal',
        slidesPerView: '5',
        centeredSlides: true,
        keyboardControl: false,
        slideActiveClass: 'slide-activMini',
        slideDuplicateClass: 'slide-mini',
        slideVisibleClass:'slide-miniV'
    }

    setrating(ratingRelation: Array<RatingRelation>) {
        if (!ratingRelation || ratingRelation.length == 0) return 0;
        let rating = 0;
        for (var i = 0; i < ratingRelation.length; i++) {
            rating += ratingRelation[i].value;
        }
        return rating / ratingRelation.length;
    }

    onIndexChange(event: number) {
        this.mainSwiper.setIndex(event);
        this.miniSwiper.setIndex(event);
    }

    goToEdit() {
        this.router.navigate(['instructioneditor'], { queryParams: { 'id': this._id } });
    }

    ngOnInit() {
        let sub = this._ActivatedRoute.queryParams.subscribe(parmas => {
            this._id = parmas['id'];
        });
        this._instructionservice.getfull(this._id).subscribe(
            data => {
                this.instruction = data;
            },
            err => console.log(err));
    }
}
