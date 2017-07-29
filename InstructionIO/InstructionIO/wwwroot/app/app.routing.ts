import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { IndexComponent } from './index.component';
import { ContactComponent } from './contact.component';
import { ProfileComponent } from './profile.component';
import { StepEditorComponent } from './stepeditor.component';
import { InstructionEditorComponent } from './instructionEditor.component';


const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: IndexComponent, data: { title: 'Home' } },
    { path: 'about', component: AboutComponent, data: { title: 'About' } },
    { path: 'contact', component: ContactComponent, data: { title: 'Contact' } },
    { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
    { path: 'stepeditor', component: StepEditorComponent, data: { title: 'StepEditor' } },
    { path: 'instructionEditor', component: InstructionEditorComponent, data: { title: 'instructionEditor' } }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [AboutComponent, IndexComponent, ContactComponent, ProfileComponent, StepEditorComponent, InstructionEditorComponent];
