import { SwiperConfigInterface, SwiperComponent, SwiperEvents } from "ngx-swiper-wrapper";
import { Component, Input, ViewChild, OnDestroy } from '@angular/core';
import { DragulaService } from "ng2-dragula";
import { ContentBlock } from './model/ContentBlock';
import { TextBoxTemplate } from './patrialComponent/textBoxTemplate'
import { SafeResourceUrl } from "@angular/platform-browser/src/platform-browser";
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from "rxjs/Observable";
import { RequestOptions, Http, Headers } from "@angular/http";

@Component({
    selector: 'instructionEditor',
    templateUrl: '/partial/InstructionEditorComponent'
})



export class InstructionEditorComponent {

    @ViewChild('mainSwiper') mainSwiper: SwiperComponent;
    @ViewChild('miniSwiper') miniSwiper: SwiperComponent;


    Steps: number[] = [1];

    constructor(private dragulaService: DragulaService, private sanitizer: DomSanitizer, private http: Http) {
        console.log(this.mainSwiper);
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
        slideActiveClass: 'slide-activMini',
        centeredSlides: true,
        keyboardControl: true,
        containerModifierClass:'miniSwiperContainer'
    }
    
    add(): void {
        this.Steps.push(Math.random() * 100);
        this.mainSwiper.update();
    }

    del(): void  {
        this.mainSwiper.update();
        if (this.mainSwiper.isAtLast) {
            this.mainSwiper.prevSlide();
        }
        this.Steps.pop();
    }

    onIndexChange(event: number) {
        this.mainSwiper.setIndex(event);
        this.miniSwiper.setIndex(event);
    }

    ngOnDestroy() {
        this.dragulaService.destroy('stepD');
    }
}