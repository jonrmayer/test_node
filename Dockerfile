# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=21.6.0

FROM node:${NODE_VERSION}-slim

# Use production node environment by default.
# ENV NODE_ENV production


WORKDIR /app


RUN apt-get update
RUN apt-get install -y xdg-utils


COPY package.json .

COPY vite.config.js .

RUN npm install




# Copy the rest of the source files into the image.
COPY . ./

RUN cd ./ && npm run build 


# USER node


VOLUME /data

# Expose the port that the application listens on.
EXPOSE 4173

# CMD ["/bin/sh"]

# Run the application.
CMD [ "npm", "run", "preview" ]
