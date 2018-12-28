# proximax-catapult-explorer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Release and Deployment

### TESTNET
Automated build and deployment to testnet environment

1. Commit and pusth a git tag with prefix `release-testnet-`. Example `release-testnet-v0.0.1`
2. Go to the [proximax-catapult-explorer Jenkins Job](https://jenkins.internal.proximax.io/view/Catapult/job/proximax-catapult-explorer/view/tags/) and trigger the build for this release tag
3. The Jenkins job will checkout the project based on the tag, build and create distribution files, upload the distibution files to S3, and invalidate the Cloudfront objects
4. Wait for around 15 minutes or until the Cloudfront invalidation process completes
5. View the updated [ProximaX Explorer](http://bctestnetexplorer.xpxsirius.io/)
