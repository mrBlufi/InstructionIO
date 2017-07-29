﻿import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { IndexComponent } from './index.component';
import { ContactComponent } from './contact.component';
import { ProfileComponent } from './profile.component';
import { StepEditorComponent } from './stepeditor.component';
import { InstructionEditorComponent } from './instructionEditor.component';
import { ChildComponent } from './childcontenthome.component';



const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home', component: IndexComponent, children: [
            { path: '', redirectTo: 'child-content', pathMatch: 'full' },
            { path: 'child-content', component: ChildComponent }
        ]
    },
    { path: 'about', component: AboutComponent, data: { title: 'About' } },
    { path: 'contact', component: ContactComponent, data: { title: 'Contact' } },
    
    {
        path: 'profile', component: ProfileComponent, children: [
            { path: '', redirectTo: 'child-content', pathMatch: 'full' },
            { path: 'child-content', component: ChildComponent }
        ]
    },

    { path: 'stepeditor', component: StepEditorComponent, data: { title: 'StepEditor' } },
    { path: 'instructionEditor', component: InstructionEditorComponent, data: { title: 'instructionEditor' } }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [AboutComponent, IndexComponent, ContactComponent, ProfileComponent, StepEditorComponent, InstructionEditorComponent];
