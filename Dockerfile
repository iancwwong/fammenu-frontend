FROM mhart/alpine-node:latest

# Initialise app directory
WORKDIR /app

# Prepare app dependencies
ADD package.json /app/package.json
ADD . /app

# Need to fix the following - we shouldn't need to build codebase here in docker...
RUN yarn install && yarn run build

# For deployment
ENV DATA_HOST=127.0.0.1

# Start the app from container
EXPOSE 8080
CMD [ "yarn", "run", "serve" ]