"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var about_component_1 = require("./about.component");
var index_component_1 = require("./index.component");
var contact_component_1 = require("./contact.component");
var profile_component_1 = require("./profile.component");
var stepeditor_component_1 = require("./stepeditor.component");
var appRoutes = [
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