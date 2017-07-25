
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { IndexComponent } from './index.component';
import { ContactComponent } from './contact.component';
import { ProfileComponent } from './profile.component';
import { ChildComponent } from './childcontenthome.component';
import { TestComponent } from './test.component';


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
    { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } }
];



export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [AboutComponent, IndexComponent, ContactComponent, ProfileComponent, ChildComponent, TestComponent];
