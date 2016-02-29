#Gulp Tasks

##Runtime Tasks
All the runtime tasks build your modules into the /build folder for the server side and the /public/dist folder for the client side.  Server side files are trans-piled using Babel if you wrote them in ES6.  The client side files are always concatinated and injected into the server layout view.


##Development
```sh
gulp
```
The development task should be used when developing your modules.  It builds the server/client files and watches for changes in any of the files.  If a file changes it rebuilds the application and restarts the client with livereload.  Your environment will be running on port 3000 and you can visit localhost:3000 in your browser to see the application

##Test
```sh
gulp test
```
This tasks executes the unit testing.
