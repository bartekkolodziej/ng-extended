import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyComponent } from './my/my.component';
import {FormsModule} from "@angular/forms";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AppComponent,
    MyComponent
  ],
  imports: [

    NoopAnimationsModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
