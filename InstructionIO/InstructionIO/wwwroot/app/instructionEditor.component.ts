﻿import { SwiperConfigInterface, SwiperComponent, SwiperEvents } from "ngx-swiper-wrapper";
import { Form } from '@angular/forms';
import { Component, Input, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DragulaService } from "ng2-dragula";
import { ContentBlock } from './model/ContetnBlock';
import { TextBoxTemplate } from './patrialComponent/textBoxTemplate'
import { SafeResourceUrl } from "@angular/platform-browser/src/platform-browser";
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from "rxjs/Observable";
import { InstructionService } from "./service/instruction.Service";
import { HomeService } from './service/Home.Service'
import { RequestOptions, Http, Headers } from "@angular/http";
import { Instruction } from './model/Instruction'
import { Step } from './model/Step'
import { Category } from './model/Category'
import { Tag } from './model/Tag'
import { TagInputModule } from 'ng2-tag-input'
import { TagsRelation } from "./model/TagsRelation";
import { ThemeService } from "./service/Theme.Service";
import { LocaleService, Language } from 'angular-l10n';

@Component({
    selector: 'instructionEditor',
    templateUrl: '/partial/InstructionEditorComponent',
    styleUrls: ['css/themes/themeInstructionEditor.css', 'css/InstructionEditor.css', 'css/themes/themeCommon.css'] 
})

export class InstructionEditorComponent {

    @ViewChild('mainSwiper') mainSwiper: SwiperComponent;
    @ViewChild('miniSwiper') miniSwiper: SwiperComponent;
    @ViewChild('mainPreView') mainPreView: SwiperComponent;


    Inst: Instruction = new Instruction();
    categories: Category[];
    tagsArray: Tag[] = new Array<Tag>();
    instvalidate: InstructionValidate = new InstructionValidate();
    viewS: boolean = true;
    @Language() lang: string;

    private _id: string;
    @Input() theme: string;
    constructor(public locale: LocaleService,private dragulaService: DragulaService, private sanitizer: DomSanitizer, private http: Http, private _instructionservice: InstructionService, private _homeservice: HomeService,
        private _ActivatedRoute: ActivatedRoute, private router: Router, private themeservice: ThemeService) {
        this.theme = this.themeservice.getCookie('theme');
        dragulaService.setOptions('stepD', {
            moves: function (el: any, container: any, handle: any) {
                return !(handle.className.includes('delete'));
            }
        });
    }

    validate(): boolean {
        let state: boolean = true;
        this.instvalidate = new InstructionValidate();
        if (this.Inst.name == null) {
            this.instvalidate.Name = true;
            state = false;
        }
        if (this.tagsArray.length == 0) {
            this.instvalidate.Tag = true;
            state = false;
        }
        if (this.Inst.category == null) {
            this.instvalidate.Category = true;
            state = false;
        }
        if (!this.Inst.previewText.length || this.Inst.previewText.length <= 15) {
            this.instvalidate.PrevievText = true;
            state = false;
        }
        if (this.Inst.step.length <= 0) {
            this.instvalidate.Step = true;
            state = false;
        }
        return state;
    }

    swapMode(event: Event) {
        this.viewS = !this.viewS;
        if (this.viewS) {
            event.srcElement.classList.add('glyphicon-eye-open');
            event.srcElement.classList.remove('glyphicon-eye-close');
        } else {
            event.srcElement.classList.add('glyphicon-eye-close');
            event.srcElement.classList.remove('glyphicon-eye-open');
        }
    }

    removeStep(step: Step) {
        this.Inst.step.splice(this.Inst.step.indexOf(step), 1);
        if (!this.miniSwiper.isAtLast)
            this.miniSwiper.prevSlide();
    }

    mainSwiperConfig: SwiperConfigInterface = {
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
        slideActiveClass: 'slide-activMini'
    }

    add(): void {
        this.Inst.step.push(new Step());
        this.mainSwiper.update();
    }

    save() {
        if (this.validate()) {
            if (this.Inst.id == 0)
                this.saveInst();
            else
                this.updateInst();
        }
    }

    onIndexChange(event: number) {
        if (this.mainSwiper){
            this.mainSwiper.setIndex(event);
        }
        if (this.mainPreView) {
            this.mainPreView.setIndex(event);
        }
        this.miniSwiper.setIndex(event);
    }

    ngOnInit() {
        let sub = this._ActivatedRoute.queryParams.subscribe(parmas => {
            this._id = parmas['id'];
        });
        this._instructionservice.get(this._id).subscribe(
            data => {
                this.Inst = data as Instruction;
                for (let tagrRelation of this.Inst.tagsRelation) {
                    this.tagsArray.push(tagrRelation.tag)
                }
            },
            err => console.log(err));

        this._homeservice.getCategories().subscribe(data => {
            this.categories = data;
        }, err => console.log(err));
    }

    public requestAutocompleteItems = (text: string): Observable<Response> => {
        return this._instructionservice.tags(text);
    };

    ngOnDestroy() {
        this.dragulaService.destroy('stepD');
    }

    saveInst() {
        for (let tag of this.tagsArray) {
            this.Inst.tagsRelation.push(new TagsRelation(tag));
        }
        this._instructionservice.create(this.Inst).subscribe(data => {
            this.router.navigate(['instruction'], { queryParams: { 'id': data['_body'] } });
        });
    }

    updateInst() {
        this._instructionservice.update(this.Inst).subscribe(data => {
            this.router.navigate(['instruction'], { queryParams: { 'id': data['_body'] } });
        });
    }

    saveFile(event: Event) {
        let src: string;
        let elem: HTMLInputElement = event.srcElement as HTMLInputElement;
        let formData: FormData = new FormData();
        formData.append(elem.files[0].name, elem.files[0]);
        this.http.post('/api/StepEditor/Upload', formData).subscribe((data) =>
        {
            this.Inst.previewImage = data["_body"].replace(/"/g, "")
        });
    }

    textBoxFocusOut(n: Event) {
        this.Inst.previewText = n.srcElement.innerHTML;
    }

    redirectToInput(eleme: HTMLElement) {
        eleme.click();
    }
}

class InstructionValidate {
    public Name: boolean = false;
    public Tag: boolean = false;
    public Category: boolean = false;
    public PrevievText: boolean = false;
    public Step: boolean = false;
}
