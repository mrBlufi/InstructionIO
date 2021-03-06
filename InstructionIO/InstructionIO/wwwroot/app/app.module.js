"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const animations_1 = require("@angular/platform-browser/animations");
const app_routing_1 = require("./app.routing");
const common_1 = require("@angular/common");
const http_1 = require("@angular/http");
const forms_1 = require("@angular/forms");
const angular_star_rating_1 = require("angular-star-rating");
const ngx_bootstrap_1 = require("ngx-bootstrap");
const ngx_swiper_wrapper_1 = require("ngx-swiper-wrapper");
const angular2_infinite_scroll_1 = require("angular2-infinite-scroll");
const ng2_dragula_1 = require("ng2-dragula");
const Home_Service_1 = require("./service/Home.Service");
const Role_Service_1 = require("./service/Role.Service");
const Comment_Service_1 = require("./service/Comment.Service");
const Theme_Service_1 = require("./service/Theme.Service");
const Profile_Service_1 = require("./service/Profile.Service");
const instruction_Service_1 = require("./service/instruction.Service");
const app_component_1 = require("./app.component");
const childcontenthome_component_1 = require("./childcontenthome.component");
const textBoxTemplate_1 = require("./patrialComponent/textBoxTemplate");
const angular_l10n_1 = require("angular-l10n");
const angular2_modal_1 = require("angular2-modal");
const bootstrap_1 = require("angular2-modal/plugins/bootstrap");
const videoModal_1 = require("./patrialComponent/videoModal");
const angular_froala_wysiwyg_1 = require("angular-froala-wysiwyg");
const comment_component_1 = require("./comment.component");
const deleteUserModal_1 = require("./patrialComponent/deleteUserModal");
const cookies_service_1 = require("angular2-cookie/services/cookies.service");
const ng2_tag_input_1 = require("ng2-tag-input");
const deleteInstructionModal_1 = require("./patrialComponent/deleteInstructionModal");
const stepeditor_component_1 = require("./stepeditor.component");
const SWIPER_CONFIG = {
    direction: 'horizontal',
    slidesPerView: '2',
    keyboardControl: true
};
//enableProdMode();
let AppModule = class AppModule {
    constructor(locale, translation) {
        this.locale = locale;
        this.translation = translation;
        this.locale.addConfiguration()
            .addLanguages(['en', 'ru'])
            .setCookieExpiration(30)
            .defineLanguage('en');
        this.translation.addConfiguration()
            .addProvider('./assets/locale-');
        this.translation.init();
    }
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            animations_1.BrowserAnimationsModule, angular_froala_wysiwyg_1.FroalaEditorModule.forRoot(), angular_froala_wysiwyg_1.FroalaViewModule.forRoot(), platform_browser_1.BrowserModule, app_routing_1.routing, http_1.HttpModule, forms_1.FormsModule, angular_star_rating_1.StarRatingModule.forRoot(),
            ngx_bootstrap_1.CarouselModule.forRoot(), ngx_bootstrap_1.SortableModule.forRoot(), ngx_bootstrap_1.AccordionModule.forRoot(),
            ngx_swiper_wrapper_1.SwiperModule.forRoot(SWIPER_CONFIG), angular2_infinite_scroll_1.InfiniteScrollModule, ng2_dragula_1.DragulaModule, angular_l10n_1.TranslationModule.forRoot(),
            angular2_modal_1.ModalModule.forRoot(), ng2_tag_input_1.TagInputModule,
            bootstrap_1.BootstrapModalModule
        ],
        declarations: [app_component_1.AppComponent, app_routing_1.routedComponents, textBoxTemplate_1.TextBoxTemplate, childcontenthome_component_1.ChildComponent, videoModal_1.CustomModal, deleteInstructionModal_1.InstructionCustom, deleteUserModal_1.ModalCustom, comment_component_1.CommentComponent, stepeditor_component_1.SafePipe],
        providers: [Comment_Service_1.CommentService, cookies_service_1.CookieService, Theme_Service_1.ThemeService, Role_Service_1.RoleService, Home_Service_1.HomeService, Profile_Service_1.ProfileService, instruction_Service_1.InstructionService, platform_browser_1.Title, { provide: common_1.APP_BASE_HREF, useValue: '/' }],
        bootstrap: [app_component_1.AppComponent],
        entryComponents: [videoModal_1.CustomModal, deleteUserModal_1.ModalCustom, deleteInstructionModal_1.InstructionCustom]
    }),
    __metadata("design:paramtypes", [angular_l10n_1.LocaleService, angular_l10n_1.TranslationService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map