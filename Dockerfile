FROM node:12.13.1

WORKDIR /app
COPY ./src /app/
RUN npm install
CMD [ "npm", "start" ]
