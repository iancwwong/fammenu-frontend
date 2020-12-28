FROM mhart/alpine-node:latest

# Initialise app directory
WORKDIR /app

# Prepare app dependencies
ADD package.json /app/package.json
RUN npm install

# Needed to run the server
RUN npm install -g live-server

# Copy over the source code
ADD . /app

# Start the app from container
EXPOSE 8080
CMD [ "live-server", "public" ]