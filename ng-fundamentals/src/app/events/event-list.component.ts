import { Component } from '@angular/core';

@Component({
  selector: 'app-event-list',
  template: `<div>
    <h2>Event List</h2>
    <hr />
    <div class="event">
      <h4>{{ event.name }}</h4>
      <table>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Price</th>
        </tr>
        <tr>
          <td>{{ event.date }}</td>
          <td>{{ event.time }}</td>
          <td>{{ event.price }}</td>
        </tr>
      </table>
    </div>
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
