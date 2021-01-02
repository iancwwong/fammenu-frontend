FROM mhart/alpine-node:latest

# Initialise app directory
WORKDIR /app

# Prepare app dependencies
ADD package.json /app/package.json
RUN npm install -g yarn

# Copy over the source code
ADD . /app

# Start the app from container
EXPOSE 8080
CMD [ "yarn", "serve" ]