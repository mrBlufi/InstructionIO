import { SwiperConfigInterface, SwiperComponent, SwiperEvents } from "ngx-swiper-wrapper";
import { Component, Input, ViewChild, OnDestroy, OnInit } from '@angular/core';
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

    constructor(private dragulaService: DragulaService, private sanitizer: DomSanitizer, private http: Http, private _instructionservice: InstructionService) {
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

    onIndexChange(event: number) {
        this.mainSwiper.setIndex(event);
        this.miniSwiper.setIndex(event);
    }

    ngOnInit() {
        this._instructionservice.get('3').subscribe(
            data => {
                this.Inst = data as Instruction;
            },
            err => console.log(err));
    }

    ngOnDestroy() {
        this.dragulaService.destroy('stepD');
    }

    saveInst() {
        console.log(this.Inst);
        this._instructionservice.create(this.Inst);
    }

    updateInst() {
        console.log(this.Inst);
        this._instructionservice.update(this.Inst);
    }
}