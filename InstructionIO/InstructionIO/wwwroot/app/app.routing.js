"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const about_component_1 = require("./about.component");
const index_component_1 = require("./index.component");
const contact_component_1 = require("./contact.component");
const profile_component_1 = require("./profile.component");
const stepeditor_component_1 = require("./stepeditor.component");
const instructionEditor_component_1 = require("./instructionEditor.component");
const childcontenthome_component_1 = require("./childcontenthome.component");
const comment_component_1 = require("./comment.component");
const appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home', component: index_component_1.IndexComponent, children: [
            { path: '', redirectTo: 'child-content', pathMatch: 'full' },
            { path: 'child-content', component: childcontenthome_component_1.ChildComponent }
        ]
    },
    { path: 'about', component: about_component_1.AboutComponent, data: { title: 'About' } },
    { path: 'contact', component: contact_component_1.ContactComponent, data: { title: 'Contact' } },
    {
        path: 'profile', component: profile_component_1.ProfileComponent, children: [
            { path: '', redirectTo: 'child-content', pathMatch: 'full' },
            { path: 'child-content', component: childcontenthome_component_1.ChildComponent }
        ]
    },
    { path: 'stepeditor', component: stepeditor_component_1.StepEditorComponent, data: { title: 'StepEditor' } },
    { path: 'comment', component: comment_component_1.CommentComponent },
    { path: 'instructionEditor', component: instructionEditor_component_1.InstructionEditorComponent, data: { title: 'instructionEditor' } }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
exports.routedComponents = [about_component_1.AboutComponent, index_component_1.IndexComponent, contact_component_1.ContactComponent, profile_component_1.ProfileComponent, stepeditor_component_1.StepEditorComponent, instructionEditor_component_1.InstructionEditorComponent];
//# sourceMappingURL=app.routing.js.map