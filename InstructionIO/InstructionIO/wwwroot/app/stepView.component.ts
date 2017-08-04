import { Component, Input } from '@angular/core';
import { Step } from './model/Step'

@Component({
    selector: 'stepView',
    templateUrl: '/partial/StepComponent'
})

export class StepView {

    @Input() step: Step = new Step('0');

}