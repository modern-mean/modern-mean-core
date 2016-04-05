#Gulp Tasks
You can view all tasks in this project by executing
```sh
gulp --tasks
```

##Runtime Tasks
All the runtime tasks build your modules into the /build folder for the server side and the /public/dist folder for the client side.  Server side files are trans-piled using Babel if you wrote them in ES6.  The client side files are always concatinated and injected into the server layout view.

##Lint
```sh
gulp lint
```
Executes linting on all JS files.

##Development
```sh
gulp
```
The development task should be used when developing your modules.  It builds the server/client files and watches for changes in any of the files.  If a file changes it rebuilds the application and restarts the client with livereload.  Your environment will be running on port 3000 and you can visit localhost:3000 in your browser to see the application

##Test
```sh
gulp test
```
This tasks executes the unit testing one time as well as linting.  It is the test that is run by Travis CI

```sh
gulp test:client
```
This task tests the client side and watches the files for changes.  Use this task when fixing client side tests

```sh
gulp test:server
```
This task tests the server side and watches the files for changes.  Use this task when fixing server side tests

##Production
```sh
gulp prod
```
Runs the production environment.  ModernMean uses forever in production.  Once the task completes you can use any <a href="https://github.com/foreverjs/forever">forever command line functions</a>.
```sh
forever stopall  //Stops all running servers
```
