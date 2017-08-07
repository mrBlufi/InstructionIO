import { Component, Input } from '@angular/core';
import { Step } from './model/Step'
import { LocaleService, Language } from 'angular-l10n';

@Component({
    selector: 'stepView',
    templateUrl: '/partial/StepComponent',
    styleUrls: [ 'css/themes/themeCommon.css']
})

export class StepView {
    @Input() step: Step = new Step('0');
    @Input() theme: string;
    @Language() lang: string;

    constructor(public locale: LocaleService) {
    }
}