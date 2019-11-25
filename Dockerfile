FROM node:12.13.1

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY ./src/package.json .
RUN npm install

# Bundle app source
COPY ./src .

# Exports
EXPOSE 3000
CMD [ "npm", "run", "start.dev" ]
