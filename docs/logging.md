#Console Logging
Most modules will are developed to easily enable debug logging on the client and server side.  The client side logging feature is based on the <a href="https://docs.angularjs.org/api/ng/service/$log">angular $log service</a> and the backend user the <a href="https://github.com/winstonjs/winston">Winston node module</a>.  We use the NPM log levels as defined by winston { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

##Frontend Console Logging
Configuration of the frontend client logging is in the <a href="https://github.com/modern-mean/modern-mean-core/blob/master/modules/core/client/config/core.client.config.constants.js">core constants file</a>.  By default they are all turned on.  You can turn off any level of debugging you want by setting the falues to false.

##Backend Console Logging
Backend logging configuration is located in the appropriate <a href="https://github.com/modern-mean/modern-mean-core/tree/master/config/env">configuration file for the environment</a> you are running. The default is to log info.  The development environment by default uses debug and the test environment surpresses all output.

##Backend File Logging
By default the backend will log to the file ./logs/winston.log.  This can be set in the configuration file as well

##Backend Environment Variables
Setting the WINSTON_LEVEL and/or WINSTON_FILE environment variables will change the logging level without updating the configuration.  This can come in handy in the test environment if you want to see output.
```sh
WINSTON_LEVEL=debug gulp test
```
