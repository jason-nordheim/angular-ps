# Angular Template Syntax

Agenda:

- interpolation and expressions
- event bindings and statements
- repeating Data with `*ngFor`
- removing elements with *ngIf and *ngSwitch
- hiding elements
- adding classes and styles

## Directives

Angular has 3 types of directives.

1. Components
   - these are the most frequently used directives (and a core building block of every Angular application)
   - used to define the composition of elements/components within a component
   - used to define the styles associated elements with a component
2. Structural Directives
   - enable dynamic adding/removing of DOM elements
3. Attribute Directives
   - used as attributes of elements
   - change the appearance/behavior of Angular elements/components (or even the behavior of another component)

## Interpolation and Expressions

Angular applications are comprised of Angular components.

The component decorator/directive primarily is used to define:

- component selector (e.g. define the tag associated with the component to be referenced in other components)
- composition of our elements (component template)
- styling of elements (component styles)

Consider the following `ProfileComponent.ts`:

```ts
@Component({
    selector: 'app-profile'
    template: `
        <h2>{{ user.name }}</h2>
        <img [src]="user.imageUrl" />
        <button (click)="doSomething()"></button>
    `,
})
export class ProfileComponent {
  user = {
    name: "John Doe",
    imageUrl: "doe.com/profile.jpg",
  };

  doSomething() {}
}
```

The Angular Component above named `ProfileComponent` consists of the following:

- `@Component()` decorator with inline html template
  - html template includes
    - interpolation → `<h2>{{ user.name }}</h2>`
    - property binding → `<img [src]="user.imageUrl"/>`
    - event binding → `<button (click)="doSomething()"></button>`
- `ProfileComponent` Angular Component
  - `user` property
    - `name` and `imageUrl` sub properties
  - `doSomething()` function

> A "statement" in Angular would include interpolation, expressions, and events

### Template Interpolation

Variable interpolation within Angular templates is performed by wrapping the variable to be interpolated within double-curly-braces ( `{{}}` ). So given the inline component template:

```ts
@Component({
  template: `
    <h2>{{ user.name }}</h2>
    <img [src]="user.imageUrl" />
    <button (click)="doSomething()"></button>
  `,
})
```

> While the example component referenced here uses an inline template definition, the template can also be defined in a separate `.html` file and linked to a component by referencing the relative path to the file as a string associated with the `templateUrl` property passed to the `@Component` decorator (instead of using the `template` property)

Since the variable `user.name` is wrapped between double-curly-braces ( `{{}}` ) Angular will compile the HTML template with the value of `user.name`.

Syntax

1. Opening double-curly-brace `{{`
   - defines the beginning of the TypeScript code to be interpolated
2. TypeScript code to be interpolated
   - code defined between the `{{` and `}}` must produce a value that can be interpolated as a string or Angular will throw an exception
3. Closing double-curly-brace `}}`
   - denotes the end of TypeScript code to be interpolated

> Interpolation is an example of an _Attribute Directive_

### Template Property Binding

Just like native HTML elements, tags defined within Angular HTML templates support _Property Binding_ which allows us to define a property of an HTML tag. Angular build upon this idea by allowing you to define custom properties for both HTML elements as well as Angular Components that can be bound to variables defined within the Angular Component class.

In Angular, we dynamically bind to properties by placing the name of the property we want to bind inside square-brackets (`[propertyName]`).

Then we set that equal to the associated class property that should be bound to wrapped in quotes (just like a standard HTML element property binding). Whatever text is placed between the double-quotes (e.g `=" <HERE> "`) is assumed to have a corresponding property defined within the associated Angular Component Class definition.

> Property binding is an example of an _Attribute Directive_

So in our example `ProfileComponent`:

```ts
@Component({
  template: `
    <h2>{{ user.name }}</h2>
    <img [src]="user.imageUrl" />
    <button (click)="doSomething()"></button>
  `,
})
export class ProfileComponent {
  user = {
    name: "John Doe",
    imageUrl: "doe.com/profile.jpg",
  };

  doSomething() {}
}
```

We are binding the `src` property of the `<img>` tag to `user.imageUrl`:

- `[src]` defines the property
- `"user.imageUrl"` defines the property of the `ProfileComponent` class that is being bound to the `[src]` property

### Event Binding

The syntax for binding events to elements of the component template is also inspired by the native event-binding syntax used in vanilla HTML/CSS.

Syntax:

- define the name of the event between parenthesis
- append the `=` sign
- define the associated function to be called when the event executes between double-quotes (`"`)

In the `ProfileComponent`'s inline template, property binding is illustrated in the button elements declaration: `<button (click)="doSomething()"></button>`

- The `(click)` tells Angular that the event we want to bind to is the `click` event.
- When the `click` event is invoked, the `doSomething()` function should be called
  - since no parameters are defined in the `(click)="doSomething()"`, no arguments will be passed to the associated function
  - to gain access to the HTML event object, pass a special variable `$event` as the argument to the function to be called when the event is invoked.

### Expression Restrictions & Best Practices

Property Binding, Event Binding and String Interpolation are all examples of _Angular Expressions_. While there is a great deal of flexibility provided in _Angular Expressions_, there are important limitations to be aware of.

Angular Expressions do **not** support:

1. variable assignment (e.g. `=`, `+=`, `++`, etc.)
2. the `new` keyword (e.g. object instantiation )
3. expression chaining (e.g. executing multiple lines of `.js`/`.ts` expressions seperated by `;`)
4. accessing the _Global Namespace_ (e.g. `console`, `window`, etc.)

Since Angular has been around for a while, people have noticed some anti-patterns when it comes to implementing reliable Angular Expressions.

Angular Expression best-practices:

- No side-effects
  - data should flow unilaterally in Angular
  - expressions with side-effects can create hard-to-find bugs
- Fast
  - expressions can be called frequently, the should be able to execute to completion as quickly as possible
- Simple
  - expressions should not perform any complex operations
  - business logic should be places in the Components class definition ( within the `.ts` component class )
- Idempotent
  - expressions should always return the same result
  - largely a result of expressions **not** have side-effects

> Event-binding statements are exempt from most of the best-practices above, except that they should be simple. Events often will have side-effects, and they will often execute different logic depending on the state of the application.

## Collections in Angular Templates

Angular provides a variety of _Structural Directives_ which enable us to dynamically add or remove elements from the Component's template.

### Looping

Looping is one of the most common programmatic operation used in every application. Angular provides the `*ngFor` directive for looping over a collection similar to a `forEach` loop.

Repeating a series of elements with `*ngFor` begins with the loop declaration. The loop declaration is placed on the element to be repeated, and consists of a variable that will be aliased to each item within the collection we are looping over. This alias can be used to pass data to the child elements/components being repeated with `*ngFor`.

Consider the `EventComponent.ts` Component below:

```ts
@Component({
  selector: "app-event-thumb",
  templateUrl: `
  <div class="event">
    <div class="event-header">
        <h4>{{ event.name }}</h4>
    </div>

    <div class="event-details">
        <div>Date: {{ event.date }}</div>
        <div>Time:{{ event.time }}</div>
        <div>Price:{{ event.price }}</div>
        <div>
        Location:
        {{
            event.location.address +
            ", " +
            event.location.city +
            ", " +
            event.location.country
        }}
        </div>
    </div>

    <div class="event-footer">
        <button (click)="handleClick()">Click me!</button>
    </div>
    </div>
  `,
  styleUrls: ["./thumbnail.component.css"],
})
export class EventComponent {
  @Input() event: any;
}
```

> The `@Input()` tells the Angular compiler that this component will be passed an `event` (of type `any`) as a bound property of the `EventComponent` (i.e. it will be defined by its' parent component)

In this example, the `event` event will be an object with `name`, `date`, `time`, `price` and `location`. Next we need to place the `EventComponent` inside another component which will hold the array of events as a property `events`.

This could be similar to the `EventListComponent.ts` Component below:

```ts
@Component({
  selector: "app-event-list",
  templateUrl: `
    <div>
        <h1>Upcoming Events</h1>
        <hr />
        <event *ngFor="let event of events" [event]="event">
        </event>
    </div>
  `,
  styleUrls: ["./list.component.css"],
})
export class EventListComponent {
  events = [
    {
      id: 1,
      name: "Angular Connect",
      date: "9/26/2036",
      time: "10:00 am",
      price: 599.99,
      imageUrl: "/assets/images/angularconnect-shield.png",
      location: {
        address: "1057 DT",
        city: "London",
        country: "England",
      },
    },
    {
      id: 2,
      name: "ng-nl",
      date: "4/15/2037",
      time: "9:00 am",
      price: 950.0,
      imageUrl: "/assets/images/ng-nl.png",
      location: {
        address: "The NG-NL Convention Center & Scuba Shop",
        city: "Amsterdam",
        country: "Netherlands",
      },
    },
    {
      id: 3,
      name: "ng-conf 2037",
      date: "5/4/2037",
      time: "9:00 am",
      price: 759.0,
      imageUrl: "/assets/images/ng-conf.png",
      location: {
        address: "The Palatial America Hotel",
        city: "Salt Lake City",
        country: "USA",
      },
    },
    {
      id: 4,
      name: "UN Angular Summit",
      date: "6/10/2037",
      time: "8:00 am",
      price: 800.0,
      imageUrl: "/assets/images/basic-shield.png",
      location: {
        address: "The UN Angular Center",
        city: "New York",
        country: "USA",
      },
    },
    {
      id: 5,
      name: "ng-vegas",
      date: "2/10/2037",
      time: "9:00 am",
      price: 400.0,
      imageUrl: "/assets/images/ng-vegas.png",
      location: {
        address: "The Excalibur",
        city: "Las Vegas",
        country: "USA",
      },
    },
  ];
}
```

When Angular processes the `EventListComponent`'s template and it reaches `*ngFor`, it will grab the property associated from the inside the `class` (`events`), and loop through each object in the `events` property (which is an array of objects), and alias each event object as `event`, then bind it to the `event="event"` property of the `EventComponent`, which will render the data from the individual event.

Dissecting: `<event *ngFor="let event of events" [event]="event"></event>`:

- `<event></event>` is the element to be repeated
- `*ngFor="let event of events"` defines
  - `events` the collection being looped over
  - `event` the alias for each element in the collection
- `[event]="event"` binds the `event` variable to the `<event></event>` element
  - `[event]` the name of the property (should be the same as the property defined within the Component class definition)
  - `="event"` the variable to be bound to the `[event]` property (aliased in `*ngFor`)

### Conditional Rendering

When using the `*ngFor` directive, it is important to keep in mind that any irregularities of the collection being repeated (looped) could fail if the data is not in the expected format (e.g. the `event` object doesn't have a `name` property). So given the components defined above, any of the following could cause an exception:

- `event` object is `null`
- `event.name` is `null` or `undefined`
- `event.time` is `null` or `undefined`
- `event.date` is `null` or `undefined`
- `event.price` is `null` or `undefined`
- `event.location` is `null` or `undefined`

#### Rendering based on boolean condition

Within the `EventComponent`, we could use `*ngIf` ( another _Structural Directive_ ) to define what angular should do if any of these conditions occur.

In order to use `*ngIf`, we must provide a statement that evaluates to `true` or `false`. To avoid putting to much code/logic in our expression, let's create a method `isValidEvent(event)` within the `EventComponent` that will return `true` if an event is valid, and `false` if an event is invalid :

```ts
export class EventComponent {
  @Input() event: any;

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
```

Next we simply add the `*ngIf` directive to the root element:

```ts
@Component({
  selector: "app-event-thumb",
  templateUrl: `
  <div *ngIf="isValidEvent(event)" class="event">
    <div class="event-header">
        <h4>{{ event.name }}</h4>
    </div>

    <div class="event-details">
        <div>Date: {{ event.date }}</div>
        <div>Time:{{ event.time }}</div>
        <div>Price:{{ event.price }}</div>
        <div>
        Location:
        {{
            event.location.address +
            ", " +
            event.location.city +
            ", " +
            event.location.country
        }}
        </div>
    </div>

    <div class="event-footer">
        <button (click)="handleClick()">Click me!</button>
    </div>
    </div>
  `,
})
export class EventComponent {
  @Input() event: any;

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
```

So the only change of the components template code is adding `*ngIf="isValidEvent(event)"` to the opening tag on the root element of the `EventComponent` template:

| Before                | After                                             |
| --------------------- | ------------------------------------------------- |
| `<div class="event">` | `<div *ngIf="isValidEvent(event)" class="event">` |

> This removes the component from the elements being rendered to the DOM by Angular. If you are going to show/hide elements frequently, you would want to change the CSS of the element to `hidden` rather than frequently mutating the DOM ( for performance ). You could also use `*ngIf` to conditionally bind the `hidden` property of the element to `true` or `false` depending on the result of the `isValidEvent(event)` function invocation.

### Advanced Conditional Rendering

While we could build functions that evaluate to boolean values and place a `*ngIf` on a number of elements, Angular provides the `ngSwitch` directive for conditionally rendering elements/components depending on the conditions defined within a switch statement.

There are two main parts to an `ngSwitch` directive

1. binding `ngSwitch` as a property on a wrapper element
2. binding either the `*ngSwitchCase` directive or `*ngSwitchDefault` directive to elements within the wrapper

Binding the `ngSwitch` directive to the wrapper component is done by placing the `ngSwitch` directive between square-brackets (e.g. `[ngSwitch]`) and then defining the case that will variable to be compared for each `*ngSwitchCase`.

```html
<div [ngSwitch]="event.location.country" class="wrapper">
  <!-- children components (*ngSwitchCase and *ngSwitchDefault ) -->
  <span>Continent: </span>
  <span *ngSwitchCase="England">Europe</span>
  <span *ngSwitchCase="France">Europe</span>
  <span *ngSwitchCase="United Kingdom">Europe</span>
  <span *ngSwitchCase="USA">North America</span>
  <span *ngSwitchCase="United States of America">North America</span>
  <span *ngSwitchCase="China">Asia</span>
  <span *ngSwitchCase="India">Asia</span>
  <span *ngSwitchDefault>Unknown</span>
</div>
```

In the following component template definition, we are stating that within the `<div class="wrapper">`, we will have a variety of children elements that we want to conditionally render based on the evaluation of a switch statement.

Each of the children elements with `*ngSwitchCase` directive applied, will take the variable provided to `[ngSwitch]="event.location.country"` (e.g `event.location.country`) and compare it to the provided value placed between the quotes (e.g. `"England"`, `"France"`, etc). If the condition evaluates to `true` the element will be rendered as part of the DOM, however if none of conditions specified for any of the elements with the `*ngSwitchCase` evaluate to `true`, then the element with the `*ngSwitchDefault` applied will be rendered.

> Elements without an `*ngSwitchCase` or `*ngSwitchDefault` directive will be rendered regardless of the value.
