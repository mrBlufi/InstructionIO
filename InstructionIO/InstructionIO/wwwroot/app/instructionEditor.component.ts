import { SwiperConfigInterface, SwiperComponent, SwiperEvents } from "ngx-swiper-wrapper";
import { Component, Input, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DragulaService } from "ng2-dragula";
import { ContentBlock } from './model/ContetnBlock';
import { TextBoxTemplate } from './patrialComponent/textBoxTemplate'
import { SafeResourceUrl } from "@angular/platform-browser/src/platform-browser";
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from "rxjs/Observable";
import { InstructionService } from "./service/instruction.Service";
import { RequestOptions, Http, Headers } from "@angular/http";
import { Instruction } from './model/Instruction'
import { Step } from './model/Step'

@Component({
    selector: 'instructionEditor',
    templateUrl: '/partial/InstructionEditorComponent'
})

export class InstructionEditorComponent {

    @ViewChild('mainSwiper') mainSwiper: SwiperComponent;
    @ViewChild('miniSwiper') miniSwiper: SwiperComponent;

    Inst: Instruction = new Instruction();

    private _id: string;
    
    constructor(private dragulaService: DragulaService, private sanitizer: DomSanitizer, private http: Http, private _instructionservice: InstructionService,
        private _ActivatedRoute: ActivatedRoute, private router: Router) {
        dragulaService.setOptions('stepD', {
            moves: function (el: any, container: any, handle: any) {
                return !(handle.className.includes('delete'));
            }
        });
    }

    mainSwiperConfig: SwiperConfigInterface = {
        direction: 'horizontal',
        slidesPerView: '1',
        keyboardControl: true
    };

    miniSwiperConfig: SwiperConfigInterface = {
        direction: 'horizontal',
        slidesPerView: '3',
        centeredSlides: true,
        keyboardControl: true,
        slideActiveClass: 'slide-activMini',
        slideClass:'slide-mini',
        containerModifierClass:'miniSwiperContainer'
    }

    add(): void {
        this.Inst.step.push(new Step());
        this.mainSwiper.update();
    }

    del(): void  {
        this.mainSwiper.update();
        if (this.mainSwiper.isAtLast) {
            this.mainSwiper.prevSlide();
        }
    }

    cw() {
        console.log(this.Inst);
    }

    onIndexChange(event: number) {
        this.mainSwiper.setIndex(event);
        this.miniSwiper.setIndex(event);
    }

    ngOnInit() {
        let sub = this._ActivatedRoute.queryParams.subscribe(parmas => {
            this._id = parmas['id'];
        });
        this._instructionservice.get(this._id).subscribe(
            data => {
                this.Inst = data as Instruction;
            },
            err => console.log(err));
    }

    ngOnDestroy() {
        this.dragulaService.destroy('stepD');
    }

    saveInst() {
        this._instructionservice.create(this.Inst).subscribe(data => {
            this.router.navigate(['instructionEditor'], { queryParams: { 'id': data['_body'] } });
        });
    }

    updateInst() {
        this._instructionservice.update(this.Inst).subscribe(data => {
            this.router.navigate(['instructionEditor'], { queryParams: { 'id': data['_body'] } });
        });
    }
}