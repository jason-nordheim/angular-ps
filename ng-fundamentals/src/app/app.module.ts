import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EventList } from './events/list.component';
import { EventThumbnailComponent } from './events/thumbnail.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, EventList, EventThumbnailComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
