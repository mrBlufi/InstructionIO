﻿import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';
import { ContactComponent } from './contact.component';
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
    {
        path: 'home', component: IndexComponent, children: [
            { path: '', redirectTo: 'child-content', pathMatch: 'full' },
            { path: 'child-content', component: ChildComponent }
        ]
    },
    
    {
        path: 'search', component: SearchComponent, data: { title: 'Search' }, children: [
            { path: '', redirectTo: 'child-content', pathMatch: 'full' },
            { path: 'child-content', component: ChildComponent }
        ] },
    { path: 'contact', component: ContactComponent, data: { title: 'Contact' } },
    
    {
        path: 'profile', component: ProfileComponent, children: [
            { path: '', redirectTo: 'child-content', pathMatch: 'full' },
            { path: 'child-content', component: ChildComponent }
        ]
    },

    { path: 'stepeditor', component: StepEditorComponent, data: { title: 'StepEditor' } },
    { path: 'comment', component: CommentComponent},
    { path: 'instructioneditor', component: InstructionEditorComponent, data: { title: 'instructionEditor' } },
    { path: 'instruction', component: InstructionView, data: { title: 'instruction' } },
    { path: 'step', component: StepView, data: { title: 'step' } }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [IndexComponent, ContactComponent, ProfileComponent, StepEditorComponent, InstructionEditorComponent, SearchComponent, InstructionView, StepView];
