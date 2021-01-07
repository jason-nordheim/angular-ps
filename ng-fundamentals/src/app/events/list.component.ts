import { Component } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: `./list.component.html`,
  styleUrls: ['./list.component.css'],
})
export class EventList {
  event1 = {
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