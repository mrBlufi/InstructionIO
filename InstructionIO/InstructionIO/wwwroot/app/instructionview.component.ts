import { Component, OnInit, ViewChild } from '@angular/core';
import { Instruction } from './model/Instruction'
import { InstructionService } from "./service/instruction.Service";
import { UserInfo } from "./model/UserInfo"
import { StepView } from './stepView.component'
import { SwiperConfigInterface, SwiperComponent, SwiperEvents } from "ngx-swiper-wrapper";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'InstructionView',
    templateUrl: '/partial/InstructionView',
    styleUrls: ['./css/instructionView.css','https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.0/css/swiper.min.css']
})

export class InstructionView {

    @ViewChild('mainSwiper') mainSwiper: SwiperComponent;
    @ViewChild('miniSwiper') miniSwiper: SwiperComponent;

    instruction: Instruction = new Instruction();
    _id: string;
    
    mainViewSiper: SwiperConfigInterface = {
        direction: 'horizontal',
        slidesPerView: '1',
        keyboardControl: true,
        slideActiveClass: 'slide_activMain'
    };

    miniSwiperConfig: SwiperConfigInterface = {
        direction: 'horizontal',
        slidesPerView: '3',
        centeredSlides: true,
        keyboardControl: false,
        slideActiveClass: 'slide_activMin',
        slideDuplicateClass: 'slide-mini',
        slideVisibleClass:'slide-miniV'
    }

    constructor(private _instructionservice: InstructionService,
        private _ActivatedRoute: ActivatedRoute, private router: Router){}

    onIndexChange(event: number) {
        this.mainSwiper.setIndex(event);
        this.miniSwiper.setIndex(event);
        console.log('kek');
    }

    goToEdit() {
        this.router.navigate(['instructioneditor'], { queryParams: { 'id': this._id } });
    }

    ngOnInit() {
        let sub = this._ActivatedRoute.queryParams.subscribe(parmas => {
            this._id = parmas['id'];
        });
        this._instructionservice.get(this._id).subscribe(
            data => {
                this.instruction = data as Instruction;
            },
            err => console.log(err));
    }
}
