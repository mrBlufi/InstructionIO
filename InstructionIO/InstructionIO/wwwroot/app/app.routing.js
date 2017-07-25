"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var about_component_1 = require("./about.component");
var index_component_1 = require("./index.component");
var contact_component_1 = require("./contact.component");
var profile_component_1 = require("./profile.component");
var childcontenthome_component_1 = require("./childcontenthome.component");
var test_component_1 = require("./test.component");
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home', component: index_component_1.IndexComponent, children: [
            { path: '', redirectTo: 'child-content', pathMatch: 'full' },
            { path: 'child-content', component: childcontenthome_component_1.ChildComponent }
        ]
    },
    { path: 'about', component: about_component_1.AboutComponent, data: { title: 'About' } },
    { path: 'contact', component: contact_component_1.ContactComponent, data: { title: 'Contact' } },
    { path: 'profile', component: profile_component_1.ProfileComponent, data: { title: 'Profile' } }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
exports.routedComponents = [about_component_1.AboutComponent, index_component_1.IndexComponent, contact_component_1.ContactComponent, profile_component_1.ProfileComponent, childcontenthome_component_1.ChildComponent, test_component_1.TestComponent];
//# sourceMappingURL=app.routing.js.map