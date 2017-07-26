"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const about_component_1 = require("./about.component");
const index_component_1 = require("./index.component");
const contact_component_1 = require("./contact.component");
const profile_component_1 = require("./profile.component");
const stepeditor_component_1 = require("./stepeditor.component");
const appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: index_component_1.IndexComponent, data: { title: 'Home' } },
    { path: 'about', component: about_component_1.AboutComponent, data: { title: 'About' } },
    { path: 'contact', component: contact_component_1.ContactComponent, data: { title: 'Contact' } },
    { path: 'profile', component: profile_component_1.ProfileComponent, data: { title: 'Profile' } },
    { path: 'stepeditor', component: stepeditor_component_1.StepEditorComponent, data: { title: 'StepEditor' } }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
exports.routedComponents = [about_component_1.AboutComponent, index_component_1.IndexComponent, contact_component_1.ContactComponent, profile_component_1.ProfileComponent, stepeditor_component_1.StepEditorComponent];
//# sourceMappingURL=app.routing.js.map