﻿import { Directive, HostBinding, HostListener, Input, Renderer, ElementRef } from '@angular/core';

@Directive({
    selector: '[textBox]'
})

export class TextBoxTemplate {

    @Input() textBox: string;
    
    constructor(private renderer: Renderer, private elementRef: ElementRef) {}

    @HostListener("keypress") onkeyUp() {
        let element: HTMLElement = this.elementRef.nativeElement;
        this.textBox = element.innerHTML;
    }

    @HostBinding('innerHtml') get getInnerHtml() {
        return this.textBox;
    }
}