import {TableModule} from 'primeng/table'; 
import {TableModule} from 'primeng/table'; 
import {TableModule} from 'primeng/table'; 
import {TableModule} from 'primeng/table'; 
import {TableModule} from 'primeng/table'; 
import {TableModule} from 'primeng/table'; 
import {MultiSelectModule} from 'primeng/multiselect'; 
import {MultiSelectModule} from 'primeng/multiselect'; 
import {MultiSelectModule} from 'primeng/multiselect'; 
import {MultiSelectModule} from 'primeng/multiselect'; 
import {MultiSelectModule} from 'primeng/multiselect'; 
import {ListboxModule} from 'primeng/listbox'; 
import {ListboxModule} from 'primeng/listbox'; 
import {ListboxModule} from 'primeng/listbox'; 
import {ListboxModule} from 'primeng/listbox'; 
import {ListboxModule} from 'primeng/listbox'; 
import {DropdownModule} from 'primeng/dropdown'; 
import {DropdownModule} from 'primeng/dropdown'; 
import {DropdownModule} from 'primeng/dropdown'; 
import {InputTextModule} from 'primeng/inputtext'; 
import {InputTextModule} from 'primeng/inputtext'; 
import {InputTextModule} from 'primeng/inputtext'; 
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TestComponent} from './test.component';

@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
TableModule,
TableModule,
TableModule,
TableModule,
TableModule,
TableModule,
MultiSelectModule,
MultiSelectModule,
MultiSelectModule,
MultiSelectModule,
MultiSelectModule,
ListboxModule,
ListboxModule,
ListboxModule,
ListboxModule,
ListboxModule,
DropdownModule,
DropdownModule,
DropdownModule,
InputTextModule,
InputTextModule,
InputTextModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
  ],
  providers: [],
  bootstrap: [TestComponent]
})
export class TestModule {
}
