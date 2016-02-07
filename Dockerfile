FROM node:0.12

# Install gem sass for  grunt-contrib-sass
RUN apt-get update -qq && apt-get install -y build-essential
RUN apt-get install -y ruby
RUN gem install sass

WORKDIR /home/modern-mean

# Install Modern-MEAN Prerequisites
RUN npm install -g gulp
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

# Set development environment as default
ENV NODE_ENV development

# Port 3000 for server
# Port 35729 for livereload
EXPOSE 3000 35729
CMD ["grunt"]
