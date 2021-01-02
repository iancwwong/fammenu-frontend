FROM mhart/alpine-node:latest

# Initialise app directory
WORKDIR /app

# Prepare app dependencies
ADD package.json /app/package.json
ADD . /app
RUN npm install -g yarn && \
    yarn run build

# Start the app from container
EXPOSE 8080
CMD [ "yarn", "run", "serve" ]