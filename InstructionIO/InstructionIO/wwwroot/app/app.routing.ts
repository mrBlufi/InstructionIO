import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';
import { ProfileComponent } from './profile.component';
import { StepEditorComponent } from './stepeditor.component';
import { InstructionEditorComponent } from './instructionEditor.component';
import { ChildComponent } from './childcontenthome.component';
import { CommentComponent } from './comment.component';
import { SearchComponent } from "./search.component";
import { InstructionView } from "./instructionview.component"
import { StepView } from "./stepview.component"

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: IndexComponent},
    { path: 'search', component: SearchComponent, data: { title: 'Search' }},    
    { path: 'profile', component: ProfileComponent },
    { path: 'stepeditor', component: StepEditorComponent, data: { title: 'StepEditor' } },
    { path: 'instructioneditor', component: InstructionEditorComponent, data: { title: 'instructionEditor' } },
    { path: 'instruction', component: InstructionView, data: { title: 'instruction' } },
    { path: 'step', component: StepView, data: { title: 'step' } }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [IndexComponent, ProfileComponent, StepEditorComponent, InstructionEditorComponent, SearchComponent, InstructionView, StepView];
