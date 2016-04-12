FROM node:5.10

# Install gem sass for  grunt-contrib-sass
RUN apt-get update -qq && apt-get install -y build-essential
RUN apt-get install -y ruby
RUN gem install sass

WORKDIR /home/modern-mean
RUN mkdir -p /home/modern-mean/logs

# disable NPM color output to keep logs cleaner
RUN npm config set color false

# Install Modern-MEAN Prerequisites
RUN npm install -g gulpjs/gulp-cli#4.0
RUN npm install -g bower

# Install Modern-MEAN packages
ADD package.json /home/modern-mean/package.json
RUN npm install

# Manually trigger bower. Why doesnt this work via npm install?
ADD .bowerrc /home/modern-mean/.bowerrc
ADD bower.json /home/modern-mean/bower.json
RUN bower install --config.interactive=false --allow-root

# Make everything available for start
ADD . /home/modern-mean

# Port 8080 for server
# Port 35729 for livereload
EXPOSE 8080 35729
CMD ["gulp","prod"]

