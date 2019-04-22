import {ListboxModule} from 'primeng/listbox'; 
import {ListboxModule} from 'primeng/listbox'; 
import {ListboxModule} from 'primeng/listbox'; 
import {ListboxModule} from 'primeng/listbox'; 
import {InputTextModule} from 'primeng/inputtext'; 
import {SidebarModule} from 'primeng/sidebar'; 
import {SidebarModule} from 'primeng/sidebar'; 
import {SidebarModule} from 'primeng/sidebar'; 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyComponent } from './my/my.component';

@NgModule({
  declarations: [
    AppComponent,
    MyComponent
  ],
  imports: [
ListboxModule,
ListboxModule,
ListboxModule,
ListboxModule,
InputTextModule,
SidebarModule,
SidebarModule,
SidebarModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
