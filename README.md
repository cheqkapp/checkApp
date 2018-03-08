# checkApp
## Installation Instructions ##
Clone Repo to your local machine `git clone https://github.com/cheqkapp/checkApp`

Navigate to the cloned directory in the command prompt

Run `npm install`

Run `gulp server`

After build is completed an window will open starting the app at http://localhost:8000

## Running unit tests locally with Debug in Chrome browser - COMING SOON ##
While writing unit tests it is much easier to test your unit tests locally by using the command: `karma start karma.conf.js` under emily-core/core/app directory

This will open unit tests in a browser so that you could easily debug and see which tests are failing

Once tests run, the coverage reports are generated and can be viewed in a browser at: emily-core/core/app/testResults/Chrome 57.0.2987 (Windows 7 0.0.0)\index.html

To debug in the browser with uncompressed javascript just --debug to the end of the command: `karma start karma.conf.js --debug`

NOTE:  Any file path changes made in the karma.conf.js file also need to be made in karma.jenkins.conf.js for the `gulp build` build for jenkins

# Helpful URL's #


## S3 Sandbox url ##
http://chequeapp.s3-website-us-east-1.amazonaws.com/#/

## Local development url ##
http://localhost:8000/index.html

# GULP TASKS #

#### Choose to run either of the following gulp commands ####

`gulp clean` - deletes the dist directory that serves the application

`gulp jshint` - invokes the javascript linter and shows all javascript errors in code

`gulp tests` - runs karma tests and shows coverage threshold - COMING SOON

`gulp reload` - reloads the active browser

`gulp images` - processes and minimizes all images and moves them to the dist folder

`gulp copy:css` - compiles and copies all css files and them file to the dist folder

`gulp copy:pdfs` - compiles and copies all pdf files and them file to the dist folder

`gulp copy:scripts` - compiles and copies all javascript and html files and moves them to the dist folder

`gulp copy:root` - compiles and copies all files from the src root directory and moves them to the dist folder

`gulp build` - runs the clean, images, copy:root, copy:scripts, copy:pdfs, and copy:css tasks with unit tests tasks

`gulp localBuild` - runs the clean, images, copy:root, copy:scripts, copy:pdfs, and copy:css without unit tests tasks for starting node server

`gulp watch` - watches for changes in all sources files and reloads the browser automatically to reflect them

`gulp server` - starts node server and opens your default browser and reads files from the dist directory.

`gulp s3:sandbox` - runs build and publishes to amazon s3 development sandbox bucket - COMING SOON


NOTE: Running the following commands with help to view the angular app based on the environment:

Local Environment: `gulp server`, `gulp localBuild`
