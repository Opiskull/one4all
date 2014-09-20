[![Stories in Ready](https://badge.waffle.io/Opiskull/one4all.png?label=ready&title=Ready)](https://waffle.io/Opiskull/one4all)
one4all
=====
   
Technologies:
* Nodejs
* Angularjs
* MongoDB

# installation

to install run ```npm install``` in the client and server folders
after that build the client. the files for the client will be served from the build folder
before you run the server copy the config.sample.json file in the folder config to config.json and change it to your settings

# client

to build the client run ```gulp build```
to build the client in release mode run ```gulp build --release```
to rebuild the client on filechanges run ```gulp```

# server

to test the server run ```mocha```
to start the server run ```node server.js```
to start the server with human readable log run ```node server.js | bunyan```