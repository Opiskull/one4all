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
3. Copy config.sample.json to config.json and modify it for your environment
4. In the client directory run ```gulp build```
5. Run the server with ```node server.js```

## Client

  build client in debug with ```gulp build```  
  build client with minified and obfuscated with ```gulp build --release```  
  build client and watch for filechanges with ```gulp```  

## Server

  test server with ```mocha```  
  run server with ```node server.js```  
  run server with human readable log ```node server.js | bunyan```  
