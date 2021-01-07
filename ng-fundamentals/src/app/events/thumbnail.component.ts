import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event-thumb',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css'],
})
export class EventThumbnailComponent {
  @Input() event: any;
  @Output() onClick = new EventEmitter();

  handleClick() {
    this.onClick.emit('foo!');
  }

  /** determines if the event object parameter has
   * all the necessary properties defined **/
  isValidEvent(event: any) {
    if (
      event &&
      event.name &&
      event.time &&
      event.date &&
      event.price &&
      event.location
    ) {
      return true;
    } else {
      return false;
    }
  }
}
