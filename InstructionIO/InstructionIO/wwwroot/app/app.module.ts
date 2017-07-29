import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { routing, routedComponents } from './app.routing';
import { APP_BASE_HREF, Location } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { DragulaModule } from 'ng2-dragula';
import { TextBoxTemplate } from './patrialComponent/textBoxTemplate';
import { CarouselModule, SortableModule, AccordionModule  } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { SwiperModule, SwiperConfigInterface } from 'ngx-swiper-wrapper';

const SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: '2',
    keyboardControl: true
};
// enableProdMode();

@NgModule({
    imports: [BrowserModule, routing, HttpModule, DragulaModule, CarouselModule.forRoot(), SortableModule.forRoot(), AccordionModule.forRoot(), FormsModule, SwiperModule.forRoot(SWIPER_CONFIG)],
    declarations: [AppComponent, routedComponents, TextBoxTemplate],
    providers: [Title, { provide: APP_BASE_HREF, useValue: '/' }],
    bootstrap: [AppComponent]
})
export class AppModule { }
