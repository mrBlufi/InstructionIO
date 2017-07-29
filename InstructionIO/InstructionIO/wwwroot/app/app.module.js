"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const app_routing_1 = require("./app.routing");
const common_1 = require("@angular/common");
const app_component_1 = require("./app.component");
const http_1 = require("@angular/http");
const ng2_dragula_1 = require("ng2-dragula");
const textBoxTemplate_1 = require("./patrialComponent/textBoxTemplate");
const ngx_bootstrap_1 = require("ngx-bootstrap");
const forms_1 = require("@angular/forms");
const ngx_swiper_wrapper_1 = require("ngx-swiper-wrapper");
const SWIPER_CONFIG = {
    direction: 'horizontal',
    slidesPerView: '2',
    keyboardControl: true
};
// enableProdMode();
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, app_routing_1.routing, http_1.HttpModule, ng2_dragula_1.DragulaModule, ngx_bootstrap_1.CarouselModule.forRoot(), ngx_bootstrap_1.SortableModule.forRoot(), ngx_bootstrap_1.AccordionModule.forRoot(), forms_1.FormsModule, ngx_swiper_wrapper_1.SwiperModule.forRoot(SWIPER_CONFIG)],
        declarations: [app_component_1.AppComponent, app_routing_1.routedComponents, textBoxTemplate_1.TextBoxTemplate],
        providers: [platform_browser_1.Title, { provide: common_1.APP_BASE_HREF, useValue: '/' }],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map