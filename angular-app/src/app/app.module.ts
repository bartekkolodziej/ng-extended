import {AccordionModule} from 'primeng/accordion'; 
import {ScrollPanelModule} from 'primeng/scrollpanel'; 
import {SliderModule} from 'primeng/slider'; 

import {RadioButtonModule} from 'primeng/radiobutton';  
import {ButtonModule} from 'primeng/button'; 
import {SidebarModule} from 'primeng/sidebar'; 
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
AccordionModule,
ScrollPanelModule,
SliderModule,
ButtonModule,
SidebarModule,
RadioButtonModule,
FormsModule,

        HttpClientModule,
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
