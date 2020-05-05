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
By URL management, we mean configuring access to the web app.
The Velocity 9 Github app requires a callback URL that points at the site, which can make it difficult to use when testing.
Once the application has been deployed to an actual server it's easy, as you just have it point to the deployed URL.
To get around this problem while developing, however, we suggest using [Ngrok](https://ngrok.com/).
Ngrok allows for tunnels to your localhost servers, meaning that you can access a server running locally on your computer from anywhere in the world.

Example setup:
- `ngrok http 3000 --subdomain v9_website` this command launches Ngrok and tunnels HTTP port 3000 (the default React port).

__Important Note__: This specific command will NOT work without a paid version of Ngrok.
The cheapest paid version allows you to have persistent links, so you do not have to constantly update the Github callback URL.

## ENV file setup
This project uses a `.env` file to manage environment variables that do not belong in version control.
This includes things like deployment-specific values like database URLs, as well as more private variables like a Github secret.
It is __imperative__ that the .env file never be comitted into version control, otherwise you will have to change all of the values it stores.
You can simply rename or move the `EXAMPLE.env` to be called `.env`

- `SESSION_SECRET=11111` Secret used for encrypting each browser session
- `GITHUB_KEY=thisissecret` Github app key for Velocity 9
- `GITHUB_SECRET=thisissecret` Github app secret for Velocity 9
- `HOST=http://v9_website.ngrok.io` Host URL to access the web interface
- `POSTGRES_HOST=111.222.333.444` Host running the V9 database(link)
- `POSTGRES_PORT=1234` Port to access the V9 database
- `POSTGRES_DB=` Name of the database storing V9 info
- `POSTGRES_USERNAME=` Username for Postgres
- `POSTGRES_PASSWORD=` Password for Postgres
- `COOKIE_SECRET=cookiesnomnomnom` Secret to encrypt cookies
- `NODE_CONFIG_DIR=./config` Not currently used, but points to config directory
- `NODE_PATH=src/` Where Node should look for source code (don't change this)

# Contributing
The V9 web app is written entirely in Javascript ES6, and uses [React](https://reactjs.org/) for the front-end and Node in the back-end.
In addition, it uses [Flow](https://flow.org/) to enforce static typing. 
Authentication is handled through OAuth via Github, as Velocity 9 pulls all code from Github anyways.
When writing JS code, make sure ESLint has no complaints when submitting a PR!
This project uses [CircleCI](https://circleci.com/) to automatically test code.
