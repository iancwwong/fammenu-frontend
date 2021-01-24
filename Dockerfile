FROM mhart/alpine-node:latest

# Initialise app directory
WORKDIR /app

# Prepare app dependencies
ADD package.json /app/package.json
ADD . /app

# Prepare deployment (probably shouldn't be doing this here...)
RUN chmod +x /app/deployments/prepare-docker-build.sh && sh /app/deployments/prepare-docker-build.sh

# Need to fix the following - we shouldn't need to build codebase here in docker...
RUN yarn install && yarn run build

# Start the app from container
EXPOSE 8080
CMD [ "yarn", "run", "serve" ]