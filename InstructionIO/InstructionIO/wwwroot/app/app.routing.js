"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const index_component_1 = require("./index.component");
const profile_component_1 = require("./profile.component");
const stepeditor_component_1 = require("./stepeditor.component");
const instructionEditor_component_1 = require("./instructionEditor.component");
const search_component_1 = require("./search.component");
const instructionview_component_1 = require("./instructionview.component");
const stepview_component_1 = require("./stepview.component");
const appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: index_component_1.IndexComponent },
    { path: 'search', component: search_component_1.SearchComponent, data: { title: 'Search' } },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'stepeditor', component: stepeditor_component_1.StepEditorComponent, data: { title: 'StepEditor' } },
    { path: 'instructioneditor', component: instructionEditor_component_1.InstructionEditorComponent, data: { title: 'instructionEditor' } },
    { path: 'instruction', component: instructionview_component_1.InstructionView, data: { title: 'instruction' } },
    { path: 'step', component: stepview_component_1.StepView, data: { title: 'step' } }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
exports.routedComponents = [index_component_1.IndexComponent, profile_component_1.ProfileComponent, stepeditor_component_1.StepEditorComponent, instructionEditor_component_1.InstructionEditorComponent, search_component_1.SearchComponent, instructionview_component_1.InstructionView, stepview_component_1.StepView];
//# sourceMappingURL=app.routing.js.map