import {GMapModule} from 'primeng/gmap'; 


import {ButtonModule} from 'primeng/button'; 
import {AccordionModule} from 'primeng/accordion'; 
import {ColorPickerModule} from 'primeng/colorpicker'; 

import {MultiSelectModule} from 'primeng/multiselect'; 
import {InputTextModule} from 'primeng/inputtext'; 
import {ListboxModule} from 'primeng/listbox'; 
import {InputSwitchModule} from 'primeng/inputswitch'; 
import {InputMaskModule} from 'primeng/inputmask'; 
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
GMapModule,
GMapModule,
GMapModule,
GMapModule,
GMapModule,
GMapModule,
ButtonModule,
ButtonModule,
ButtonModule,
GMapModule,
ButtonModule,
AccordionModule,
ColorPickerModule,
ColorPickerModule,
MultiSelectModule,
InputTextModule,
InputTextModule,
ListboxModule,
InputSwitchModule,
InputMaskModule,

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
