import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { routing, routedComponents } from './app.routing';
import { APP_BASE_HREF, Location } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import { CarouselModule, SortableModule, AccordionModule  } from 'ngx-bootstrap';
import { SwiperModule, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { DragulaModule } from 'ng2-dragula';
import { HomeService } from "./service/Home.Service";
import { RoleService } from "./service/Role.Service";
import { ThemeService } from "./service/Theme.Service";
import { ProfileService } from "./service/Profile.Service";
import { InstructionService } from "./service/instruction.Service";
import { AppComponent } from './app.component';
import { ChildComponent } from './childcontenthome.component';
import { TextBoxTemplate } from './patrialComponent/textBoxTemplate';
import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';
import { SafeHtml } from './tools/safeHtml';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { CustomModal } from './patrialComponent/videoModal';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { CommentComponent } from './comment.component';
import { ModalCustom } from "./patrialComponent/deleteUserModal";

const SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: '2',
    keyboardControl: true
};
// enableProdMode();

@NgModule({
    imports:
    [
        FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),BrowserModule, routing, HttpModule, FormsModule, StarRatingModule.forRoot(),
        CarouselModule.forRoot(), SortableModule.forRoot(), AccordionModule.forRoot(),
        SwiperModule.forRoot(SWIPER_CONFIG), InfiniteScrollModule, DragulaModule, TranslationModule.forRoot(),
        ModalModule.forRoot(),
        BootstrapModalModule
    ],
    declarations: [AppComponent, routedComponents, TextBoxTemplate, ChildComponent, CustomModal, ModalCustom, SafeHtml,CommentComponent],
    providers: [ThemeService,RoleService,HomeService, ProfileService, InstructionService, Title, SafeHtml, { provide: APP_BASE_HREF, useValue: '/' }],
    bootstrap: [AppComponent],
    entryComponents: [CustomModal, ModalCustom]
})
export class AppModule {
    constructor(public locale: LocaleService, public translation: TranslationService) {
        this.locale.addConfiguration()
            .addLanguages(['en', 'ru'])
            .setCookieExpiration(30)
            .defineLanguage('en');

        this.translation.addConfiguration()
            .addProvider('./assets/locale-');

        this.translation.init();
    }}
