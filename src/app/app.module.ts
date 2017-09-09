import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {MdButtonModule, MdCheckboxModule, MdRadioModule} from '@angular/material';
import { McComponent } from './mc/mc.component';
import { TaskComponent } from './task/task.component';
import { DndComponent } from './dnd/dnd.component';
import {FormsModule} from '@angular/forms';
import { ScComponent } from './sc/sc.component';

@NgModule({
  declarations: [
    AppComponent,
    McComponent,
    TaskComponent,
    DndComponent,
    ScComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdRadioModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
