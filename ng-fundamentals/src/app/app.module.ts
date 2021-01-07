import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EventList } from './events/event-list.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, EventList],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
