import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdInputModule, MdRadioModule,
  MdSelectModule
} from '@angular/material';
import { McComponent } from './mc/mc.component';
import { TaskComponent } from './task/task.component';
import { DndComponent } from './dnd/dnd.component';
import {FormsModule} from '@angular/forms';
import { ScComponent } from './sc/sc.component';
import { TfComponent } from './tf/tf.component';
import { TaskFooterComponent } from './task-footer/task-footer.component';
import { SfComponent } from './sf/sf.component';
import {DragulaModule} from 'ng2-dragula';
import { DropdownComponent } from './dropdown/dropdown.component';
import { GapComponent } from './gap/gap.component';

@NgModule({
  declarations: [
    AppComponent,
    McComponent,
    TaskComponent,
    DndComponent,
    ScComponent,
    SfComponent,
    TfComponent,
    TaskFooterComponent,
    DropdownComponent,
    GapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdRadioModule,
    FormsModule,
    MdInputModule,
    DragulaModule,
    MdSelectModule,
    MdCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
