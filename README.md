V9 Website
=========
[![CircleCI](https://circleci.com/gh/velocity-9/v9_website.svg?style=svg)](https://circleci.com/gh/velocity-9/v9_website)

The velocity 9 website of the future, today!
This repo holds the web application that powers Velocity 9!
It allows developers to control the status of their serverless components, and see various stats about how they are running.

# Installing
To set up the web application, there are two requirements, the Node configuration and the URL management.

## Node Setup
Install the following from your system's package manager:
- `node`, version 13 or 14
- `yarn`

Run in the root repo directory to install all of the NPM packages:
- `yarn install`

That's it! You've set up the Node side of things.

## URL Management
By URL man

# Contributing
The V9 web app is written entirely in Javascript ES6, and uses React(turn to link) for the front-end and Node in the back-end.
In addition, it uses Flow(get link) to enforce static typing. 
Authentication is handled through OAuth via Github, as Velocity 9 pulls all code from Github anyways.
