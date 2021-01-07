import { Component } from '@angular/core';

@Component({
  selector: 'app-event-list',
  template: `<div>
    <h1>Event List</h1>
  </div>`,
})
export class EventList {
  event = {
    id: 1,
    name: 'Angular Connect',
    date: '9/26/2034',
    time: '10:00 am',
    price: 599.99,
    location: {
      address: '1067 DT',
      city: 'London',
      country: 'England',
    },
  };
}
