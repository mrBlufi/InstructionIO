import { Component, Input } from '@angular/core';
import { Step } from './model/Step'

@Component({
    selector: 'stepView',
    templateUrl: '/partial/StepComponent',
    styleUrls: ['css/themes/themeStepView.css']
})

export class StepView {
    @Input() step: Step = new Step('0');
    @Input() theme: string;
}