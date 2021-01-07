# Fundamental Angular Concepts

Angualar is a framework for building SPA applications using HTML and TypeScript.

## Architecture Overview

Angular applications are comprised of Angular Modules, Components and Services. Modules, components and services are classes that use decorators to mark their type and provide metadata that tells Angular how to use them.

- Modules
  - group related piece of code together
  - use the `@NgModule` TypeScript decorator
  - application root module `~/src/app/app.module.ts`
- Services
  - provides the information necessary to make data available to components
  - is injected into components via Dependency Injection
- Components
  - define the visual elements `.html` and styles (css/sass/less/etc.))
  - referred to as the _"view"_
  - The metadata for a component class associates it with a _template_ that defines a view.
    - A template combines ordinary HTML with _Angular directives_ and binding markup that allow Angular to modify the HTML before rendering it for display.

Components are often referred to as the "view" of the application since they define the visual elements of an Angular application. Components also consume \_

## Modules

All Angular applications are comprised of one or more _"modules"_ beginning with the "app" module. Every Angular app has a root module, conventionally named `AppModule`, which provides the bootstrap mechanism that launches the application. An `app` typically contains many functional modules.

### NgModules

An NgModule declares a compilation context for a set of components that is dedicated to an application domain, a workflow, or a closely related set of capabilities. An NgModule can associate its components with related code, such as services, to form functional units.

NgModules

- can import functionality from other NgModules
- can allow their own functionality to be exported and used by other NgModules

Angular modules are created by decorating a TypeScript class with the `@NgModule()` [decorator](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.x5c2ndtx0) imported from `@angular/core`.

The `@NgModule()` accepts a single parameter (an object) in which we can define `declarations`, `imports`, and `providers`.

#### Declarations

In order to add a component (as a child), a pipe or a directive, you must define that component, pipe or directive in the array associated with the `declarations` property of the `@NgModule`.

#### Imports

The `imports` property of the `@NgModule` is used to import other modules into the decorated TypeScript class.

> Important: Importing a module makes all of that module's exported declarations and providers available to the importing module.

#### Providers

Providers enable us to define **services** for use within an `@NgModule`.

```ts
@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Components

The `@Component()` decorator identifies the class immediately below it as a component, and provides the template and related component-specific metadata.

> Every Angular application has at least one component, the root component that connects a component hierarchy with the page document object model (DOM). Each component defines a class that contains application data and logic, and is associated with an HTML template that defines a view to be displayed in a target environment.

Components represent

## Angular Component Hierarchy

The root of every Angular application begins with the **root component**.

# Bootstrapping

Angular Bootstrapping is defined in the `~/src/main.ts` file. As of January 2020, the `ng new <project-name>` will create a `<project-name>/src/main.ts` that looks like:

```ts
// ~/src/main.ts
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

/* notice how we are telling Angular which module to use as the root component (`AppModule`) */
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
```

This is configured in the `~/angular.json` file within the root folder of the project.

As of January 2020, the `~/angular.json` file should look similar to this:

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "ng-fundamentals": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:application": {
          "strict": true
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/ng-fundamentals",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            "aot": true,
            "assets": ["src/favicon.ico", "src/assets"],
            "styles": ["src/styles.css"],
            "scripts": []
          },
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "namedChunks": false,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ]
            }
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "ng-fundamentals:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "ng-fundamentals:build:production"
            }
          }
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "ng-fundamentals:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "src/test.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.spec.json",
            "karmaConfig": "karma.conf.js",
            "assets": ["src/favicon.ico", "src/assets"],
            "styles": ["src/styles.css"],
            "scripts": []
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": [
              "tsconfig.app.json",
              "tsconfig.spec.json",
              "e2e/tsconfig.json"
            ],
            "exclude": ["**/node_modules/**"]
          }
        },
        "e2e": {
          "builder": "@angular-devkit/build-angular:protractor",
          "options": {
            "protractorConfig": "e2e/protractor.conf.js",
            "devServerTarget": "ng-fundamentals:serve"
          },
          "configurations": {
            "production": {
              "devServerTarget": "ng-fundamentals:serve:production"
            }
          }
        }
      }
    }
  },
  "defaultProject": "ng-fundamentals"
}
```
