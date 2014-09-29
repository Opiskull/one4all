one4all
=====

[![Stories in Ready](https://badge.waffle.io/Opiskull/one4all.png?label=ready&title=Ready)](https://waffle.io/Opiskull/one4all)


# Technologies
* Nodejs
* Angularjs
* MongoDB

# Installation

1. Install MongoDB and NodeJS
2. Run ```npm install``` in the client and server folders
3. Run ```npm install bower gulp bunyan mocha -g```
4. Copy config.sample.json to config.json and modify it for your environment
5. In the client directory run ```gulp build```
6. Run the server with ```node server.js```

## Client

### Development

```gulp``` watches files for changes

### Release

```gulp build --release``` build once in release mode

## Server

### Development

```gulp``` watches files for changes
```mocha -g "create TestUser"``` create a TestUser  
After the testuser was created open ```localhost:3000``` in the **browser** and type ```localStorage.setItem("ngStorage-accessToken",'"testuseraccesstoken"')``` in the console

### Release

```node server.js 3000``` the port(3000) is optional and can be omitted  
```node server.js | bunyan``` with readable logger

### Test

```mocha``` run the tests for the server (the server needs to be running)
