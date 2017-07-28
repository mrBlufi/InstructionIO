import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { routing, routedComponents } from './app.routing';
import { APP_BASE_HREF, Location } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { ChildComponent } from './childContentHome.component';
import { FormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import { HomeService } from "./service/HomeService";
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DragulaModule } from 'ng2-dragula';
import { TextBoxTemplate } from './patrialComponent/textBoxTemplate';
import { ProfileService } from "./service/ProfileService";
import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';
// enableProdMode();

@NgModule({
    imports: [BrowserModule, routing, HttpModule, FormsModule, StarRatingModule.forRoot(), InfiniteScrollModule, DragulaModule, TranslationModule.forRoot()],
    declarations: [AppComponent, routedComponents, ChildComponent, TextBoxTemplate],
    providers: [HomeService, ProfileService,Title, { provide: APP_BASE_HREF, useValue: '/' }],
    bootstrap: [AppComponent]
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
