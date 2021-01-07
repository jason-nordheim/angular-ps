import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event-thumb',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css'],
})
export class EventThumbnailComponent {
  @Input() event: any;
  @Output() onClick = new EventEmitter();
}
