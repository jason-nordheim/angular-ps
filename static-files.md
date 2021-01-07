# Static Files in Angular

Since Angular is a TypeScript (and therefor JavaScript) framework, it uses [WebPack](https://webpack.js.org) to compile JavaScript/TypeScript modules into a "bundle" of optimized and minified code.

Angular defines static assets like icons, images, videos, scripts, or stylesheets in the `~/angular.json` configuration file.

## Static Media

Static media like _icons_, _images_, and _videos_ must be defined in the `angular.json` configuration file under `"build"` > `"options"` > `"assets"`

```jsonc
/*
  file: "~/angular.json"
   - the snippet below exclude the majority of the code
*/
{
"projects": {
  "ng-fundamentals": {},
    "architect": {
      "build": {
        "options": {
          "assets": ["src/favicon.ico", "src/assets"], /* ← here */
        },
      },
    }
  }
},
```

## Static Styles

Static stylesheets (css, scss, sass, less, etc.) should be defined in the `angular.json` configuration file under `"build"` > `"options"` > `"styles"`

```jsonc
/*
  file: "~/angular.json"
   - the snippet below exclude the majority of the code
*/
{
"projects": {
  "ng-fundamentals": {},
    "architect": {
      "build": {
        "options": {
          "styles": ["src/styles.css"], /* ← here */
        },
      },
    }
  }
},
```

## Static Scripts

Any static scripts of JavaScript/TypeScript code that we plan to use in our Angular application should be defined in "build"`>`"options"`>`"scripts"`

```jsonc
/*
  file: "~/angular.json"
   - the snippet below exclude the majority of the code
*/
{
"projects": {
  "ng-fundamentals": {},
    "architect": {
      "build": {
        "options": {
          "scripts": [] /* ← here */
        },
      },
    }
  }
},
```
